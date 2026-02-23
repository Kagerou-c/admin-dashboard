'use client';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// --- PLUGIN CUSTOM UNTUK GARIS PENUNJUK ---


export default function DoughnutChart({ DataBuku, Bulan }) {
  const data = {
    labels: Bulan,
    datasets: [{
      data: DataBuku,
      backgroundColor: ['#FFADAD', '#9BFBC0', '#FDFFB6', '#CAFFBF', '#98F5FF', '#FFD6A5', '#BDB2FF'],
      borderRadius: 20,
      spacing: 10,
      cutout: '70%',
    }]
  };


  return (
    <div className='chart-wrap-doughnut'>
      <Doughnut data={data} options={{ plugins: { title: { display: true, text: 'Laporan Buku Dipinjam', position: 'top', }, legend: { display: false } } }} />
    </div>
  );
}