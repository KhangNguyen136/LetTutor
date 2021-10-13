import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import firebaseApp from '../../firebase';
import TextInputCard from '../../components/TextInputCard';
import { MyButton } from '../../components/button';

export default function ChangePassword(navigation) {
    const [email, setEmail] = React.useState('')
    const ok = () => {

    }
    return (
        <SafeAreaView >
            <Text style={styles.Title} >Change password</Text>
            <Text style={styles.content}>Enter the email with your account and we will send an email with instructions to reset your password</Text>
            {/* <Text style={styles.content}>Email address: </Text> */}
            <TextInputCard title={'Email address: '} placeholder={'Enter your email'} value={email} onChangeValue={setEmail} />
            <MyButton title={'Send instructions'} onPress={ok} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Title: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        padding: 10
    },
    content: {
        fontSize: 18,
        padding: 10
    }
})