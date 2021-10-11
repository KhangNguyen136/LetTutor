import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './mainStack/homeStack';
import UpcomingStack from './mainStack/upcomingStack';
import TutorStack from './mainStack/tutorStack';
import MessageStack from './mainStack/messageStack';
import SettingStack from './mainStack/settingStack';
import { GetIcon } from '../components/button';
const Tab = createBottomTabNavigator();

function MainBottomRoute({ navigation }) {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={
            ({ route }) => ({
                headerTitleAlign: 'center',

                tabBarIcon: ({ focused, color, size }) => {
                    return (<TabBarIcon focused={focused} routeName={route.name} color={color} size={size} />)
                },
                headerShown: false
            })

        }>
            <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: 'Home' }} />
            <Tab.Screen name="MessageStack" component={MessageStack} options={{ title: 'Message' }} />
            <Tab.Screen name="UpcomingStack" component={UpcomingStack} options={{ title: 'Upcoming' }} />
            <Tab.Screen name="TutorStack" component={TutorStack} options={{ title: 'Tutors' }} />
            <Tab.Screen name="SettingStack" component={SettingStack} options={{ title: 'Other' }} />
        </Tab.Navigator >
    );
}

function TabBarIcon({ focused, routeName, color, size }) {
    let iconName;
    let iconSource;
    switch (routeName) {
        case 'HomeStack':
            iconName = focused ? 'home' : 'home-outline';
            break;
        case 'MessageStack':
            iconName = focused ? 'chatbubbles-sharp' : 'chatbubbles-outline';
            iconSource = 'Ionicons'
            break;
        case 'UpcomingStack':
            iconName = focused ? 'md-time' : 'md-time-outline';
            iconSource = 'Ionicons'
            break;
        case 'TutorStack':
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

export default MainBottomRoute;