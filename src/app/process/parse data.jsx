import  Papa  from "papaparse"

export function parseData(file) {
    return Papa.parse(file, {
        header: true,
        dynamicTyping: true,
    })
}
