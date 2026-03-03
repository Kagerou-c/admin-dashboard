export function chartData(params) {


  const newDate = (date) => new Date(date).toLocaleDateString('id-ID', { month: 'long' })


  const result = params.reduce((acc, item, index, arr) => {
    acc.dataUser.push(item.total_user)
    acc.dataPenghasilan.push(item.total_penghasilan)
    acc.dataBuku.push(item.total_buku)
    acc.month.push(newDate(item.month))

    acc.totalUser += item.total_user
    acc.totalPenghasilan += item.total_penghasilan
    acc.totalBuku += item.total_buku

    if (index === 0) return acc

    const prev = arr[index - 1].total_user

    if (item.total_user > prev) {
      acc.BulanPeningkatan = newDate(item.month)
    }

    if (item.total_user < prev) {
      acc.BulanPenurunan = newDate(item.month)
    }

    return acc
  }, {
    dataUser: [],
    dataPenghasilan: [],
    dataBuku:[],
    month: [],
    totalUser: 0,
    totalPenghasilan: 0,
    totalBuku: 0,
    BulanPeningkatan: null,
    BulanPenurunan: null
  })

  return {
    ...result,
    rata_rata: result.totalUser / result.dataUser.length
  }
}