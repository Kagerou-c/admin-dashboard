
import Papa from "papaparse"

export function ParseData(file, onComplete) {
    Papa.parse(file, {
        header: true, // Ubah ke true untuk mendapatkan array of objects
        dynamicTyping: false, // false agar tidak mengubah tipe data supaya cleaning data di lakukan di server
        preview: 10, // Ambil 10 baris data
        complete: (results) => {
            if (onComplete) {
                onComplete(results)
            }
        }
    })
}
