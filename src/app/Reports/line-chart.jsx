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

export default function LineChart({ DataSaldo, Bulan }) {

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Saldo Bersih per Bulan',
                font: { size: 14, weight: '600' },
                padding: { bottom: 16 }
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        let label = context.dataset.label || '';
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                minimumFractionDigits: 0
                            }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    callback: (value) => new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0
                    }).format(value)
                }
            },
            x: {
                grid: { display: false }
            }
        }
    }

    const data = {
        labels: Bulan,
        datasets: [{
            label: 'Saldo ',
            data: DataSaldo,
            borderColor: 'rgb(124, 93, 250)',
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, "rgba(124, 93, 250, 0.35)");
                gradient.addColorStop(1, "rgba(124, 93, 250, 0)");
                return gradient;
            },
            fill: true,
            tension: 0.4,
            pointBackgroundColor: 'rgba(124, 93, 250, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(124, 93, 250)',
            pointRadius: 4,
            pointHoverRadius: 6,
        }]
    };

    return (
        <Line options={options} data={data} />
    )
}