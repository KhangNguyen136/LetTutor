import React from 'react';
import { SafeAreaView } from 'react-native';
import ListCourse from '../../../components/list/listCourse';
import { globalStyles } from '../../../styles/globalStyles';

export default function Course() {

    return (
        <SafeAreaView style={globalStyles.container} >
            <ListCourse />
        </SafeAreaView>
    )
}
