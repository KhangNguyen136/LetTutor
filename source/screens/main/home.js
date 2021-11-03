import { StackActions } from '@react-navigation/routers';
import React from 'react';
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GetIcon, MyButton, MyIconButtonLeft, MyIconButtonRight } from '../../components/button';
import ListTutor from '../../components/list/listTutor';
import { globalStyles } from '../../styles/globalStyles';

export default function HomeScreen({ navigation }) {
    const date = new Date()
    React.useEffect(() => {
    }, [])
    const toStudyRoom = () => {
        navigation.navigate('StudyRoom')
    }
    const LessonOverview = () => {
        return (
            <View style={styles.lessonOverview} >
                <Text style={{ ...styles.lessonOverviewContent, fontSize: 16 }}>Total lesson time is 13 hours 6 minutes</Text>
                <Text style={styles.lessonOverviewContent} >Upcoming Lesson:</Text>
                <Text style={styles.lessonOverviewContent}>{date.toString().substr(0, 24)}</Text>
                <MyButton title={'Enter lesson room'} onPress={toStudyRoom} moreStyle={{ backgroundColor: '#74b9ff' }} />
            </View>
        )
    }
    return (
        <SafeAreaView style={globalStyles.container} >
            <LessonOverview />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, alignItems: 'center' }} >
                <Text style={{ fontSize: 16, fontWeight: '600', textDecorationLine: 'underline' }} >Recommended tutors: </Text>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate("Tutors")} >
                    <Text style={{ color: '#3498db', fontWeight: '600' }} >See all</Text>
                    <GetIcon iconName={'right'} source={'AntDesign'} size={14} color={'#3498db'} />
                </TouchableOpacity>
            </View>
            <ListTutor />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    lessonOverview: {
        alignItems: 'center', backgroundColor: '#55efc4', padding: 10,
    },
    lessonOverviewContent: {
        fontWeight: '600',
        margin: 3
    }
})