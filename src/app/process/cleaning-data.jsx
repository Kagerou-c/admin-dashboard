export function CleaningData(data) {
    const result = data.map(item => {
        return {
            ...item,
            tanggal : item.tanggal ? item.tanggal : item.tanggal,
            nama: item.nama ? item.nama.replace(/\d/g, "").toLowerCase().trim() : item.nama,
            kelas : item.kelas ? item.kelas.trim() : item.kelas,
            keperluan : item.keperluan ? item.keperluan.toLowerCase().trim() : item.keperluan,
            nominal : item.nominal ? Number(item.nominal.replace(/\D/g, "")) : item.nominal,
            
        };
    });
    return result;
}
