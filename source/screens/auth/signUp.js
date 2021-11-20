import React from 'react';
import { View, SafeAreaView, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/core';
import LoadingIndicator from '../../components/loadingIndicator';
import firebaseApp from '../../firebase';
import TextInputCard from '../../components/TextInputCard';
import PasswordTextInput from '../../components/passwordInput';
import { MyButton } from '../../components/button';
import { FlexCard } from '../../components/card';
import { showMessage } from 'react-native-flash-message';


export default function SignUp() {
    const [loading, setLoading] = React.useState(false)
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [displayName, setDisplayName] = React.useState('')

    const [usernameError, setUsernameError] = React.useState('')
    const [passError, setPassError] = React.useState('')
    const [confirmPassError, setConfirmPassError] = React.useState('')
    const [displayNameError, setDisplayNameError] = React.useState('')

    const navigation = useNavigation()
    const SignUpAcc = (email, password) => {
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                setLoading(false);
                showMessage({
                    message: 'Đăng ký thành công',
                    description: 'Tự động đăng nhập sau khi đăng ký',
                    type: 'success'
                });
                // firebaseApp.auth().signOut().then(() => {
                //     // Sign-out successful.
                //     console.log('Logged out after sign up successfully!')
                // }).catch((error) => {
                //     // An error happened.
                //     console.log('Logged out after sign up failed!')
                // });
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                setLoading(false);
                showMessage({
                    message: 'Đăng ký thất bại',
                    description: error.message,
                    type: 'danger'
                })
                // ..
            });
    }
    const pressSignUp = () => {
        console.log('press sign up')
        if (CheckInput(username, password, confirmPassword, displayName) === false) {
            console.log(false)
            return
        }
        setLoading(true)

        SignUpAcc(username, password)
    }
    function CheckInput(email, pass, pass2, name) {
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
        if (name === '') {
            setDisplayNameError('Please enter your name')
            return false
        }
        return true
    }
    return (
        <SafeAreaView style={globalStyles.container}>
            {/* <ScrollView style={{ flex: 1 }} > */}

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
                    {/* <Text style={{ paddingLeft: 10, marginBottom: 5 }}>Must be the same as password.</Text> */}
                    <TextInputCard title={'Name'} placeholder={'Enter your name'} value={displayName}
                        onChangeValue={(value) => {
                            if (value == '') {
                                setDisplayNameError('Please enter your name')
                            }
                            else {
                                setDisplayNameError('')
                            }
                            setDisplayName(value)
                        }} />

                    <Text style={styles.error}>{displayNameError}</Text>
                    <View style={{ height: 10 }} />
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

            {/* </ScrollView> */}
        </SafeAreaView>
    )
}

styles = StyleSheet.create({
    error: { color: 'orange', marginLeft: 10, fontWeight: '500' },
})

// export default function SignUp() {
//     const [loading, setLoading] = React.useState(false)
//     const navigation = useNavigation()
//     const SignUpAcc = (email, password, resetForm) => {
//         firebaseApp.auth().createUserWithEmailAndPassword(email, password)
//             .then((userCredential) => {
//                 // Signed in 
//                 var user = userCredential.user;
//                 setLoading(false);
//                 console.log('Sign up successfully')
//                 showMessage({
//                     message: 'Sign up success',
//                     description: 'Auto log in after sign up.',
//                     type: 'success'
//                 })
//                 resetForm()
//             })
//             .catch((error) => {
//                 var errorCode = error.code;
//                 var errorMessage = error.message;
//                 setLoading(false);
//                 console.log('Signed up failed', errorMessage)
//                 showMessage({
//                     message: 'Registration failed',
//                     description: error.message,
//                     type: 'danger'
//                 })
//                 // ..
//             });
//     }
//     return (
//         <SafeAreaView style={globalStyles.container}>
//             {/* <InputForm /> */}
//             <Formik initialValues={{ email: '', pass: '', pass2: '', displayName: '' }}
//                 onSubmit={(values, { resetForm }) => {
//                     setLoading(true)
//                     if (CheckInput(values.email, values.pass, values.pass2, values.displayName) === false) {
//                         setLoading(false)
//                         return
//                     }
//                     SignUpAcc(values.email, values.pass, resetForm)
//                 }}>
//                 {({ values, handleChange, handleSubmit, handleBlur }) => (
//                     <ScrollView style={{ flex: 1 }} >
//                         <FlexCard >
//                             <View style={{ alignSelf: 'center' }} >
//                                 <Image style={{ borderRadius: 40 }} source={require('../../../assets/logo.png')} />
//                             </View>
//                             <TextInputCard title={'Email or phone number'} placeholder={'Enter email/phone number'} value={values.email} onChangeValue={handleChange('email')} onBlur={handleBlur('email')} />
//                             {/* <View style={{ height: 5 }} /> */}
//                             <PasswordTextInput title={'Password'} placeholder={'Enter password'} value={values.pass} onChangeValue={handleChange('pass')} onBlur={handleBlur('pass')} />
//                             <Text style={{ paddingLeft: 10 }}>Must be contain at least 6 characters.</Text>
//                             {/* <View style={{ height: 5 }} /> */}
//                             <PasswordTextInput title={'Confirm password'} placeholder={'Enter password again'} value={values.pass2} onChangeValue={handleChange('pass2')} onBlur={handleBlur('pass2')} />
//                             <Text style={{ paddingLeft: 10, marginBottom: 0 }}>Must be the same as password.</Text>
//                             {/* <View style={{ height: 5 }} /> */}
//                             <TextInputCard title={'Your name'} placeholder={'Enter name'} value={values.displayName} onChangeValue={handleChange('displayName')} onBlur={handleBlur('displayName')} />
//                             <View style={{ height: 20 }} />
//                             <MyButton onPress={handleSubmit} title={'Sign up'} moreStyle={globalStyles.authBtnContainer} moreTitleStyle={{ color: 'white', fontSize: 18 }} />
//                             <View style={{
//                                 flexDirection: 'row',
//                                 justifyContent: 'center',
//                                 // paddingHorizontal: 10
//                             }} >
//                                 <Text style={{ fontSize: 14 }} >Have had an account already?</Text>
//                                 <TouchableOpacity onPress={() => navigation.navigate('LogIn')} >
//                                     <Text style={{ paddingLeft: 3, fontSize: 14, fontWeight: '500', color: '#3399ff' }}>Sign in</Text>
//                                 </TouchableOpacity>
//                             </View>
//                             {loading &&
//                                 <LoadingIndicator />
//                             }
//                         </FlexCard>
//                     </ScrollView>
//                 )}
//             </Formik>
//         </SafeAreaView>
//     )
// }

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