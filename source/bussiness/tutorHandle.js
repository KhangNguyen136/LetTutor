export function formatFavoriteTutor(list) {
    const result = [];
    list.forEach(item => {
        const temp = list.secondInfo;
        temp.isLiked = true;
        result.push(temp);
    })
    return result;
}
