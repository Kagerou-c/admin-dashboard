'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useLoading } from '../Hooks/use-loading';
import { Paginasi } from '../server/server-Paginasi';
import './transactions.css';

export default function DaftarTransaksiUI() {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState({});
    const [totalCount, setTotalCount] = useState(0);
    const itemPerPage = 10;
    const { isLoading, startLoading, stopLoading } = useLoading();

    const getData = async (page) => {
        startLoading()
        const { data, count } = await Paginasi(page, itemPerPage)
        setData(prevData => ({ ...prevData, [page]: data }))
        setTotalCount(count)
        stopLoading()
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

    if (!data || isLoading) {
        return null
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
