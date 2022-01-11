import React from 'react';
import { Text, SafeAreaView, View } from 'react-native';
// import { SearchBar } from 'react-native-elements';
import ListEbook from '../../../components/list/listEbook';
import { globalStyles } from '../../../styles/globalStyles';

export default function Ebooks() {
    return (
        <SafeAreaView style={globalStyles.container} >

            <ListEbook />
        </SafeAreaView >
    )
}

const specialies =
    ['English for kid', 'English for business', 'Conversational', 'STARTER', 'MOVERS', 'FLYERS', 'KET', 'PET', 'IELTS', 'TOEFL', 'TOEIC']
export const levels = ['Beginner', 'Intermediate', 'Advanced']
export const sortBy = ['Level decreasing', 'Level ascending']