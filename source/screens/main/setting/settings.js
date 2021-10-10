import React from 'react';
import { Text, SafeAreaView, Button } from 'react-native';
import firebaseConfig from '../../../firebaseConfig';
import { showMessage } from 'react-native-flash-message';
import { globalStyles } from '../../../styles/globalStyles';
import { MyButton } from '../../../components/button';

export default function SettingScreen() {
    const logOut = () => {
        firebaseConfig.auth().signOut().then(() => {
            console.log("Logged out successfully")
            showMessage({
                message: "Logged out sucessfully",
                type: 'success'
            })

        }).catch((error) => {
            console.log('Log out failed', error.message)
            showMessage({
                message: 'Action failed',
                description: error.message,
                type: 'danger'
            })
        })
    }
    return (
        <SafeAreaView>
            <Text>Account infor screen</Text>
            <MyButton title={'Log out'} onPress={logOut} moreStyle={globalStyles.authBtnContainer} moreTitleStyle={{ color: 'white' }} />
        </SafeAreaView>
    )
}