'use client';

import React, { useState, useEffect, useMemo } from 'react';
import LoadingComponent from '../motion-component/loading';
import { Paginasi } from '../server/server-Paginasi';
import './transactions.css';

export default function DaftarTransaksiUI() {
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [totalCount, setTotalCount] = useState(0);
    const itemPerPage = 10;

    const getData = async (page) => {

        const { data, count } = await Paginasi(page, itemPerPage)
        setData(prevData => ({ ...prevData, [page]: data }))
        setTotalCount(count)
        setLoading(false)
    }

    const handlerHover = () => {
        if (currentPage < 1) return
        getData(currentPage + 1)
    }

    const handlerClick = () => {
        if (data[currentPage + 1]) {
            setCurrentPage(prev => prev + 1)
            window.scrollTo(0, 0)
            return
        }

        getData(currentPage + 1)
        setLoading(true)
        setCurrentPage(prev => prev + 1)
        window.scrollTo(0, 0)
    }



    // Format currency IDR
    const formatIDR = (val) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(val);
    };


    useEffect(() => {
        getData(currentPage)
    }, [])

    if (!data || loading) {
        return <LoadingComponent />
    }

    return (
        <div className="transactions-container">
            <div className="transactions-header">
                <h1>Daftar Transaksi</h1>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#6b7280' }}>Lihat dan kelola riwayat transaksi sistem</p>
            </div>

            <div className="table-wrap">    
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
                        {data[currentPage]?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.tanggal}</td>
                                <td>{item.nama}</td>
                                <td>{item.keperluan}</td>
                                <td style={{ fontWeight: '600', color: item.keperluan !== 'setoran' ? '#ef4444' : '#10b981' }}>
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
                    onClick={handlerClick}
                    onMouseOver={handlerHover}

                >
                    Next
                </button>
            </div>
            </div>
        </div>
    );
}
