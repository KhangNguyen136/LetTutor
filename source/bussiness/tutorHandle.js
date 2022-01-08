

export function handleListTutor(data) {
    if (data == null)
        return [];
    const listTutors = data.tutors.rows;
    const favorTutors = data.favoriteTutor;

    listTutors.forEach(tutor => {
        const favorItem = favorTutors.find(item => item.secondInfo.id == tutor.userId);
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

export function updateFavorTutor(tutors, id) {

    const tutor = tutors.find(item => item.userId == id);
    if (tutors != undefined)
        tutor.isFavor = !tutors.isFavor;
    return tutors;
}

