import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { Formik } from 'formik';
import firebaseApp from '../../firebase';
// import { Success, CheckInputFailed } from '../../Components/AlertMsg/messageAlert';
import TextInputCard from '../../components/TextInputCard'
import PasswordTextInput from '../../components/passwordInput';
import { MyButton } from '../../components/button';
import LoadingIndicator from '../../components/loadingIndicator';
import { FlexCard } from '../../components/card';
import { showMessage } from 'react-native-flash-message';
import LoginWithButton from '../../components/loginWithButton';
import { ScrollView } from 'react-native-gesture-handler';



export default function Login(props) {
    const [loading, setLoading] = React.useState(false)
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [usernameError, setUsernameError] = React.useState('')
    const [passError, setPassError] = React.useState('')

    const { navigation } = props


    const LoginAcc = (email, password) => {
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                setLoading(false)
                showMessage({
                    message: 'Logged in successfully',
                    type: 'success'
                });
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                setLoading(false)
                showMessage({
                    message: 'Login failed',
                    description: error.message,
                    type: 'danger'
                })
            });
    }

    CheckInput = (email, pass) => {
        if (validateEmail(email) === false) {
            setUsernameError('Invalid email')
            return false
        }
        if (checkPassword(pass) === false) {
            setPassError('Invalid password')
            return false
        }
        return true
    }

    function PressLogin() {
        console.log('log in with', { username, password })
        if (CheckInput(username, password) === false) {
            console.log('false')
            return
        }
        setLoading(true)
        LoginAcc(username, password)
    }

    return (
        <SafeAreaView style={{
            ...globalStyles.container,
            // backgroundColor: '#81ecec'
        }}>

            <ScrollView style={{ flex: 1 }} >
                <FlexCard >
                    {/* // <View> */}
                    <View style={{ alignSelf: 'center' }} >
                        <Image source={require('../../../assets/logo.png')} style={{ width: 200, height: 200, borderRadius: 40 }} />
                    </View>
                    <TextInputCard title={'Email'} placeholder={'Enter mail'} value={username}
                        onChangeValue={(value) => {
                            if (value == '') {
                                setUsernameError('Please enter your email')
                            }
                            else {
                                setUsernameError('')
                            }
                            setUsername(value)
                        }} />

                    <Text style={styles.error} >{usernameError}</Text>
                    <PasswordTextInput title={'Password'} placeholder={'Enter password'} value={password}
                        onChangeValue={(value) => {
                            if (value == '') {
                                setPassError('Please enter your password')
                            }
                            else {
                                setPassError('')
                            }
                            setPassword(value)
                        }} />
                    <Text style={styles.error} >{passError}</Text>

                    <MyButton onPress={PressLogin} title={'Login'} moreStyle={globalStyles.authBtnContainer} moreTitleStyle={{ color: 'white' }} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }} >
                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} >
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#3399ff' }} >Forgot password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} >
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#3399ff' }}>Sign up</Text>
                        </TouchableOpacity>

                    </View>
                    <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: '500' }} > Or continue with </Text>
                    <LoginWithButton type={'facebook'} />
                    <LoginWithButton type={'google'} />
                    <LoginWithButton type={'phone'} />
                    {loading &&
                        <LoadingIndicator />
                    }
                    {/* </View> */}
                </FlexCard>
            </ScrollView>

        </SafeAreaView>)
}

styles = StyleSheet.create({
    error: { color: 'orange', marginLeft: 10, fontWeight: '500' },
})

function checkPassword(pass) {
    if (pass.length < 6) {
        return false
    }
    return true
}

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}