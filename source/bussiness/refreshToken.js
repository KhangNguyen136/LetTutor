import { serverUrl } from "../const";
import axios from "axios";
import { useSelector } from "react-redux";
import errorHandle from "./errorHanle";

export async function reFreshToken(refreshToken, timezone) {
    try {
        const res = await axios.post(serverUrl + 'auth/refresh-token', {
            refreshToken, timezone
        },
            {
                headers: { 'Authorization': 'Bearer ' + refreshToken }
            })
        console.log(res.data)
        return res.data;
    } catch (error) {
        errorHandle(error);
        return null;
    }
}

export async function checkToken(accessToken) {
    try {
        const res = await axios.get(serverUrl + 'user/info', {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        })
        return true;
    } catch (error) {
        // errorHandle(error)
        console.log('Check token fail: ' + error.response.data.message);
        return false;
    }
}