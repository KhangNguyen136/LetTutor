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
        setLoading(false);
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

const code = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZXh0Ijp7InVzZXIiOnsiZW1haWwiOiJzdHVkZW50QGxldHR1dG9yLmNvbSIsIm5hbWUiOiJKYWNrIDVNIn19LCJyb29tIjoiZjU2OWMyMDItN2JiZi00NjIwLWFmNzctZWNjMTQxOWE2YjI4LTRkNTRkM2Q3LWQyYTktNDJlNS05N2EyLTVlZDM4YWY1Nzg5YSIsInJvb21OYW1lIjoiZjU2OWMyMDItN2JiZi00NjIwLWFmNzctZWNjMTQxOWE2YjI4LTRkNTRkM2Q3LWQyYTktNDJlNS05N2EyLTVlZDM4YWY1Nzg5YSIsInVzZXJDYWxsIjp7ImlkIjoiZjU2OWMyMDItN2JiZi00NjIwLWFmNzctZWNjMTQxOWE2YjI4IiwiZW1haWwiOiJzdHVkZW50QGxldHR1dG9yLmNvbSIsIm5hbWUiOiJKYWNrIDVNIiwiYXZhdGFyIjoiaHR0cHM6Ly9zYW5kYm94LmFwaS5sZXR0dXRvci5jb20vYXZhdGFyL2Y1NjljMjAyLTdiYmYtNDYyMC1hZjc3LWVjYzE0MTlhNmIyOGF2YXRhcjE2NDI0NzUyNDkzODcuanBnIiwiY291bnRyeSI6IkpQIiwicGhvbmUiOiI4NDI0OTk5OTY1MDgiLCJsYW5ndWFnZSI6IkVuZ2xpc2giLCJiaXJ0aGRheSI6IjIwMDctMDYtMDIiLCJpc0FjdGl2YXRlZCI6dHJ1ZSwicmVxdWlyZU5vdGUiOm51bGwsImxldmVsIjoiVVBQRVJfSU5URVJNRURJQVRFIiwiaXNQaG9uZUFjdGl2YXRlZCI6dHJ1ZSwidGltZXpvbmUiOjd9LCJ1c2VyQmVDYWxsZWQiOnsiaWQiOiI0ZDU0ZDNkNy1kMmE5LTQyZTUtOTdhMi01ZWQzOGFmNTc4OWEiLCJlbWFpbCI6InRlYWNoZXJAbGV0dHV0b3IuY29tIiwibmFtZSI6IktlZWdhbiIsImF2YXRhciI6Imh0dHBzOi8vYXBpLmFwcC5sZXR0dXRvci5jb20vYXZhdGFyLzRkNTRkM2Q3LWQyYTktNDJlNS05N2EyLTVlZDM4YWY1Nzg5YWF2YXRhcjE2Mjc5MTMwMTU4NTAuMDAiLCJjb3VudHJ5IjoiVkUiLCJwaG9uZSI6IjA5MzMyMTA3ODYiLCJsYW5ndWFnZSI6bnVsbCwiYmlydGhkYXkiOiIxOTk5LTEyLTAxIiwiaXNBY3RpdmF0ZWQiOnRydWUsInR1dG9ySW5mbyI6eyJpZCI6IjZjYTVjMDkyLTc2ZWEtNGU3Mi05YzZlLTA1ZTIyMzlhYTMzYiIsInVzZXJJZCI6IjRkNTRkM2Q3LWQyYTktNDJlNS05N2EyLTVlZDM4YWY1Nzg5YSIsInZpZGVvIjoiaHR0cHM6Ly9hcGkuYXBwLmxldHR1dG9yLmNvbS92aWRlby80ZDU0ZDNkNy1kMmE5LTQyZTUtOTdhMi01ZWQzOGFmNTc4OWF2aWRlbzE2Mjc5MTMwMTU4NzEubXA0IiwiYmlvIjoiSSBhbSBwYXNzaW9uYXRlIGFib3V0IHJ1bm5pbmcgYW5kIGZpdG5lc3MsIEkgb2Z0ZW4gY29tcGV0ZSBpbiB0cmFpbC9tb3VudGFpbiBydW5uaW5nIGV2ZW50cyBhbmQgSSBsb3ZlIHB1c2hpbmcgbXlzZWxmLiBJIGFtIHRyYWluaW5nIHRvIG9uZSBkYXkgdGFrZSBwYXJ0IGluIHVsdHJhLWVuZHVyYW5jZSBldmVudHMuIEkgYWxzbyBlbmpveSB3YXRjaGluZyBydWdieSBvbiB0aGUgd2Vla2VuZHMsIHJlYWRpbmcgYW5kIHdhdGNoaW5nIHBvZGNhc3RzIG9uIFlvdXR1YmUuIE15IG1vc3QgbWVtb3JhYmxlIGxpZmUgZXhwZXJpZW5jZSB3b3VsZCBiZSBsaXZpbmcgaW4gYW5kIHRyYXZlbGluZyBhcm91bmQgU291dGhlYXN0IEFzaWEuIiwiZWR1Y2F0aW9uIjoiQkEiLCJleHBlcmllbmNlIjoiSSBoYXZlIG1vcmUgdGhhbiAxMCB5ZWFycyBvZiB0ZWFjaGluZyBlbmdsaXNoIGV4cGVyaWVuY2UiLCJwcm9mZXNzaW9uIjoiRW5nbGlzaCB0ZWFjaGVyIiwiYWNjZW50IjpudWxsLCJ0YXJnZXRTdHVkZW50IjoiSW50ZXJtZWRpYXRlIiwiaW50ZXJlc3RzIjoiIEkgbG92ZWQgdGhlIHdlYXRoZXIsIHRoZSBzY2VuZXJ5IGFuZCB0aGUgbGFpZC1iYWNrIGxpZmVzdHlsZSBvZiB0aGUgbG9jYWxzLiIsImxhbmd1YWdlcyI6ImVuIiwic3BlY2lhbHRpZXMiOiJidXNpbmVzcy1lbmdsaXNoLGNvbnZlcnNhdGlvbmFsLWVuZ2xpc2gsZW5nbGlzaC1mb3Ita2lkcyxpZWx0cyx0b2VpYyIsInJlc3VtZSI6bnVsbCwiaXNBY3RpdmF0ZWQiOnRydWUsImlzTmF0aXZlIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIxLTA4LTAyVDE0OjAzOjM2LjMyMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA5LTA4VDE3OjQ3OjQ4LjkyOVoifSwicmVxdWlyZU5vdGUiOm51bGwsImxldmVsIjoiQURWQU5DRUQiLCJpc1Bob25lQWN0aXZhdGVkIjpudWxsLCJ0aW1lem9uZSI6N30sImlzVHV0b3IiOmZhbHNlLCJzdGFydFRpbWUiOjE2NDI0OTEwMDAwMDAsImVuZFNlc3Npb24iOjE2NDI0OTI1MDAwMDAsInRpbWVJblJvb20iOjE4MDAsImJvb2tpbmdJZCI6IjNlNzdlYjg2LTZhM2ItNGYyMi04NDVmLTU0MDgzMjhmMWQ3MSIsImlhdCI6MTY0MjQ3NzEyNiwiZXhwIjoxNjQyNTA2ODk5LCJhdWQiOiJsaXZldHV0b3IiLCJpc3MiOiJsaXZldHV0b3IiLCJzdWIiOiJodHRwczovL21lZXQudHV0b3JpbmcubGV0c3R1ZHkuaW8ifQ."