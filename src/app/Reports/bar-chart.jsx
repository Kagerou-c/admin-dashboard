'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({ TraficSetoran, TraficPenarikan, Bulan }) => {

  const data = {
    labels: Bulan,
    datasets: [
      {
        label: 'Setoran  ',
        data: TraficSetoran,
        backgroundColor: 'rgba(99, 179, 255, 0.65)',
        borderColor: 'rgb(59, 150, 240)',
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: 'Penarikan  ',
        data: TraficPenarikan,
        backgroundColor: 'rgba(255, 105, 180, 0.55)',
        borderColor: 'rgb(255, 80, 160)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  }

  const config = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value.toLocaleString('id-ID') + ' User'
        },
      },
      x: {
        grid: { display: false }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (context.parsed.y !== null) {
              label += context.parsed.y.toLocaleString('id-ID') + ' User';
            }
            return label;
          }
        }
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'rectRounded',
          padding: 20,
        }
      },
      title: {
        display: true,
        text: 'Trafik User (Setoran vs Penarikan)',
        font: { size: 14, weight: '600' },
        padding: { bottom: 16 }
      },
    }
  }

  return (
    <Bar data={data} options={config} />
  );
};

export default RevenueChart;