import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import ListUpcoming from '../../components/list/listUpcoming';
import { globalStyles } from '../../styles/globalStyles';

export default function UpcomingScreen() {
    return (
        <SafeAreaView style={globalStyles.container} >
            <ListUpcoming />
        </SafeAreaView>
    )
}