import React from 'react';
import BottomTab from './bottomTab';
import ChatboxScreen from '../screens/main/message/chatBox';
import SessionHistory from '../screens/main/sessionHistory';
import BookingHistory from '../screens/main/bookingHistory';
import ViewFeedback from '../screens/main/setting/viewFeedbacks';
import UserInfo from '../screens/main/setting/userInfo';
import ChangePassword from '../screens/auth/changePassword';
import AdvancedSetting from '../screens/main/setting/advancedSetting';
import TutorInfo from '../screens/main/tutor/tutorInfo';
import StudyRoom from '../screens/main/studyRoom';
import ReportScreen from '../screens/main/tutor/report';
import Reviews from '../screens/main/tutor/reviews';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function MainStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="BottomTab"
            screenOptions={{ headerTitleAlign: 'center' }}>
            <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
            <Stack.Screen name="ChatBox" component={ChatboxScreen} />
            <Stack.Screen name="SessionHistory" component={SessionHistory} options={{ title: 'Session history' }} />
            <Stack.Screen name="BookingHistory" component={BookingHistory} options={{ title: 'Booking history' }} />
            <Stack.Screen name="ViewFeedback" component={ViewFeedback} options={{ title: 'Feedback' }} />
            <Stack.Screen name="UserInfo" component={UserInfo} options={{ title: 'Profile' }} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ title: 'Change Password' }} />
            <Stack.Screen name="AdvancedSetting" component={AdvancedSetting} options={{ title: 'Setting' }} />
            <Stack.Screen name="StudyRoom" component={StudyRoom} options={{ title: 'Meeting room' }} />
            <Stack.Screen name="TutorInfo" component={TutorInfo} />
            <Stack.Screen name="Report" component={ReportScreen} />
            <Stack.Screen name="Reviews" component={Reviews} />


        </Stack.Navigator>
    )
}

export default MainStack;