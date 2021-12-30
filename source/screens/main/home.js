import React from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GetIcon, MyButton, MyIconButtonLeft, MyIconButtonRight } from '../../components/button';
import ListRecommendedTutor from '../../components/list/listRecommendedTutor';
import { globalStyles } from '../../styles/globalStyles';
import axios from 'axios';
import { serverUrl } from '../../const';
import { useSelector } from 'react-redux';

export default function HomeScreen({ navigation }) {
    const date = new Date();
    const userInfo = useSelector(state => state.userInfoState)
    console.log(userInfo)
    React.useLayoutEffect(() => {
        console.log('Set options')
        navigation.setOptions({
            title: 'Home',
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('UserInfo')} >
                    <Image style={{ width: 35, height: 35, borderRadius: 5, marginRight: 10 }}
                        source={{ uri: userInfo.avatar }}
                    />
                </TouchableOpacity>
            ),
        })
    }, [])
    React.useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const token = userInfo.tokens.access.token;
            const res = await axios.get(serverUrl + 'tutor/more', {
                params: {
                    perPage: 9,
                    page: 1
                },
                headers: { 'Authorization': 'Bearer ' + token }
            });
            console.log(res.data);
        } catch (error) {
            console.log(error)
        }
    }
    const toStudyRoom = () => {
        navigation.navigate('StudyRoom')
    }
    const LessonOverview = () => {
        return (
            <View style={styles.lessonOverview} >
                <Text style={{ ...styles.lessonOverviewContent, fontSize: 16 }}>Total lesson time is 13 hours 6 minutes</Text>
                <Text style={styles.lessonOverviewContent} >Upcoming Lesson:</Text>
                <Text style={styles.lessonOverviewContent}>{date.toString().substr(0, 24)}</Text>
                <MyButton title={'Enter lesson room'} onPress={toStudyRoom} moreStyle={{ backgroundColor: '#3498db' }} moreTitleStyle={{ color: 'white' }} />
            </View>
        )
    }
    return (
        <SafeAreaView style={globalStyles.container} >
            <LessonOverview />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, alignItems: 'center' }} >
                <View style={{ padding: 0.5, borderBottomColor: 'black', borderBottomWidth: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600' }} >Recommended tutors: </Text>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate("Tutors")} >
                    <Text style={{ color: '#3498db', fontWeight: '600' }} >See all</Text>
                    <GetIcon iconName={'right'} source={'AntDesign'} size={14} color={'#3498db'} />
                </TouchableOpacity>
            </View>
            <ListRecommendedTutor />
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