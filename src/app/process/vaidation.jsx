export function validation(data) {
    const result = data.reduce((acc, item) => {
        let isInvalid = false;

        if (!item.nama || item.nama.trim() === "") {
            isInvalid = true;
        }
        if (!item.kelas || item.kelas.trim() === "") {
            isInvalid = true;
        }
        if (!item.status || item.status.trim() === "") {
            isInvalid = true;
        }
        if (item.nominal === null || typeof item.nominal !== "number") {
            isInvalid = true;
        }

        if (isInvalid) {
            acc.invalid += 1;
            acc.invalidData.push(item);
        } else {
            acc.valid += 1;
        }

        return acc;
    }, {
        valid: 0,
        invalid: 0,
        invalidData: []
    });

    return result;
}
