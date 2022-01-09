import React from 'react';
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';
import Card from '../../components/card';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet'
import { useSelector } from 'react-redux';

const testURL = 'https://meet.jit.si/GoldenCollegesLobbyOnline';

export default function StudyRoom({ navigation, route }) {
    const { data } = route.params;
    const userInfo = useSelector(state => state.userInfoState);
    const scheduleDetailInfo = data.scheduleDetailInfo;
    const startTime = new Date(scheduleDetailInfo.startPeriodTimestamp);
    const endTime = new Date(scheduleDetailInfo.endPeriodTimestamp);
    // const today = new Date();
    const waitTime = startTime.valueOf() - Date.now();
    const [timerCount, setTimer] = React.useState(parseInt(waitTime / 1000));
    const onConferenceTerminated = (nativeEvent) => {
        console.log('Terminated');
        /* Conference terminated event */
    }

    const onConferenceJoined = (nativeEvent) => {
        console.log('Joined');

        /* Conference joined event */
    }

    const onConferenceWillJoin = (nativeEvent) => {
        console.log('Will join');

        /* Conference will join event */
    }

    React.useEffect(() => {
        let interval = setInterval(() => {
            setTimer(lastTimerCount => {
                lastTimerCount <= 1 && clearInterval(interval)
                return lastTimerCount - 1
            })
        }, 1000) //each count lasts for a second

        //cleanup the interval on complete
        let timeOut = setTimeout(() => {
            const url = data.studentMeetingLink; // can also be only room name and will connect to jitsi meet servers
            console.log(url);
            const userInfoCall = { displayName: userInfo.name, email: userInfo.email, avatar: userInfo.avatar };
            JitsiMeet.call(testURL, userInfoCall);
            /* You can also use JitsiMeet.audioCall(url) for audio only call */
            /* You can programmatically end the call with JitsiMeet.endCall() */
        }, 1000);
        return () => {
            clearTimeout(timeOut)
            clearInterval(interval)
            JitsiMeet.endCall();
        }
    }, []);

    const toTimeString = (time) => {
        const hour = parseInt((time / 3600) % 24)
        const strH = hour > 10 ? ` ${hour}` : ` 0${hour}`;
        const minute = parseInt((time % 3600) / 60)
        const strM = minute > 10 ? minute : `0${minute}`;
        const second = (time % 3600) % 60
        const strS = second > 10 ? second : `0${second}`;
        const day = parseInt(time / 3600 / 24);
        const strDay = day > 1 ? `${day} days` : day > 0 ? `${day} day` : '';
        return (strDay + strH + ' : ' + strM + " : " + strS)
    }
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' }} >
            {waitTime > 0 &&
                <View style={styles.alert} >
                    <Text style={styles.title} >The lesson will be started after:</Text>
                    <Text style={styles.title}>{toTimeString(timerCount)}</Text>
                    <Text style={styles.title}>({startTime.toUTCString().substring(0, 22)})</Text>
                </View>
            }
            <JitsiMeetView
                onConferenceJoined={onConferenceJoined}
                onConferenceTerminated={onConferenceTerminated}
                onConferenceWillJoin={onConferenceWillJoin} style={styles.meetView} />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 17,
        fontWeight: '600'
    },
    meetView: {
        flex: 1,
        width: '100%', height: '100%',
        zIndex: 1,
        position: 'absolute',
        left: 0, top: 0, right: 0, bottom: 0
    },
    alert: {
        backgroundColor: 'white', opacity: 0.5, borderRadius: 13,
        alignItems: 'center', padding: 10, margin: 10, position: 'absolute', zIndex: 2
    }
})