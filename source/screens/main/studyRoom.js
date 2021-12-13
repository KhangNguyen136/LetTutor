import React from 'react';
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';
import Card from '../../components/card';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet'

const testURL = 'https://meet.jit.si/GoldenCollegesLobbyOnline';

export default function StudyRoom() {
    const [timerCount, setTimer] = React.useState(7200);
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
        // let interval = setInterval(() => {
        //     setTimer(lastTimerCount => {
        //         lastTimerCount <= 1 && clearInterval(interval)
        //         return lastTimerCount - 1
        //     })
        // }, 1000) //each count lasts for a second

        //cleanup the interval on complete
        setTimeout(() => {
            const url = testURL; // can also be only room name and will connect to jitsi meet servers
            const userInfo = { displayName: 'Khang Nguyen', email: 'user@example.com', avatar: 'https:/gravatar.com/avatar/abc123' };
            JitsiMeet.call(url, userInfo);
            /* You can also use JitsiMeet.audioCall(url) for audio only call */
            /* You can programmatically end the call with JitsiMeet.endCall() */
        }, 1000);
        // return () => clearInterval(interval)
    }, []);

    const toTimeString = (time) => {
        const hour = parseInt(time / 3600)
        const minute = parseInt((time % 3600) / 60)
        const second = (time % 3600) % 60
        return (hour + ' : ' + minute + " : " + second)
    }
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }} >
            {/* <Card>
                <View style={{ alignItems: 'center', padding: 10, margin: 10 }} >
                    <Text style={styles.title} >The lesson will be started after</Text>
                    <Text style={styles.title}>{toTimeString(timerCount)}</Text>
                </View>
            </Card> */}
            <JitsiMeetView onConferenceJoined={onConferenceJoined} onConferenceTerminated={onConferenceTerminated}
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
        width: '100%', height: '100%'
    }
})