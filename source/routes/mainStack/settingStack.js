import React from 'react';
import SettingScreen from '../../screens/main/setting/settings';
import AdvancedSetting from '../../screens/main/setting/advancedSetting';
import ViewFeedbacks from '../../screens/main/setting/viewFeedbacks'
import UserInfo from '../../screens/main/setting/userInfo';
import BookingHistory from '../../screens/main/bookingHistory';
import SessionHistory from '../../screens/main/sessionHistory';
import ChangePassword from '../../screens/auth/changePassword';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, Touchable } from 'react-native';

const Stack = createNativeStackNavigator();

function SettingStack({ navigation }) {
    return (
        <Stack.Navigator
        // screenOptions={{ headerTitleAlign: 'center' }}
        >
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen name="UserInfo" component={UserInfo}
                options={{
                    headerRight: () =>
                        <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')} >
                            <Text style={{ color: '#3399ff' }} >Change password</Text>
                        </TouchableOpacity>
                }} />
            <Stack.Screen name="ViewFeedbacks" component={ViewFeedbacks} />
            <Stack.Screen name="BookingHistory" component={BookingHistory} />
            <Stack.Screen name="SessionHistory" component={SessionHistory} />
            <Stack.Screen name="AdvancedSetting" component={AdvancedSetting} />
            <Stack.Screen name="ChangePassword" component={ChangePassword}
            />
        </Stack.Navigator>
    )
}

export default SettingStack;