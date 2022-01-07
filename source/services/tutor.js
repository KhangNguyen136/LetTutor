import axios from "axios";
import { serverUrl } from "../const";
import errorHandle from "../bussiness/errorHanle";

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

export async function getListTutor(page, itemPerPage, token) {
    try {
        const res = await axios.get(serverUrl + 'tutor/more', {
            params: {
                perPage: itemPerPage,
                page
            },
            headers: { 'Authorization': 'Bearer ' + token }
        });
        return res.data
    } catch (error) {
        errorHandle(error);
        return null;
    }
}