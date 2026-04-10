'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingComponent from '../motion-component/loading';
import { AmbilDataSiswa } from '../server/server-Data-Siswa';
import './saldo-siswa.css';

export default function SaldoSiswaUI() {
    const [searchInput, setSearchInput] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [totalCount, setTotalCount] = useState(0);
    const [totalSaldo, setTotalSaldo] = useState(0);
    const itemPerPage = 10;

    // ── Debounce search input ──
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchInput);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchInput]);

    // ── Fetch data from server ──
    const getData = useCallback(async (page, search) => {
        const result = await AmbilDataSiswa(search || '', page, itemPerPage);
        if (result.error) {
            setLoading(false);
            return;
        }
        setData(prevData => ({ ...prevData, [`${page}`]: result.data }));
        setTotalCount(result.count);
        setTotalSaldo(result.totalSaldo);
        setLoading(false);
    }, []);

    // ── Initial load ──
    useEffect(() => {
        getData(1, '');
    }, [getData]);

    // ── Re-fetch when search changes ──
    useEffect(() => {
        setCurrentPage(1);
        setLoading(true);
        setData({});
        getData(1, debouncedSearch);
    }, [debouncedSearch, getData]);

    // ── Cache key ──
    const cacheKey = `${currentPage}`;

    // ── Prefetch next page on hover ──
    const handlerHover = () => {
        const nextKey = `${currentPage + 1}`;
        if (!data[nextKey] && (currentPage * itemPerPage) < totalCount) {
            getData(currentPage + 1, debouncedSearch);
        }
    };

    console.log (data)
    
    // ── Handle next page click ──
    const handlerClickNext = () => {
        const nextPage = currentPage + 1;
        const nextKey = `${nextPage}`;
        if (data[nextKey]) {
            setCurrentPage(nextPage);
            window.scrollTo(0, 0);
            return;
        }
        setLoading(true);
        getData(nextPage, debouncedSearch);
        setCurrentPage(nextPage);
        window.scrollTo(0, 0);
    };

    // ── Handle prev page click ──
    const handlerClickPrev = () => {
        setCurrentPage(prev => prev - 1);
        window.scrollTo(0, 0);
    };

    // ── Format currency ──
    const formatIDR = (val) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(val);


    // ── Motion variants ──
    const cardHover = {
        y: -3,
        boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
        transition: { duration: 0.25, ease: 'easeOut' },
    };

    const rowVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.03, duration: 0.25, ease: 'easeOut' },
        }),
    };

    // ── Loading state ──
    if (loading && !data[cacheKey]) {
        return <LoadingComponent />;
    }

    const currentData = data[cacheKey] || [];

    return (
        <div className="saldo-container">
            {/* ── Header ── */}
            <div className="saldo-header">
                <h1>Daftar Saldo Siswa</h1>
                <p>Kelola dan pantau saldo tabungan seluruh siswa</p>
            </div>

            {/* ── Summary Cards ── */}
            <div className="saldo-summary">
                <motion.div className="summary-card summary-students" whileHover={cardHover}>
                    <div className="summary-icon">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <div className="summary-info">
                        <span className="summary-label">Total Siswa</span>
                        <span className="summary-value">{totalCount}</span>
                    </div>
                </motion.div>

                <motion.div className="summary-card summary-balance" whileHover={cardHover}>
                    <div className="summary-icon">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="summary-info">
                        <span className="summary-label">Total Saldo</span>
                        <span className="summary-value">{formatIDR(totalSaldo)}</span>
                    </div>
                </motion.div>
            </div>

            {/* ── Search ── */}
            <div className="saldo-search-wrapper">
                <div className="search-input-container">
                    <svg className="search-icon" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        id="search-saldo-siswa"
                        className="search-input"
                        placeholder="Cari berdasarkan nama siswa..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <AnimatePresence>
                        {searchInput && (
                            <motion.button
                                className="search-clear"
                                onClick={() => setSearchInput('')}
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                transition={{ duration: 0.15 }}
                                whileHover={{ backgroundColor: '#e5e7eb' }}
                            >
                                ✕
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
                <AnimatePresence>
                    {debouncedSearch && (
                        <motion.p
                            className="search-result-info"
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                        >
                            Menampilkan <strong>{totalCount}</strong> hasil untuk "<strong>{debouncedSearch}</strong>"
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Table ── */}
            <div className="saldo-table-card">
                <div className="table-wrapper">
                    <table className="saldo-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>NIK</th>
                                <th>Nama Siswa</th>
                                <th>Kelas</th>
                                <th>Saldo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence mode="wait">
                                {currentData.length > 0 ? (
                                    currentData.map((siswa, index) => (
                                        <motion.tr
                                            key={siswa.id || index}
                                            custom={index}
                                            variants={rowVariants}
                                            initial="hidden"
                                            animate="visible"
                                            whileHover={{ backgroundColor: 'rgba(99,102,241,0.04)' }}
                                        >
                                            <td>{(currentPage - 1) * itemPerPage + index + 1}</td>
                                            <td><span className="nik-badge">{siswa.nik}</span></td>
                                            <td className="nama-cell">{siswa.nama}</td>
                                            <td><span className="kelas-badge">{siswa.kelas}</span></td>
                                            <td className="saldo-cell">{formatIDR(siswa.saldo)}</td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <motion.tr
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <td colSpan="5" className="empty-state">
                                            <div className="empty-content">
                                                <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                                <p>Tidak ada data yang cocok</p>
                                                <span>Coba gunakan kata kunci yang berbeda</span>
                                            </div>
                                        </td>
                                    </motion.tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* ── Pagination ── */}
                <div className="saldo-pagination">
                    <button
                        className="pagination-btn"
                        disabled={currentPage === 1}
                        onClick={handlerClickPrev}
                    >
                        Prev
                    </button>

                    <button
                        className="pagination-btn"
                        disabled={!currentData || currentData.length < itemPerPage || (currentPage * itemPerPage) >= totalCount}
                        onClick={handlerClickNext}
                        onMouseOver={handlerHover}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
