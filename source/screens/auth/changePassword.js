import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import PasswordTextInput from '../../components/passwordInput';
import { GetIcon, MyButton } from '../../components/button';
import { globalStyles } from '../../styles/globalStyles';
import Card, { FlexCard } from '../../components/card';
import { serverUrl } from '../../const';
import errorHandle from '../../bussiness/errorHanle';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LoadingIndicator from '../../components/loadingIndicator';
import { showMessage } from 'react-native-flash-message';

export default function ChangePassword({ navigation }) {
    const [loading, setLoading] = React.useState(false)
    const [password, setPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [newPasswordError, setNewPasswordError] = React.useState('');

    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [confirmPasswordError, setConfirmPasswordError] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const userInfo = useSelector(state => state.userInfoState);

    const checkInput = () => {
        if (passwordError != '' || newPasswordError != '' || confirmPasswordError != '')
            return false
        if (password.length < 6) {
            setPasswordError('Must contain at least 6 characters');
            return false;
        }
        if (newPassword.length < 6) {
            setNewPasswordError('Must contain at least 6 characters');
            return false;
        }
        if (confirmPassword != newPassword) {
            setConfirmPasswordError('Not same as new password');
            return false;
        }
        return true;
    }
    const ok = async () => {
        if (!checkInput())
            return
        try {
            setLoading(true)
            await axios.post(serverUrl + 'auth/change-password', {
                password, newPassword
            },
                { headers: { 'Authorization': 'Bearer ' + userInfo.tokens.access.token } });
            setSuccess(true);
        } catch (error) {
            errorHandle(error);
        }
        setLoading(false);
    }
    return (
        <SafeAreaView style={globalStyles.container} >
            {success ?
                <FlexCard >
                    <View style={{ flex: 1, alignItems: 'center' }} >
                        <Image style={{ resizeMode: 'contain' }}
                            source={require('../../../assets/changePassSuccess.png')} />
                        <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 10 }}>Change password successfully</Text>
                        <MyButton title={'Done'} moreStyle={{ width: '50%' }} onPress={() => navigation.goBack()} />
                    </View>
                </FlexCard>
                :
                <Card>
                    {/* <Text style={styles.Title} >Change password</Text> */}
                    <View style={{ alignItems: 'center', margin: 10, marginBottom: 20 }} >
                        <GetIcon iconName={'key-change'} source={'MaterialCommunityIcons'} size={80} />
                    </View>
                    <PasswordTextInput title={'Current password'} placeholder={'Enter your current password'} value={password}
                        onChangeValue={(value) => {
                            if (value == '') {
                                setPasswordError('Please enter your password')
                            }
                            else {
                                setPasswordError('')
                            }
                            setPassword(value)
                        }} />
                    <Text style={globalStyles.error}>{passwordError}</Text>

                    <PasswordTextInput title={'New password'} placeholder={'Contain at least 6 characters'} value={newPassword}
                        onChangeValue={(value) => {
                            if (value == '') {
                                setNewPasswordError('Please enter your new password')
                            }
                            else {
                                setNewPasswordError('')
                            }
                            setNewPassword(value)
                        }} />
                    <Text style={globalStyles.error}>{newPasswordError}</Text>

                    <PasswordTextInput title={'Confirm new password'} placeholder={'Enter new password again'} value={confirmPassword}
                        onChangeValue={(value) => {
                            if (value == '') {
                                setConfirmPasswordError('Confirm password')
                            }
                            else {
                                setConfirmPasswordError('')
                            }
                            setConfirmPassword(value)
                        }} />
                    <Text style={globalStyles.error}>{confirmPasswordError}</Text>


                    <MyButton title={'Send'} moreStyle={globalStyles.authBtnContainer} moreTitleStyle={{ color: 'white' }} onPress={ok} />

                </Card>
            }
            {loading && <LoadingIndicator />}
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