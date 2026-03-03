'use client'; // WAJIB untuk Next.js App Router

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  plugins,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';






// Registrasi modul Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({ DataPenghasilan, Bulan }) => {


  const data = {
    labels: Bulan,
    datasets: [
      {
        label: 'Penghasian  ',
        data: DataPenghasilan,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  }
  const config = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value) },
      }
    },

    plugins: {
      tooltip: {
        callbacks: {
          label: function (Context) {
            let label = Context.dataset.label
            if (Context.parsed.y !== null) {
              label += new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Context.parsed.y)
            }
            return label
          }
        }
      },
      legend: { display: false },
      title: { display: true, text: 'Laporan penghasilan' },
    }
  }


  return (

    <Bar data={data} options={config} />

  );

};
export default RevenueChart;