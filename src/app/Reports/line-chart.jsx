'use client'
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

export default function LineChart({ DataUser ,Bulan }) {

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Fixed typo: mantainAspectRatio -> maintainAspectRatio
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Laporan User Berkunjung' },
            tooltip:{
                callbacks:{
                    label:(context)=>{
                        let Label = context.dataset.label
                        if(context.parsed.y !== null){
                            Label += context.parsed.y.toLocaleString('id-ID')+' User'
                        }
                        return Label
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                max:8000,
                min:0,
                ticks: {
                    stepSize: 1000, // This might need adjustment based on data
                    callback: (value) => value.toLocaleString('id-ID')+' User'
                }
            },
            x: { // This is the x-axis configuration
                grid: {
                    display: false // Set display to false to hide vertical grid lines
                }

            }
        }
    }

    const data = {
        labels: Bulan,
        datasets: [{
            label: '',
            data: DataUser,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, "rgba(56, 243, 243, 0.42)");
                gradient.addColorStop(1, "rgba(48, 189, 189, 0)");
                return gradient;
            },
            fill: true,
            tension: 0.4, // Slightly smoother curve
            pointBackgroundColor: 'rgba(0, 255, 255, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(75, 192, 192)'
        }]
    };


    return (
        <Line height={'240px'} options={options} data={data} />
    )

}