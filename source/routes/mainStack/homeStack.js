import React from 'react';
import HomeScreen from '../../screens/main/home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Touchable, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

function HomeStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="Home"
            screenOptions={{
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('SettingStack', { screen: 'UserInfo' })} >
                        <Image style={{ width: 33, height: 33, borderRadius: 5 }}
                            source={require('../../../assets/botAvt.jpg')}

                        />
                    </TouchableOpacity>
                )
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    )
}

export default HomeStack;