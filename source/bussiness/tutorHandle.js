

export function handleListTutor(data, favourData) {
    if (data == null)
        return [];
    const listTutors = data;
    const favourTutors = favourData;

    listTutors.forEach(tutor => {
        const favorItem = favourTutors.find(item => {
            if (item.secondInfo == null)
                return false
            return item.secondInfo.id == tutor.userId
        });
        if (favorItem != undefined)
            tutor.isFavor = true;
        var rating = undefined;

        if (tutor.feedbacks.length != 0) {
            rating = 0;
            tutor.feedbacks.forEach(item =>
                rating += item.rating
            )
            rating = rating / tutor.feedbacks.length;
        }
        tutor.rating = rating;

    })
    return listTutors;
}

export function handleListConst(data) {
    const result = [];
    data.forEach(item => {
        result.push({ ...item, label: item.name })
    })
    return result;
}

export function updateFavorTutor(tutors, id) {

    const tutor = tutors.find(item => item.userId == id);
    if (tutors != undefined)
        tutor.isFavor = !tutors.isFavor;
    return tutors;
}

