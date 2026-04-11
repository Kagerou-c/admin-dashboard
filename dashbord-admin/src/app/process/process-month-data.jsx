
export default function process(data) {
    const [lastMonth, curentMonth]=data
    
    const growthPemasukan = (curentMonth.pemasukan_bulanan - lastMonth.pemasukan_bulanan)*100/lastMonth.pemasukan_bulanan
    const growthPengeluaran = (curentMonth.pengeluaran_bulanan - lastMonth.pengeluaran_bulanan)*100/lastMonth.pengeluaran_bulanan
    const growthTrafficSetoran = (curentMonth.trafic_setoran - lastMonth.trafic_setoran)*100/lastMonth.trafic_setoran
    const growthTrafficPenarikan = (curentMonth.trafic_penarikan - lastMonth.trafic_penarikan)*100/lastMonth.trafic_penarikan

    const TotalTraffic = (curentMonth.trafic_setoran + curentMonth.trafic_penarikan)

    return { ...curentMonth, TotalTraffic: TotalTraffic, growth:{growthPemasukan:growthPemasukan.toFixed(2), growthPengeluaran:growthPengeluaran.toFixed(2), growthTrafficSetoran:growthTrafficSetoran.toFixed(2), growthTrafficPenarikan:growthTrafficPenarikan.toFixed(2)} }

}