import { serverUrl } from "../const";
import axios from "axios";
import errorHandle from "../bussiness/errorHanle";

export async function getNext(token) {
    try {
        const res = await axios.get(serverUrl + 'booking/next',
            {
                headers: { 'Authorization': 'Bearer ' + token }
            });
        return res.data.data[0];
    } catch (error) {
        errorHandle(error);
        return null;
    }
}

export async function getTotal(token) {
    try {
        const res = await axios.get(serverUrl + 'call/total',
            {
                headers: { 'Authorization': 'Bearer ' + token }
            }
        );
        return res.data.total;
    } catch (error) {
        errorHandle(error);
        return 0;
    }
}

export async function getHistorySchedule(token, page) {
    const today = new Date()
    const paramDate = new Date(today.setMinutes(today.getMinutes()));
    console.log(paramDate.valueOf())
    try {
        const res = await axios.get(serverUrl + 'booking/list/student', {
            params: {
                page, perPage: 20,
                dateTimeLte: paramDate.getTime(),
                orderBy: 'meeting',
                sortBy: 'desc'
            },
            headers: { 'Authorization': 'Bearer ' + token }
        })
        // console.log(res.data.data.count);
        return res.data.data.rows;

    } catch (error) {
        errorHandle(error);
        return []
    }
}

export async function getUpcomingSchedule(token, page, perPage) {
    const today = new Date()
    const paramDate = new Date(today.setMinutes(today.getMinutes()));
    try {
        const res = await axios.get(serverUrl + 'booking/list/student', {
            params: {
                page, perPage,
                dateTimeGte: paramDate.getTime(),
                orderBy: 'meeting',
                sortBy: 'asc'
            },
            headers: { 'Authorization': 'Bearer ' + token }
        })
        return res.data.data;

    } catch (error) {
        errorHandle(error);
        return []
    }
}
