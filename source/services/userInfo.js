import { showMessage } from 'react-native-flash-message';
import { serverUrl } from '../const';
import errorHandle from '../bussiness/errorHanle';
import axios from 'axios';
import FormData from 'form-data';

export async function updateAvatar(token, imgData) {
    try {
        // return false;
        let data = new FormData();
        data.append('avatar', {
            uri: imgData.uri,
            type: imgData.type, name: imgData.fileName
        })
        const res = await axios.post(serverUrl + 'user/uploadAvatar', data, {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        showMessage({ type: 'success', message: 'Upload avatar successfully' })
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

export async function becomeTutor(data, token) {
    try {
        const params = new FormData()
        for (var key in data) {
            if (key == 'avatar' || key == 'video')
                continue;
            params.append(key, data[key]);
        }
        const videoInfo = data.video;
        params.append('video', {
            name: videoInfo.fileName,
            uri: videoInfo.uri,
            type: videoInfo.type
        })
        const imageInfo = data.avatar;
        params.append('avatar', {
            name: imageInfo.fileName,
            uri: imageInfo.uri,
            type: imageInfo.type
        })
        console.log(params);
        const res = await axios.post(serverUrl + 'tutor/', params, {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        return res;
    } catch (error) {
        errorHandle(error)
        return null;
    }

}