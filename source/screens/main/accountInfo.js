import React from 'react';
import { Text, SafeAreaView, Button } from 'react-native';
import firebaseConfig from '../../firebaseConfig';

export default function AccountInfoScreen() {
    const logOut = () => {
        firebaseConfig.auth().signOut().then(() => {
            // dispatch(loggedOut())
            console.log("Logged out successfully")
        }).catch((error) => {
            console.log('Log out failed', error.message)
        })
    }
    return (
        <SafeAreaView>
            <Text>Account infor screen</Text>
            <Button title={'Log out'} onPress={logOut} />
        </SafeAreaView>
    )
}