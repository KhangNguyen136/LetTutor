import { serverUrl } from "../const";
import axios from "axios";
import errorHandle from "../bussiness/errorHanle";

export async function getListCourse(token, params) {

    try {
        const res = await axios.get(serverUrl + 'course', {
            params,
            headers: { 'Authorization': 'Bearer ' + token }
        })
        return res.data.data.rows;
    } catch (error) {
        errorHandle(error);
        return [];
    }
}