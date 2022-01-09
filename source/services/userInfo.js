import { showMessage } from 'react-native-flash-message';
import { serverUrl } from '../const';
import errorHandle from '../bussiness/errorHanle';
import axios from 'axios';
import FormData from 'form-data';

export async function updateAvatar(token, imgData) {
    try {
        let data = new FormData();
        data.append('avatar', {
            uri: imgData.uri,
            type: imgData.type, name: imgData.fileName
        })
        const res = await axios.post(serverUrl + 'user/uploadAvatar', { formData: data }, {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        return true;
    } catch (error) {
        errorHandle(error);
        return false;
    }

}

export async function getUserInfo(token) {
    try {
        const res = await axios.get(serverUrl + 'user/info', {
            headers: { 'Authorization': 'Bearer ' + token }
        })

        return res.data.user;
    } catch (error) {
        errorHandle(error);
        return null;
    }
}