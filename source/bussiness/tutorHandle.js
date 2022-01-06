import axios from "axios";
import { serverUrl } from "../const";
import errorHandle from "./errorHanle";

export function handleListTutor(data) {
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
    for (let i = 0; i < tutors.length; i++) {
        if (tutors[i].userId == id) {

            tutors[i].isFavor = !tutors[i].isFavor;
            console.log(tutors[i].isFavor)
            break;
        }
    }
    return tutors;
}

export async function favorAction(id, token) {
    try {
        const res = await axios.post(serverUrl + 'user/manageFavoriteTutor', {
            tutorId: id
        },
            { headers: { 'Authorization': 'Bearer ' + token } })
        return true;
    } catch (error) {
        errorHandle(error);
        return false;
    }

}
