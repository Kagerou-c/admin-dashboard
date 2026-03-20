'use client'

import { chartData } from "../process/process-chart-data";
import RevenueChart from "./bar-chart";
import LineChart from "./line-chart";
import IncomeExpenseChart from "./income-expense-chart";
import { useEffect, useState } from "react";
import { UsersRound, Wallet, TrendingUp, TrendingDown } from "lucide-react";
import card from "../components/card";
import LoadingComponent from "../motion-component/loading";
import '../chart.css'
import { motion } from "framer-motion";
import { TestingAmbilData } from "../server/server-Data";

export default function Chart() {
    const [data, setData] = useState(null)
    const { Card, CardContent, CardHeder } = card

    useEffect(() => {
        async function getData() {
            const rawdata = await TestingAmbilData()
            const newData = chartData(rawdata)
            setData(newData)
        }
        getData()
    }, [])

    if (!data)
        return <LoadingComponent />;

    const {
        month,
        traficPenarikan,
        traficSetoran,
        saldoBersih,
        pemasukanBulanan,
        pengeluaranBulanan,
        totalTrfic,
        totalSaldo,
        BulanPeningkatan,
        BulanPenurunan
    } = data

    const statCard = [
        {
            icon: <UsersRound color="#69bdf2" />,
            title: 'Total Trafik User',
            value: totalTrfic.toLocaleString('id-ID'),
            iconBg: 'user-icon'
        },
        {
            icon: <Wallet color="#ff61ea" />,
            title: 'Total Saldo',
            value: 'Rp ' + totalSaldo.toLocaleString('id-ID'),
            iconBg: 'money-icon'
        },
        {
            icon: <TrendingUp color="#34d399" />,
            title: 'Bulan Peningkatan',
            value: BulanPeningkatan || '-',
            iconBg: 'book-icon'
        },
        {
            icon: <TrendingDown color="#f87171" />,
            title: 'Bulan Penurunan',
            value: BulanPenurunan || '-',
            iconBg: 'decline-icon'
        },
    ]

    const variant = (sumbu, nilai, delay = 0) => ({
        hidden: {
            opacity: 0,
            [sumbu]: nilai,
        },
        show: {
            opacity: 1,
            [sumbu]: 0,
            transition: {
                duration: 0.5,
                delay: delay,
                ease: "easeInOut",
            }
        }
    })

    const HOVER_DURATION = 0.1
    const hoverTransition = { duration: HOVER_DURATION, ease: "easeInOut" }

    return (
        <div>
            {/* Header */}
            <div className="chart-header">
                <h1>Reports</h1>
                <p>Lihat laporan dan statistik transaksi</p>
            </div>

            {/* Stat Cards */}
            <div className="summary-stats-wrap">
                {statCard.map((item, index) => (
                    <motion.div
                        key={index}
                        className="stat-card"
                        variants={variant('x', -40, index * 0.1)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        transition={hoverTransition}
                        whileHover={{ y: -4 }}
                    >
                        <div className={`stat-icon ${item.iconBg}`}>{item.icon}</div>
                        <div className="stat-info">
                            <h3>{item.title}</h3>
                            <p>{item.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Row 1: Trafik User (60%) + Saldo Bersih (40%) */}
            <div className='chart-wrap'>
                <motion.div
                    className="chart-card"
                    variants={variant('x', -20)}
                    initial="hidden"
                    animate="show"
                >
                    <RevenueChart
                        TraficSetoran={traficSetoran}
                        TraficPenarikan={traficPenarikan}
                        Bulan={month}
                    />
                </motion.div>
                <motion.div
                    className="chart-card"
                    variants={variant('y', 20, 0.1)}
                    initial="hidden"
                    animate="show"
                >
                    <LineChart DataSaldo={saldoBersih} Bulan={month} />
                </motion.div>
            </div>

            {/* Row 2: Pemasukan vs Pengeluaran (full width) */}
            <div className='chart-wrap'>
                <motion.div
                    className="chart-card chart-card-full"
                    variants={variant('y', 30, 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <IncomeExpenseChart
                        Pemasukan={pemasukanBulanan}
                        Pengeluaran={pengeluaranBulanan}
                        Bulan={month}
                    />
                </motion.div>
            </div>
        </div>
    )
}