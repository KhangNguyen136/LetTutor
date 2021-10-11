import React from 'react';
import UpcomingScreen from '../../screens/main/upcomingScreen';
import StudyRoom from '../../screens/main/studyRoom';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function UpcomingStack({ navigation }) {
    return (
        <Stack.Navigator
        // screenOptions={{ headerTitleAlign: 'center' }}
        >
            <Stack.Screen name="Upcoming" component={UpcomingScreen} />
            <Stack.Screen name="StudyRoom" component={StudyRoom} options={{ tabBarVisible: false }} />

        </Stack.Navigator>
    )
}

export default UpcomingStack;