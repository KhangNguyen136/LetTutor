import React from 'react';
import TutorInfo from '../../screens/main/tutor/tutorInfo';
import TutorScreen from '../../screens/main/tutor/tutors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function TutorStack({ navigation }) {
    return (
        <Stack.Navigator
        // screenOptions={{ headerTitleAlign: 'center' }}
        >
            <Stack.Screen name="Tutor" component={TutorScreen} />
            <Stack.Screen name="TutorInfo" component={TutorInfo} />
        </Stack.Navigator>
    )
}

export default TutorStack;