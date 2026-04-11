'use client'
import { AmbilData } from "../server/server-Paginasi";
import process from "../process/process-month-data";
import { useState, useEffect } from "react";
import LoadingComponent from "../motion-component/loading";
import Link from "next/link";
import { useAuth } from '../Hooks/use-auth';
import card from '../components/card';
import "../dashboard.css"
import { BookOpen, Wallet, FileDown, UsersRound, ChartColumn, Settings, BookSearch } from "lucide-react";
import { motion } from "framer-motion";
import { TestingAmbilData } from "../server/server-Data"

export default function Dashboard() {
    const [data, setData] = useState();
    const [Loading, setLoading] = useState(true)
    const { user, isLogin } = useAuth()
    const { Card, CardHeder, CardContent } = card

    const name = user?.user_metadata?.display_name
    useEffect(() => {
        async function fetchData() {
            //const rawdata = await AmbilData(['2026-01-01', '2026-02-01'])
            const rawdata1 = await TestingAmbilData(['2026-04', '2026-05'])
            const newdata = process(rawdata1)
            setData(newdata)
            //setData(newdata)
            setLoading(false)
        }
        fetchData()

    }, [])


    if (Loading) {
        return <LoadingComponent />
    }

    const QuickAction = (redirect, icon, Label) => {
        return (
            <Link className='Limk' href={redirect}>
                <button>
                    {icon}
                    {Label}
                </button>
            </Link>
        )
    }

    const variant = (sumbu, nilai) => {
        return {
            hiden: {
                opacity: 0,
                [sumbu]: nilai
            },
            show: {
                opacity: 1,
                [sumbu]: 0,
                transition: {
                    duration: 0.5,
                    staggerChildren: 0.2,
                }
            }
        }
    }

    const formatGrowth = (value) => {
        if (!value) return "0%";
        const num = parseFloat(value);
        return num > 0 ? `+${value}%` : `${value}%`;
    }

    return (
        <div>
            {/* <AnimatePresence> */}
                <div className='hero-section-wrap'>

                    <div className='hero-section'
                    >

                        <motion.div className='hero-section-title'
                            // key={name}
                            variants={variant("x", -20)}
                            initial="hiden"
                            animate="show">
                            <h1>Welcome {name}</h1>
                            <p>ayo lihat perkembangan perpustakaan bulan kemarin</p>
                            <div className='Shortcut'>
                                <button>📋 View Full Reports</button>
                                <button>⚙️ Quick Setting</button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className='data-wrap'>

                    <motion.div
                        className='data'
                        // key={data.pemasukan_bulanan}
                        variants={variant('x', -20)}
                        initial="hiden"
                        animate="show"
                        transition={{ duration: 0.1 }}
                        whileHover={{
                            y: -5,
                            transition: { duration: 0.1, ease: 'easeInOut' } // Cepat saat kursor masuk
                        }}
                    >
                        <Card>
                            <CardHeder
                                Title={'Total Pemasukan'}
                                Atribute={<Wallet />} />
                            <CardContent>
                                <span>{data ? data.pemasukan_bulanan.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }) : '0'}</span>
                                <p>{formatGrowth(data?.growth.growthPemasukan)}</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        className='data'
                        //key={data.pengeluaran_bulanan}
                        variants={variant('x', -20)}
                        initial="hiden"
                        animate="show"
                        transition={{ duration: 0.1 }}
                        whileHover={{
                            y: -5,
                            transition: { duration: 0.1, ease: 'easeInOut' } // Cepat saat kursor masuk
                        }}
                    >
                        <Card >
                            <CardHeder
                                Title={'Total Pengeluaran'}
                                Atribute={<UsersRound />} />
                            <CardContent>
                                <span>{data ? data.pengeluaran_bulanan.toLocaleString("id-ID") : 0}</span>
                                <p>{formatGrowth(data?.growth.growthPengeluaran)}</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        className='data'
                       // key={data.trafic_penarikan}
                        variants={variant('x', -20)}
                        initial="hiden"
                        animate="show"
                        transition={{ duration: 0.1 }}
                        whileHover={{
                            y: -5,
                            transition: { duration: 0.1, ease: 'easeInOut' } // Cepat saat kursor masuk
                        }}>
                        <Card >
                            <CardHeder
                                Title={'Traffic Penarikan'}
                                Atribute={<BookOpen />} />
                            <CardContent>
                                <span>{data ? data.trafic_penarikan.toLocaleString("id-ID") : 0}</span>
                                <p>{formatGrowth(data?.growth.growthTrafficPenarikan)}</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        className='data'    
                       //key={data.trafic_setoran}
                        variants={variant('x', -20)}
                        initial="hiden"
                        animate="show"
                        transition={{ duration: 0.1 }}
                        whileHover={{
                            y: -5,
                            transition: { duration: 0.1, ease: 'easeInOut' } // Cepat saat kursor masuk
                        }}>
                        <Card >
                            <CardHeder
                                Title={'Traffic Setoran'}
                                Atribute={<BookSearch />} />
                            <CardContent>
                                <span>{data ? data.trafic_setoran.toLocaleString("id-ID") : 0}</span>
                                <p>{formatGrowth(data?.growth.growthTrafficSetoran)}</p>
                            </CardContent>
                        </Card>
                    </motion.div>


                </div>

                <div className='Quick-Fitur'>
                    <div className='Quick-Information'>
                        <h1>Quick Information</h1>
                        <p>Apa Yang terjadi baru-baru ini</p>
                        <div className='Information'>
                            <div>
                                <span>Member Baru</span>
                                <p>5 menit yang lalu</p>
                            </div>
                            <div>
                                <span>Buku Dipinjam</span>
                                <p>17 menit yang lalu</p>
                            </div>
                            <div>
                                <span>Buku Dikembalikan</span>
                                <p>12 menit yang lalu</p>
                            </div>
                            <div>
                                <span>Update Pendapatan</span>
                                <p>18 jam yang lalu</p>
                            </div>
                        </div>
                    </div>

                    <div className='Quick-Action'>
                        <h1>Quick Action</h1>
                        <p>Fitur yg sering digunakan</p>
                        <div className='Action'>
                            {QuickAction('/Setting', <Settings />, 'Settings')}
                            {QuickAction('/Import', <FileDown />, 'Import Data')}
                            {QuickAction('/Reports', <ChartColumn />, 'Chart')}
                            {QuickAction('/Reports', <BookOpen />, 'Stock Book')}
                        </div>
                    </div>
                </div>

            {/* </AnimatePresence> */}
        </div>
    )
}