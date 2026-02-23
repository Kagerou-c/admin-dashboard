export function cleaningData(data) {
    const result = data.map(item => {
        return {
            ...item,
            nama: item.nama ? item.nama.replace(/\d/g, "").toLowerCase().trim() : item.nama,
            kelas : item.kelas ? item.kelas.toLowerCase().trim() : item.kelas,
            status : item.status ? item.status.toLowerCase().trim() : item.status,
            nominal : item.nominal ? Number(item.nominal.replace(/\D/g, "")) : item.nominal,
            
        };
    });
    return result;
}
