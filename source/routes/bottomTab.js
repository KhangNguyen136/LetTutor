import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/main/home';
import Message from '../screens/main/message/messages';
import Upcoming from '../screens/main/upcomingScreen';
import Tutors from '../screens/main/tutor/tutors';
import SettingScreen from '../screens/main/setting/settings';
import { GetIcon } from '../components/button';
const Tab = createBottomTabNavigator();

function BottomTab({ navigation }) {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={
            ({ route }) => ({
                headerTitleAlign: 'center',

                tabBarIcon: ({ focused, color, size }) => {
                    return (<TabBarIcon focused={focused} routeName={route.name} color={color} size={size} />)
                },
                // headerShown: false
            })

        }>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                title: 'Home',
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('UserInfo')} >
                        <Image style={{ width: 35, height: 35, borderRadius: 5, marginRight: 10 }}
                            source={require('../../assets/botAvt.jpg')}
                        />
                    </TouchableOpacity>
                )
            }} />
            <Tab.Screen name="Message" component={Message} options={{ title: 'Message' }} />
            <Tab.Screen name="Upcoming" component={Upcoming} options={{ title: 'Upcoming' }} />
            <Tab.Screen name="Tutors" component={Tutors} options={{ title: 'Tutors' }} />
            <Tab.Screen name="Setting" component={SettingScreen} options={{ title: 'Other' }} />
        </Tab.Navigator >
    );
}

function TabBarIcon({ focused, routeName, color, size }) {
    let iconName;
    let iconSource;
    switch (routeName) {
        case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            break;
        case 'Message':
            iconName = focused ? 'chatbubbles-sharp' : 'chatbubbles-outline';
            iconSource = 'Ionicons'
            break;
        case 'Upcoming':
            iconName = focused ? 'md-time' : 'md-time-outline';
            iconSource = 'Ionicons'
            break;
        case 'Tutors':
            iconName = focused ? 'md-people-sharp' : 'md-people-outline';
            iconSource = 'Ionicons'
            break;
        default:
            if (focused) {
                iconName = 'settings'
                iconSource = 'Ionicons'
            }
            else {
                iconName = 'setting'
                iconSource = 'AntDesign'
            }
    }
    return (
        <GetIcon iconName={iconName} size={size} color={color} source={iconSource} />
    )
}

export default BottomTab;