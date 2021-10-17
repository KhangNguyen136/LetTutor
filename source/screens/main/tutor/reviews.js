import React from 'react';
import {
    SafeAreaView, Text
} from 'react-native';
import { globalStyles } from '../../../styles/globalStyles';

export default function Reviews({ navigation }) {
    return (
        <SafeAreaView style={globalStyles.container} >
            <Text>Reviews screen</Text>
        </SafeAreaView>
    )
}