'use client'
import { AmbilData } from "../server/data-server";
import process from "../process/process-month-data";
import { useState, useEffect } from "react";
import LoadingComponent from "../motion-component/loading";
import Link from "next/link";
import { useAuth } from '../context/use-auth';
import card from '../components/card';
import "../dashboard.css"
import { BookOpen, Wallet, FileDown, UsersRound, ChartColumn, Settings, BookSearch } from "lucide-react";

export default function Dashboard() {
    const [data, setData] = useState();
    const [Loading, setLoading] = useState(true)
    const { user, isLogin } = useAuth()
    const { Card, CardHeder, CardContent } = card

    const name = user?.user_metadata?.display_name

    useEffect(() => {
        async function fetchData() {
            const rawdata = await AmbilData(['2026-01-01', '2026-02-01'])
            const newdata = process(rawdata)
            setData(newdata)
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


    return (
        <div>
            <div className='hero-section-wrap'>
                <section className='hero-section'>
                    <h1>Welcome {name}</h1>
                    <p>ayo lihat perkembangan perpustakaan bulan kemarin</p>
                    <div className='Shortcut'>
                        <button>📋 View Full Reports</button>
                        <button>⚙️ Quick Setting</button>
                    </div>

                </section>
            </div>

            <div className='data-wrap'>

                <Card className='data'>
                    <CardHeder
                        Title={'Total Pendapatan'}
                        Atribute={<Wallet />} />
                    <CardContent>
                        <span>{data.total_penghasilan.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</span>
                        <p>+{data.growth.growthPendapatan}%</p>
                    </CardContent>
                </Card>

                <Card className='data'>
                    <CardHeder
                        Title={'User Berkunjung'}
                        Atribute={<UsersRound />} />
                    <CardContent>
                        <span>{data.total_user.toLocaleString("id-ID")}</span>
                        <p>+{data.growth.growthUser}%</p>
                    </CardContent>
                </Card>

                <Card className='data'>
                    <CardHeder
                        Title={'Buku Dipinjam'}
                        Atribute={<BookOpen />} />
                    <CardContent>
                        <span>{data.total_buku.toLocaleString("id-ID")}</span>
                        <p>+{data.growth.growthBuku}%</p>
                    </CardContent>
                </Card>

                <Card className='data'>
                    <CardHeder
                        Title={'Buku Tersisa'}
                        Atribute={<BookSearch />} />
                    <CardContent>
                        <h1 style={{ marginTop: "28px", fontSize: '1.6rem' }}>{data.BukuTersisa.toLocaleString("id-ID")}</h1>
                    </CardContent>
                </Card>

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

        </div>
    )
}