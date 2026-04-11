export function chartData(params) {
  const formatDate = (date) => new Date(date).toLocaleString('id-ID', { month: 'long' });

  const result = params ? params.reduce((acc, item) => {

    //bulan
    acc.month.push(item.bulan);

    //chart trafic user
    acc.traficSetoran.push(item.trafic_setoran);
    acc.traficPenarikan.push(item.trafic_penarikan);

    //chart saldo keseluruhan bulan
    acc.saldoBersih.push(item.nominal);

    //chart pemasukan dan pengeluaran
    acc.pemasukanBulanan.push(item.pemasukan_bulanan);
    acc.pengeluaranBulanan.push(item.pengeluaran_bulanan);

    //summary
    acc.totalTrfic += item.trafic_setoran + item.trafic_penarikan;
    acc.totalSaldo += item.nominal;

    return acc;
  }, {
    //bulan
    month: [],

    //chart trafic user
    traficPenarikan: [],
    traficSetoran: [],

    //chart saldo keseluruhan bulan
    saldoBersih: [],

    //chart pemasukan dan pengeluaran
    pemasukanBulanan: [],
    pengeluaranBulanan: [],

    //summary
    totalTrfic: 0,
    totalSaldo: 0,
    BulanPeningkatan: null,
    BulanPenurunan: null
  })
    : {
       //bulan
    month: [],

    //chart trafic user
    traficPenarikan: [],
    traficSetoran: [],

    //chart saldo keseluruhan bulan
    saldoBersih: [],

    //chart pemasukan dan pengeluaran
    pemasukanBulanan: [],
    pengeluaranBulanan: [],

    //summary
    totalTrfic: 0,
    totalSaldo: 0,
    BulanPeningkatan: null,
    BulanPenurunan: null
    }
  //hitung bulan dengan trafic tertinggi & terendah
  if (params && params.length > 0) {
    const sorted = [...params].sort((a, b) =>
      (a.trafic_setoran + a.trafic_penarikan) - (b.trafic_setoran + b.trafic_penarikan)
    );

    result.BulanPenurunan = formatDate(sorted[0].bulan);
    result.BulanPeningkatan = formatDate(sorted[sorted.length - 1].bulan);
  }

  return {
    ...result,
    rata_rata: result.traficSetoran.length + result.traficPenarikan.length > 0 ? result.totalTrfic / result.traficSetoran.length+result.traficPenarikan.length : 0
  };
}
