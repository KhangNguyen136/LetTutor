import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/main/home';
// import Message from '../screens/main/message/messages';
import Course from '../screens/main/course/course';
import Schedule from '../screens/main/schedule';
import Tutors from '../screens/main/tutor/tutors';
import Other from '../screens/main/other/other';
import { GetIcon } from '../components/button';
const Tab = createBottomTabNavigator();

function BottomTab({ navigation }) {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={
            ({ route }) => ({
                headerTitleAlign: 'center',
                // headerTintColor: '#6c5ce7',
                // headerPressColor: '#6c5ce7',
                tabBarIcon: ({ focused, color, size }) => {
                    return (<TabBarIcon focused={focused} routeName={route.name} color={'#6c5ce7'} size={size} />)
                },
            })
        }>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Course" component={Course} options={{ title: 'Course' }} />
            <Tab.Screen name="Schedule" component={Schedule} options={{ title: 'Schedule' }} />
            <Tab.Screen name="Tutors" component={Tutors} options={{ title: 'Tutors' }} />
            <Tab.Screen name="Other" component={Other} options={{ title: 'Other' }} />
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
        case 'Course':
            iconName = focused ? 'bookmark' : 'bookmark-o';
            iconSource = 'FontAwesome'
            break;
        case 'Schedule':
            iconName = focused ? 'ios-calendar-sharp' : 'calendar-outline';
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