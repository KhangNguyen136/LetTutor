import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import TextInputCard from '../../components/TextInputCard'
import PasswordTextInput from '../../components/passwordInput';
import { MyButton } from '../../components/button';
import LoadingIndicator from '../../components/loadingIndicator';
import { FlexCard } from '../../components/card';
import { showMessage } from 'react-native-flash-message';
import LoginWithButton from '../../components/loginWithButton';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { serverUrl } from '../../const';
import { loggedIn } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import { saveUserInfoToDB } from '../../bussiness/UserInfoServices';
import { validateEmail, checkPassword } from '../../bussiness/validInput';
import { setUserInfoAction, setTokens } from '../../redux/userInfoSlice';

export default function Login(props) {
    const [loading, setLoading] = React.useState(false)
    const [username, setUsername] = React.useState('nguyentankhang136@gmail.com')
    const [password, setPassword] = React.useState('123456')
    const [usernameError, setUsernameError] = React.useState('')
    const [passError, setPassError] = React.useState('')
    const { navigation } = props;
    const dispatch = useDispatch();
    const SaveUseInfo = async (data) => {
        try {
            saveUserInfoToDB(data);
            dispatch(setUserInfoAction(data.user));
            dispatch(setTokens(data.tokens))
            dispatch(loggedIn());
            showMessage({
                type: 'success', message: 'Login successful'
            })
        } catch (error) {
            console.log(error)
            showMessage({ type: 'error', message: 'Login failed', description: error })
        }
    }

    const LoginAcc = async (email, password) => {
        setLoading(true);
        try {
            const res = await axios.post(`${serverUrl}auth/login`, {
                email, password
            });
            console.log(res.data)
            SaveUseInfo(res.data)

        } catch (error) {
            console.log(error)
            showMessage({ type: 'warning', message: 'Login failed', description: 'Incorrect email or password' })
        }
        setLoading(false);
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
        if (CheckInput(username, password) === false) {
            console.log('false')
            return
        }
        // setLoading(true)
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
