import React from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GetIcon, MyButton, MyIconButtonLeft, MyIconButtonRight } from '../../components/button';
import ListRecommendedTutor from '../../components/list/listRecommendedTutor';
import { globalStyles } from '../../styles/globalStyles';
import { useSelector } from 'react-redux';
import { getTotal, getUpcomingSchedule } from '../../services/schedule';
import LoadingIndicator from '../../components/loadingIndicator';

export default function HomeScreen({ navigation }) {
    const [loading, setLoading] = React.useState(true);
    const [total, setTotal] = React.useState(0);
    const [upcomingData, setUpcomingData] = React.useState(null);
    const userInfo = useSelector(state => state.userInfoState);
    const avt = { uri: userInfo.avatar }
    const token = userInfo.tokens.access.token;
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Home',
            headerRight: () =>
            (
                <TouchableOpacity onPress={() => navigation.navigate('UserInfo')} >
                    <Image style={{ width: 35, height: 35, borderRadius: 5, marginRight: 10 }}
                        source={avt}
                    />
                </TouchableOpacity>
            ),
        })

    }, [avt])
    React.useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        setLoading(false);
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
                <Text style={{ ...styles.lessonOverviewContent, fontSize: 15 }}>{getTotalTime(total)}</Text>
                <UpcomingSection data={upcomingData} toStudyRoom={toStudyRoom} />
            </View>
        )
    }
    return (
        <SafeAreaView style={globalStyles.container} >
            {
                loading &&
                <LoadingIndicator />
            }
            <LessonOverview />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5, alignItems: 'center' }} >
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
            <MyButton title={'Enter lesson room'} onPress={toStudyRoom} moreStyle={{ backgroundColor: '#3498db', marginTop: 5, margin: 0 }} moreTitleStyle={{ color: 'white' }} />
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
