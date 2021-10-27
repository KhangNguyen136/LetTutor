import React from 'react';
import { View, SafeAreaView, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/core';
import LoadingIndicator from '../../components/loadingIndicator';
import firebaseApp from '../../firebase';
import TextInputCard from '../../components/TextInputCard';
import PasswordTextInput from '../../components/passwordInput';
import { MyButton } from '../../components/button';
import { Formik } from 'formik';
import { FlexCard } from '../../components/card';
import { showMessage } from 'react-native-flash-message';

export default function SignUp() {
    const [loading, setLoading] = React.useState(false)
    const navigation = useNavigation()
    const SignUpAcc = (email, password, resetForm) => {
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                setLoading(false);
                console.log('Sign up successfully')
                showMessage({
                    message: 'Sign up success',
                    description: 'Auto log in after sign up.',
                    type: 'success'
                })
                resetForm()
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                setLoading(false);
                console.log('Signed up failed', errorMessage)
                showMessage({
                    message: 'Registration failed',
                    description: error.message,
                    type: 'danger'
                })
                // ..
            });
    }
    return (
        <SafeAreaView style={globalStyles.container}>
            {/* <InputForm /> */}
            <Formik initialValues={{ email: '', pass: '', pass2: '', displayName: '' }}
                onSubmit={(values, { resetForm }) => {
                    setLoading(true)
                    if (CheckInput(values.email, values.pass, values.pass2, values.displayName) === false) {
                        setLoading(false)
                        return
                    }
                    SignUpAcc(values.email, values.pass, resetForm)
                }}>
                {({ values, handleChange, handleSubmit, handleBlur }) => (
                    <ScrollView style={{ flex: 1 }} >
                        <FlexCard >
                            <View style={{ alignSelf: 'center' }} >
                                <Image style={{ borderRadius: 40 }} source={require('../../../assets/logo.png')} />
                            </View>
                            <TextInputCard title={'Email or phone number'} placeholder={'Enter email/phone number'} value={values.email} onChangeValue={handleChange('email')} onBlur={handleBlur('email')} />
                            {/* <View style={{ height: 5 }} /> */}
                            <PasswordTextInput title={'Password'} placeholder={'Enter password'} value={values.pass} onChangeValue={handleChange('pass')} onBlur={handleBlur('pass')} />
                            <Text style={{ paddingLeft: 10 }}>Must be contain at least 6 characters.</Text>
                            {/* <View style={{ height: 5 }} /> */}
                            <PasswordTextInput title={'Confirm password'} placeholder={'Enter password again'} value={values.pass2} onChangeValue={handleChange('pass2')} onBlur={handleBlur('pass2')} />
                            <Text style={{ paddingLeft: 10, marginBottom: 0 }}>Must be the same as password.</Text>
                            {/* <View style={{ height: 5 }} /> */}
                            <TextInputCard title={'Your name'} placeholder={'Enter name'} value={values.displayName} onChangeValue={handleChange('displayName')} onBlur={handleBlur('displayName')} />
                            <View style={{ height: 20 }} />
                            <MyButton onPress={handleSubmit} title={'Sign up'} moreStyle={globalStyles.authBtnContainer} moreTitleStyle={{ color: 'white', fontSize: 18 }} />
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                // paddingHorizontal: 10
                            }} >
                                <Text style={{ fontSize: 14 }} >Have had an account already?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('LogIn')} >
                                    <Text style={{ paddingLeft: 3, fontSize: 14, fontWeight: '500', color: '#3399ff' }}>Sign in</Text>
                                </TouchableOpacity>
                            </View>
                            {loading &&
                                <LoadingIndicator />
                            }
                        </FlexCard>
                    </ScrollView>
                )}
            </Formik>
        </SafeAreaView>
    )
}

function CheckInput(email, pass, pass2, name) {
    if (validateEmail(email) === false) {
        showMessage({
            message: "Invalid email",
            description: 'Check your email and try again!',
            type: 'warning'
        })
        return false
    }
    if (checkPassword(pass) === false) {
        showMessage({
            message: "Invalid password",
            description: 'Password must contain more than 5 characters!',
            type: 'warning'
        })
        return false
    }
    if (pass !== pass2) {
        showMessage({
            message: 'Confirm password failed',
            description: 'Password and confirm password are not the same!',
            type: 'warning'
        })
        return false
    }
    if (name === '') {
        showMessage({
            message: 'Please enter display name!',
            description: 'We will use it to display your name in app',
            type: 'warning'
        })
        return false
    }
    return true
}

function checkPassword(pass) {
    if (pass.length < 6) {
        return false
    }
    return true
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}