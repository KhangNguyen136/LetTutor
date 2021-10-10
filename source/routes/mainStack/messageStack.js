import React from 'react';
import MessagesScreen from '../../screens/main/message/messages';
import ChatboxScreen from '../../screens/main/message/chatBox';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function MessageStack({ navigation }) {
    return (
        <Stack.Navigator
        // screenOptions={{ headerTitleAlign: 'center' }}
        >
            <Stack.Screen name="Message" component={MessagesScreen} />
            <Stack.Screen name="Chatbox" component={ChatboxScreen} />
        </Stack.Navigator>
    )
}

export default MessageStack;