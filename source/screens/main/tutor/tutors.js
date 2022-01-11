import React from 'react';
import { SafeAreaView } from 'react-native';
import ListTutor from '../../../components/list/listTutor';
import { globalStyles } from '../../../styles/globalStyles';


export default function TutorScreen() {
    return (
        <SafeAreaView style={globalStyles.container} >
            <ListTutor />
        </SafeAreaView>
    )
}
