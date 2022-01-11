import { levelFilter } from "../constant";
export function getListTag(listTag) {
    const result = [];
    listTag.forEach(item =>
        result.push(item.title))
    return result;
}


export function getLevelTitle(id) {
    if (id == 0)
        return 'Any Level'
    const result = levelFilter.find(item => item.id == id);
    if (result != undefined)
        return result.label;
    return 'Any Level'
}