import React from 'react';
import SettingScreen from '../../screens/main/setting/settings';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function SettingStack({ navigation }) {
    return (
        <Stack.Navigator
        // screenOptions={{ headerTitleAlign: 'center' }}
        >
            <Stack.Screen name="Setting" component={SettingScreen} />
        </Stack.Navigator>
    )
}

export default SettingStack;