import React from 'react';
import BottomTab from './bottomTab';
import ChatboxScreen from '../screens/main/message/chatBox';
import WatchVideo from '../screens/main/watchVideo';
import History from '../screens/main/history';
import ViewFeedback from '../screens/main/other/viewFeedbacks';
import UserInfo from '../screens/main/other/userInfo';
import ChangePassword from '../screens/auth/changePassword';
import AdvancedSetting from '../screens/main/other/advancedSetting';
import TutorInfo from '../screens/main/tutor/tutorInfo';
import StudyRoom from '../screens/main/studyRoom';
import ReportScreen from '../screens/main/tutor/report';
import Reviews from '../screens/main/tutor/reviews';
import BecomeTutor1 from '../screens/main/becomeTutor/step1';
import BecomeTutor2 from '../screens/main/becomeTutor/step2';
import BecomeTutor3 from '../screens/main/becomeTutor/step3';
import Ebook from '../screens/main/other/ebook';
import Message from '../screens/main/message/messages';
import EbookDetail from '../screens/main/other/bookDetail';
import CourseDetail from '../screens/main/course/couseDetail';
import DiscoverCourse from '../screens/main/course/discoverCourse';
import GiveFeedback from '../screens/main/giveFeedback';
import Booking from '../screens/main/booking';
import BuyLesson from '../screens/main/buyLesson';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditRequest from '../screens/main/editRequest';

const Stack = createNativeStackNavigator();

function MainStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="BottomTab"
            screenOptions={{ headerTitleAlign: 'center' }}>
            <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
            <Stack.Screen name="ChatBox" component={ChatboxScreen} />
            <Stack.Screen name="WatchVideo" component={WatchVideo} options={{ title: 'Lesson video' }} />
            <Stack.Screen name="History" component={History} options={{ title: 'Booking history' }} />
            <Stack.Screen name="ViewFeedback" component={ViewFeedback} options={{ title: 'Feedback' }} />
            <Stack.Screen name="UserInfo" component={UserInfo} options={{ title: 'Profile' }} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ title: 'Change Password' }} />
            <Stack.Screen name="AdvancedSetting" component={AdvancedSetting} options={{ title: 'Setting' }} />
            <Stack.Screen name="StudyRoom" component={StudyRoom} options={{ title: 'Meeting room' }} />
            <Stack.Screen name="TutorInfo" component={TutorInfo} />
            <Stack.Screen name="Report" component={ReportScreen} />
            <Stack.Screen name="Reviews" component={Reviews} />
            <Stack.Screen name="BecomeTutor1" component={BecomeTutor1} options={{ title: 'Complete profile' }} />
            <Stack.Screen name="BecomeTutor2" component={BecomeTutor2} options={{ title: 'Introduction' }} />
            <Stack.Screen name="BecomeTutor3" component={BecomeTutor3} options={{ title: 'Approval' }} />
            <Stack.Screen name="Ebook" component={Ebook} options={{ title: 'Ebooks' }} />
            <Stack.Screen name="EbookDetail" component={EbookDetail} options={{ title: '' }} />
            <Stack.Screen name="Message" component={Message} options={{ title: 'Messages' }} />
            <Stack.Screen name="CourseDetail" component={CourseDetail} options={{ title: '' }} />
            <Stack.Screen name="DiscoverCourse" component={DiscoverCourse} options={{ title: 'Discover' }} />
            <Stack.Screen name="GiveFeedback" component={GiveFeedback} options={{ title: 'Feedback' }} />
            <Stack.Screen name="Booking" component={Booking} options={{ title: 'Booking' }} />
            <Stack.Screen name="EditRequest" component={EditRequest} options={{ title: 'Edit request' }} />

            <Stack.Screen name="BuyLesson" component={BuyLesson} options={{ title: '' }} />


        </Stack.Navigator>
    )
}

export default MainStack;