import React from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import { MyButton } from '../../components/button';
import ListTutor from '../../components/list/listTutor';

export default function HomeScreen() {
    const date = new Date()
    const LessonOverview = () => {
        return (
            <View style={{ alignItems: 'center', backgroundColor: 'pink', padding: 10 }} >
                <Text>Total lesson time is 13 hours 6 minutes</Text>
                <Text>Upcoming Lesson:</Text>
                <Text>{date.toString().substr(0, 24)}</Text>
                <MyButton title={'Enter lesson room'} />
            </View>
        )
    }
    return (
        <SafeAreaView>
            <LessonOverview />
            <ListTutor />
        </SafeAreaView>
    )
}