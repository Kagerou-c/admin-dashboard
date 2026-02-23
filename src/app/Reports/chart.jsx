'use client'

import { chartData } from "../process/processChartData";
import { AmbilData } from "../server/data server";
import RevenueChart from "./bar chart";
import DoughnutChart from "./doughnut chart";
import LineChart from "./line chart";
import { useEffect, useState } from "react";
import { UsersRound, Wallet, Book } from "lucide-react";
import card from "../component/card";
import LoadingComponent from "../motion component/loading";
import '../chart.css'

export default function Chart() {
    const [data, setData] = useState(null)
    const { Card, CardContent, CardHeder } = card

    useEffect(() => {
        async function getData() {
            const rawdata = await AmbilData()
            const newData = chartData(rawdata)
            setData(newData)

        }
        getData()
        const theme = localStorage.getItem("admin_theme") || "light"
        if (theme === "system") {
            const gelap = window.matchMedia("(prefers-color-scheme: dark)").matches
            document.documentElement.setAttribute("data-theme", gelap ? "dark" : "light")
        } else {
            document.documentElement.setAttribute("data-theme", theme)
        }
    }, [])

    if (!data)
        return <LoadingComponent />;

    const { dataUser, dataPenghasilan, dataBuku, month, totalUser, totalPenghasilan, totalBuku, BulanPeningkatan, BulanPenurunan, rata_rata } = data
    console.log(totalUser, totalPenghasilan, totalBuku, BulanPeningkatan, BulanPenurunan)


    return (
        <div >
            <div className="chart-header">
                <h1>Reports</h1>
                <p>view your reports </p>
            </div>
            <div className="summary-stats-wrap">
                <div className="stat-card">
                    <div className="stat-icon user-icon"><UsersRound color="#69bdf2" /></div>
                    <div className="stat-info">
                        <h3>Total User</h3>
                        <p>{totalUser.toLocaleString('id-ID')}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon money-icon"><Wallet color="#ff61ea" /></div>
                    <div className="stat-info">
                        <h3>Total Pendapatan</h3>
                        <p>{totalPenghasilan.toLocaleString('id-ID')}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon book-icon"><Book color="#52ff86" /></div>
                    <div className="stat-info">
                        <h3>Total Buku Dipinjam</h3>
                        <p>{totalBuku.toLocaleString('id-ID')}</p>
                    </div>
                </div>
            </div>

            <div className='chart-wrap'>
                <div className='chart-card'>
                    <RevenueChart DataPenghasilan={dataPenghasilan} Bulan={month} />
                </div>
                <div className='chart-card'>
                    <LineChart DataUser={dataUser} Bulan={month} />
                </div>
            </div>



            <div className="Data-singkat-wrap">
                <Card className={'data'}>
                    <CardHeder
                        Title={'Total User'} />
                    <CardContent>
                        <p>{totalUser.toLocaleString('id-ID')}</p>
                    </CardContent>
                </Card>
                <Card className={'data'}>
                    <CardHeder
                        Title={'Rata-Rata User'} />
                    <CardContent>
                        <p>{rata_rata.toLocaleString('id-ID')}</p>
                    </CardContent>
                </Card>
                <Card className={'data'}>
                    <CardHeder
                        Title={'Bulan penurunan'} />
                    <CardContent>
                        <p>{BulanPenurunan}</p>
                    </CardContent>
                </Card>
                <Card className={'data'}>
                    <CardHeder
                        Title={'Bulan Ramai'} />
                    <CardContent>
                        <p>{data?.BulanPeningkatan}</p>
                    </CardContent>
                </Card>
            </div>




            <div className="chart-wrap">
                <div className="chart-wrap-doughnut">
                    <div className="legend-header">
                        <h2>Detail Buku</h2>
                    </div>
                    <div className="legend-container">
                        {month.map((item, index) => {
                            const colors = ['#FFADAD', '#9BFBC0', '#FDFFB6', '#CAFFBF', '#98F5FF', '#FFD6A5', '#BDB2FF'];
                            return (
                                <div key={index} className="legend-item">
                                    <div className="legend-color" style={{ backgroundColor: colors[index % colors.length] }}></div>
                                    <div className="legend-info">
                                        <span className="legend-label">{item}</span>
                                        <span className="legend-value">{dataBuku[index]}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <DoughnutChart DataBuku={dataBuku} Bulan={month} />
            </div>

        </div>
    )

}