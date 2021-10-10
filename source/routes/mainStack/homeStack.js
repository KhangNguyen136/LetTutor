import React from 'react';
import HomeScreen from '../../screens/main/home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="Home"
        // screenOptions={{ headerTitleAlign: 'center' }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    )
}

export default HomeStack;