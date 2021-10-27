import * as firebase from 'firebase';
// import { showMessage } from 'react-native-flash-message';

const firebaseConfig = {
    apiKey: "AIzaSyBUvi6skrYMjIFzezWHd68vIefmGk2R5Qg",
    authDomain: "letuttor.firebaseapp.com",
    projectId: "letuttor",
    storageBucket: "letuttor.appspot.com",
    messagingSenderId: "1002184791709",
    appId: "1:1002184791709:web:d3a3a9ec552c657282e674",
    measurementId: "G-VSWZWENEQM"
};

export default firebaseApp = firebase.initializeApp(firebaseConfig);

// export const logOut = (showMessage) => {
//     firebaseApp.auth().signOut().then(() => {
//         console.log("Logged out successfully")
//         showMessage({
//             message: "Logged out sucessfully",
//             type: 'success'
//         })

//     }).catch((error) => {
//         console.log('Log out failed', error.message)
//         showMessage({
//             message: 'Action failed',
//             description: error.message,
//             type: 'danger'
//         })
//     })
// }