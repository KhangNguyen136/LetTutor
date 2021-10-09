import React from 'react';
import Login from '../screens/auth/login';
import SignUp from '../screens/auth/signUp';
import ForgotPassword from '../screens/auth/forgotPassword';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function AuthStack({ navigation }) {
    return (
        // <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerTitleAlign: 'center' }}>
            <Stack.Screen name="LogIn" component={Login} options={{ title: 'Login' }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign up' }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'Forgot password' }} />
        </Stack.Navigator>
        // </NavigationContainer>
    )
}

export default AuthStack;