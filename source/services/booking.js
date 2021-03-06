import { serverUrl } from "../const";
import axios from "axios";
import errorHandle from "../bussiness/errorHanle";
import { showMessage } from "react-native-flash-message";

export async function editRequest(studentRequest, bookedId, token) {
    try {
        const res = await axios.post(serverUrl + 'booking/student-request/' + bookedId, {
            studentRequest
        },
            {
                headers: { 'Authorization': 'Bearer ' + token }
            })
        showMessage({ type: 'success', message: 'Update request successfully' })
        return true;
    } catch (error) {
        errorHandle(error);
        return false;
    }
}

export async function cancelLesson(scheduleDetailIds, token) {
    try {
        axios.delete()
        const res = await axios.delete(serverUrl + 'booking',
            {
                headers: { 'Authorization': 'Bearer ' + token },
                data: {
                    scheduleDetailIds
                }
            })
        showMessage({ type: 'success', message: 'Cancel lesson successfully' })
        return true;
    } catch (error) {
        errorHandle(error);
        return false;
    }
}

export async function bookingLesson(scheduleDetailIds, note, token) {
    try {
        const res = await axios.post(serverUrl + 'booking', {
            scheduleDetailIds, note
        },
            {
                headers: { 'Authorization': 'Bearer ' + token }

            })
        return true;
    } catch (error) {
        errorHandle(error);
        return false;
    }
}