export function Validation(data) {
    const result = data.reduce((acc, item, index) => {
        let isInvalid = false;
        if (!item.nama || item.nama.trim() === "") {
            isInvalid = true;
        }
        if (!item.kelas || item.kelas.trim() === "") {
            isInvalid = true;
        }
        if (!item.keperluan || item.keperluan.trim() === "") {
            isInvalid = true;
        }
        if (item.nominal === null || typeof item.nominal !== "number") {
            isInvalid = true;
        }

        if (isInvalid) {
            acc.invalid += 1;
            acc.invalidData.push(item);
            acc.invalidIndices.push(index + 1); // 1-based index
        } else {
            acc.valid += 1;
        }

        return acc;
    }, {
        valid: 0,
        invalid: 0,
        invalidData: [],
        invalidIndices: []
    });

    return result;
}
