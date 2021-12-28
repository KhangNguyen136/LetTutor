import React from 'react';
import { View, SafeAreaView, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/core';
import LoadingIndicator from '../../components/loadingIndicator';
import { checkPassword, validateEmail } from '../../bussiness/validInput';
import TextInputCard from '../../components/TextInputCard';
import PasswordTextInput from '../../components/passwordInput';
import { MyButton } from '../../components/button';
import { FlexCard } from '../../components/card';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import { serverUrl } from '../../const';

export default function SignUp() {
    const [loading, setLoading] = React.useState(false)
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    //error
    const [usernameError, setUsernameError] = React.useState('')
    const [passError, setPassError] = React.useState('')
    const [confirmPassError, setConfirmPassError] = React.useState('')

    const navigation = useNavigation()
    const SignUpAcc = async (email, password) => {
        setLoading(true)
        try {
            const res = await axios.post(`${serverUrl}auth/register`, {
                email, password, source: null
            })
            showMessage({ type: 'success', message: 'Register successful', description: 'Check your mail to confirm your account' })
        } catch (error) {
            console.log(error)
            showMessage({ type: 'warning', message: 'Register fail', description: 'Email has already taken' })
        }
        setLoading(false)
    }
    const pressSignUp = () => {
        if (CheckInput(username, password, confirmPassword) === false) {
            return
        }

        SignUpAcc(username, password)
    }
    function CheckInput(email, pass, pass2) {
        if (validateEmail(email) === false) {
            setUsernameError('Invalid email')
            return false
        }
        if (checkPassword(pass) === false) {
            setPassError('Invalid password')
            return false
        }
        if (pass !== pass2) {
            setConfirmPassError('Not same as password')

            return false
        }

        return true
    }
    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView style={{ flex: 1 }} >
                <FlexCard  >
                    <View style={{ alignSelf: 'center' }} >
                        <Image style={{ borderRadius: 40 }} source={require('../../../assets/logo.png')} />
                    </View>
                    <TextInputCard title={'Email'} placeholder={'Enter email'} value={username}
                        onChangeValue={(value) => {
                            if (value == '') {
                                setUsernameError('Please enter your email')
                            }
                            else {
                                setUsernameError('')
                            }
                            setUsername(value)
                        }} />

                    <Text style={styles.error}>{usernameError}</Text>
                    <PasswordTextInput title={'Password'} placeholder={'Contain at least 6 characters'} value={password}
                        onChangeValue={(value) => {
                            if (value == '') {
                                setPassError('Please enter your password')
                            }
                            else {
                                setPassError('')
                            }
                            setPassword(value)
                        }} />

                    <Text style={styles.error}>{passError}</Text>

                    <PasswordTextInput title={'Confirm password'} placeholder={'Enter password again'} value={confirmPassword}
                        onChangeValue={(value) => {
                            if (value == '') {
                                setConfirmPassError('Confirm password')
                            }
                            else {
                                setConfirmPassError('')
                            }
                            setConfirmPassword(value)
                        }} />

                    <Text style={styles.error}>{confirmPassError}</Text>
                    <MyButton onPress={pressSignUp} title={'Sign up'} moreTitleStyle={{ color: 'white' }} moreStyle={globalStyles.authBtnContainer} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }} >
                        <Text style={{ fontSize: 14 }} >Have had an account already?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('LogIn')} >
                            <Text style={{ paddingLeft: 3, fontSize: 14, fontWeight: '500', color: '#3399ff' }}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                    {loading &&
                        <LoadingIndicator />
                    }
                </FlexCard>
            </ScrollView>
        </SafeAreaView>
    )
}

styles = StyleSheet.create({
    error: { color: 'orange', marginLeft: 10, fontWeight: '500' },
})
