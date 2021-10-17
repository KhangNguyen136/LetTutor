import React from 'react';
import {
    SafeAreaView, Text
} from 'react-native';
import { globalStyles } from '../../../styles/globalStyles';

export default function ReportScreen({ navigation }) {
    return (
        <SafeAreaView style={globalStyles.container} >
            <Text>Report screen</Text>
        </SafeAreaView>
    )
}