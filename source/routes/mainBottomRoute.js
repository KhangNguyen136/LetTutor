import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/main/home';
import StudyRoomScreen from '../screens/main/studyRoom';
import AccountInfoScreen from '../screens/main/accountInfo';
import HistoryScreen from '../screens/main/feedback';
import MessagesScreen from '../screens/main/messages';
const Tab = createBottomTabNavigator();

function MainBottomRoute({ navigation }) {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{
            headerTitleAlign: 'center'
        }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Message" component={MessagesScreen} />
            <Tab.Screen name="Study" component={StudyRoomScreen} />
            <Tab.Screen name="History" component={HistoryScreen} />
            <Tab.Screen name="AccountInfo" component={AccountInfoScreen} options={{ title: 'User information' }} />
        </Tab.Navigator>
    );
}

export default MainBottomRoute;