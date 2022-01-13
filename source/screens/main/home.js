import React from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GetIcon, MyButton, MyIconButtonLeft, MyIconButtonRight } from '../../components/button';
import ListRecommendedTutor from '../../components/list/listRecommendedTutor';
import { globalStyles } from '../../styles/globalStyles';
import { useSelector } from 'react-redux';
import { getNext, getTotal, getUpcomingSchedule } from '../../services/schedule';

export default function HomeScreen({ navigation }) {
    const [total, setTotal] = React.useState(0);
    const [upcomingData, setUpcomingData] = React.useState(null);
    const userInfo = useSelector(state => state.userInfoState);
    const token = userInfo.tokens.access.token;
    React.useLayoutEffect(() => {
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
        const totalRes = await getTotal(token);
        setTotal(totalRes * 25);
        const upcomingRes = await getUpcomingSchedule(token);
        setUpcomingData(upcomingRes.rows[0]);
    }
    const toStudyRoom = () => {
        navigation.navigate('StudyRoom', { data: upcomingData })
    }
    const LessonOverview = () => {
        return (
            <View style={styles.lessonOverview} >
                <Text style={{ ...styles.lessonOverviewContent, fontSize: 16 }}>{getTotalTime(total)}</Text>
                <UpcomingSection data={upcomingData} toStudyRoom={toStudyRoom} />
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

function getTotalTime(total) {
    if (total == 0) {
        return 'Welcome to Letutor!'
    }
    const hours = parseInt(total / 60);
    const hourTitle = hours > 1 ? 'hours' : 'hour';
    const minutes = total % 60;
    const minuteTitle = minutes > 1 ? 'minutes' : 'minute';
    return `Total lesson time is ${hours} ${hourTitle} ${minutes} ${minuteTitle}`
}

function UpcomingSection({ data, toStudyRoom }) {
    if (data == null) {
        return (
            <View style={{ alignItems: 'center' }} >
                <Text style={styles.lessonOverviewContent} >You have no upcoming lesson</Text>
                <Text style={styles.lessonOverviewContent}>Let choose a tutor and book</Text>
                {/* <MyButton title={'Enter lesson room'} onPress={toStudyRoom} moreStyle={{ backgroundColor: '#3498db' }} moreTitleStyle={{ color: 'white' }} /> */}
            </View>
        )
    }
    const detail = data.scheduleDetailInfo;
    const startTime = new Date(detail.startPeriodTimestamp);
    const endTime = new Date(detail.endPeriodTimestamp);
    return (
        <View style={{ alignItems: 'center' }} >
            <Text style={styles.lessonOverviewContent} >Upcoming lesson:</Text>
            <Text style={styles.lessonOverviewContent}>{startTime.toString().substring(0, 21)} - {endTime.toString().substring(16, 21)}</Text>
            <MyButton title={'Enter lesson room'} onPress={toStudyRoom} moreStyle={{ backgroundColor: '#3498db' }} moreTitleStyle={{ color: 'white' }} />
        </View>
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