import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { serverUrl } from '../const';
import errorHandle from '../bussiness/errorHanle';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
export async function signInWithGoogle() {

    try {
        const { idToken } = await GoogleSignin.signIn();
        console.log(idToken);
        signInWithGoogleToken(idToken);
        // Create a Google credential with the token
        // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // // Sign-in the user with the credential
        // const res = await auth().signInWithCredential(googleCredential);
        // console.log(res.user);
    } catch (error) {
        showMessage({ type: 'danger', message: 'Something broken', description: error.toString() })
        console.log(error.message);
        return false;
    }
}

async function signInWithGoogleToken(access_token) {
    try {
        const res = await axios.post(serverUrl + 'auth/google', { access_token });
        console.log(res.data);
    } catch (error) {
        errorHandle(error);
        console.log(error);
    }
}

