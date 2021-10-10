import React from 'react';
import ChatboxScreen from '../../screens/main/message/chatBox';
import TutorScreen from '../../screens/main/tutor/tutors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function TutorStack({ navigation }) {
    return (
        <Stack.Navigator
        // screenOptions={{ headerTitleAlign: 'center' }}
        >
            <Stack.Screen name="Tutor" component={TutorScreen} />
        </Stack.Navigator>
    )
}

export default TutorStack;