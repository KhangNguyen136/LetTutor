import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import TextInputCard from '../../components/TextInputCard';
import { MyButton } from '../../components/button';
import { FlexCard } from '../../components/card';
import { globalStyles } from '../../styles/globalStyles';
import LoadingIndicator from '../../components/loadingIndicator';
import { validateEmail } from '../../bussiness/validInput';
import { showMessage } from 'react-native-flash-message';
import { serverUrl } from '../../const';
import axios from 'axios';
import errorHandle from '../../bussiness/errorHanle';

export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = React.useState('')
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const done = async () => {
        if (!validateEmail(email)) {
            setError('Invalid email');
            return
        }
        setLoading(true)
        try {
            await axios.post(serverUrl + 'user/forgotPassword', {
                email
            })
            showMessage({ type: 'success', message: 'Email sent successfully', description: 'Let check your mail and reset your password!' })
        } catch (error) {
            errorHandle(error);
        }
        setLoading(false)
    }
    const onChange = (text) => {
        setEmail(text);
        if (text == '') {
            setError('Please enter your email');
        }
        else {
            setError('')
        }
    }
    return (
        <SafeAreaView style={globalStyles.container}>
            <FlexCard>
                <Text style={styles.Title} >Reset password</Text>
                <Text style={styles.content}>Enter the email with your account and we will send an email with instructions to reset your password.</Text>
                <TextInputCard title={'Email'} placeholder={'Enter your account email'} value={email} onChangeValue={onChange} />
                {
                    error != '' &&
                    <Text style={globalStyles.error}>{error}</Text>
                }
                <View style={{ height: 10 }}></View>
                <MyButton title={'Send instructions'} onPress={done} />
            </FlexCard>
            {
                loading &&
                <LoadingIndicator />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     width: '99%',
    //     backgroundColor:
    // },
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