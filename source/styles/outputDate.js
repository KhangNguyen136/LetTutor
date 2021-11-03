
export const outputDate = (date) => {
    const str = date.toISOString().slice(0, 16).replace(/-/g, "-").replace("T", " ");
    return str
}

export function formatAmount(number, haveUnit = true) {
    var temp = String(number)
    const n = temp.length
    var newN = n
    var end = n - 1
    if (n < 4)
        return haveUnit ? temp + " vnđ" : temp
    for (let id = n - 3; id > 0; id = id - 3) {
        temp = temp.substring(0, id) + '.' + temp.substring(id, newN)
        newN++
    }
    return haveUnit ? temp + " vnđ" : temp
}