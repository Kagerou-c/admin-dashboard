'use client';

import React, { useState, useEffect} from 'react';
import LoadingComponent from '../motion-component/loading';
import { Paginasi } from '../server/server-Paginasi';
import './transactions.css';

export default function DaftarTransaksiUI() {
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const itemPerPage = 10;

    useEffect(()=>{
        setLoading(true)

        async function getData(){
            const { data, count } = await Paginasi(currentPage, itemPerPage)
            setLoading(false)
            setData(data)
            setTotalCount(count || 0)
        }
        setTimeout(() => {
            getData()
        }, 500);
    },[currentPage])

    // Format currency IDR
    const formatIDR = (val) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(val);
    };
    if(!data || loading){
        return <LoadingComponent/>
    }

    console.log(totalCount)

    return (
        <div className="transactions-container">
            <div className="transactions-header">
                <h1>Daftar Transaksi</h1>
            </div>

            <div className="table-wrapper">
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Nama</th>
                            <th>Kategori / Keterangan</th>
                            <th>Jumlah</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.tanggal}</td>
                                <td>{item.nama}</td>
                                <td>{item.keperluan}</td>     
                                <td style={{ fontWeight: '600', color: item.keperluan !== 'setor' ?  '#ef4444' : '#10b981'}}>
                                    {formatIDR(item.nominal_final)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
                <button 
                    className="pagination-btn" 
                    disabled={!data || data.length < itemPerPage || (currentPage * itemPerPage) >= totalCount} 
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
