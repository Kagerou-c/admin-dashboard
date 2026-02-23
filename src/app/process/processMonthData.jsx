
export default function process(data) {
    const [lastMonth, curentMonth]=data
    
    const growthUser = (curentMonth.total_user - lastMonth.total_user)*100/lastMonth.total_user
    const growthBuku = (curentMonth.total_buku - lastMonth.total_buku)*100/lastMonth.total_buku
    const growthPendapatan = (curentMonth.total_penghasilan - lastMonth.total_penghasilan)*100/lastMonth.total_penghasilan

    const BukuTersisa = (10000 - curentMonth.total_buku)

    return { ...curentMonth, BukuTersisa: BukuTersisa, growth:{growthUser:growthUser.toFixed(2), growthBuku:growthBuku.toFixed(2), growthPendapatan:growthPendapatan.toFixed(2)} }

}