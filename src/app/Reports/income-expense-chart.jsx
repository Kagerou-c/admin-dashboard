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

export default function IncomeExpenseChart({ Pemasukan, Pengeluaran, Bulan }) {

  // Pengeluaran dijadikan negatif agar bar mengarah ke bawah
  const pengeluaranNegatif = Pengeluaran.map(v => -Math.abs(v));

  const data = {
    labels: Bulan,
    datasets: [
      {
        label: 'Pemasukan  ',
        data: Pemasukan,
        backgroundColor: 'rgba(52, 211, 153, 0.65)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: 'Pengeluaran  ',
        data: pengeluaranNegatif,
        backgroundColor: 'rgba(248, 113, 113, 0.6)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const config = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
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
        },
        grid: {
          color: (context) => {
            if (context.tick.value === 0) {
              return '#94a3b8';
            }
            return 'rgba(0,0,0,0.06)';
          },
          lineWidth: (context) => {
            if (context.tick.value === 0) {
              return 2;
            }
            return 1;
          }
        }
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
              const absVal = context.parsed.y;
              label += new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
              }).format(absVal);
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
        text: 'Pemasukan vs Pengeluaran',
        font: { size: 14, weight: '600' },
        padding: { bottom: 16 }
      },
    }
  };

  return (
    <Bar data={data} options={config} />
  );
}
