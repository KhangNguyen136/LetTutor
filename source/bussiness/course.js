export function getListTag(listTag) {
    const result = [];
    listTag.forEach(item =>
        result.push(item.title))
    return result;
}