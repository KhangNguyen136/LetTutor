import React from 'react';
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet'
import { useSelector } from 'react-redux';
import { Buffer } from 'buffer';
const server = "https://meet.tutoring.letstudy.io";

export default function StudyRoom({ navigation, route }) {
    const { data } = route.params;
    const userInfo = useSelector(state => state.userInfoState);
    const token = userInfo.tokens.access.token;
    const scheduleDetailInfo = data.scheduleDetailInfo;
    const startTime = new Date(scheduleDetailInfo.startPeriodTimestamp);
    const endTime = new Date(scheduleDetailInfo.endPeriodTimestamp);
    const meetingInfo = decode(data.studentMeetingLink)

    const waitTime = startTime.valueOf() - Date.now();
    const [timerCount, setTimer] = React.useState(parseInt(waitTime / 1000));
    const onConferenceTerminated = (nativeEvent) => {
        console.log('Terminated');
        // JitsiMeet.endCall();
        navigation.replace('History')
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
        const options = {
            audioMuted: false,
            audioOnly: false,
            videoMuted: false,
            token: token,
        }
        //cleanup the interval on complete
        let timeOut = setTimeout(() => {
            const url = 'https://meet.lettutor.com/' + meetingInfo.roomName; // can also be only room name and will connect to jitsi meet servers
            const userInfoCall = { displayName: userInfo.name, email: userInfo.email, avatar: userInfo.avatar };
            JitsiMeet.call(url, userInfoCall, options.meetFeatureFlags);
            /* You can also use JitsiMeet.audioCall(url) for audio only call */
            /* You can programmatically end the call with JitsiMeet.endCall() */
        }, 1000);
        return () => {
            console.log('Clear');
            clearTimeout(timeOut)
            clearInterval(interval)
            JitsiMeet.endCall();
        }
    }, []);

    const toTimeString = (time) => {
        const hour = parseInt((time / 3600) % 24)
        const strH = hour < 10 ? ` 0${hour}` : ` ${hour}`;
        const minute = parseInt((time % 3600) / 60)
        const strM = minute < 10 ? `0${minute}` : minute;
        const second = (time % 3600) % 60
        const strS = second < 10 ? `0${second}` : second;
        const day = parseInt(time / 3600 / 24);
        const strDay = day > 1 ? `${day} days` : day > 0 ? `${day} day` : '';
        return (strDay + strH + ' : ' + strM + " : " + strS)
    }
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', position: 'relative' }} >
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

function decode(data) {
    const code = data.split('.');
    // console.log(code)
    const decode = Buffer.from(code[1], 'base64').toString('ascii');
    return JSON.parse(decode)
}
const styles = StyleSheet.create({
    title: {
        fontSize: 17,
        fontWeight: '600',
        margin: 5
    },
    meetView: {
        flex: 1,
        width: '100%', height: '100%',
        zIndex: 1,
        position: 'absolute',
        left: 0, top: 0, right: 0, bottom: 0
    },
    alert: {
        backgroundColor: 'white', opacity: 1, borderRadius: 13,
        alignItems: 'center', padding: 10, margin: 10, position: 'absolute', zIndex: 2,
        borderColor: 'black', borderWidth: 0.5,
        // justifyContent: 'center'
    }
})

const meetFeatureFlags = {
    addPeopleEnabled: true,
    calendarEnabled: true,
    callIntegrationEnabled: true,
    chatEnabled: true,
    closeCaptionsEnabled: true,
    inviteEnabled: true,
    androidScreenSharingEnabled: true,
    liveStreamingEnabled: true,
    meetingNameEnabled: true,
    meetingPasswordEnabled: true,
    pipEnabled: true,
    kickOutEnabled: true,
    conferenceTimerEnabled: true,
    videoShareButtonEnabled: true,
    recordingEnabled: true,
    reactionsEnabled: true,
    raiseHandEnabled: true,
    tileViewEnabled: true,
    toolboxAlwaysVisible: false,
    toolboxEnabled: true,
    welcomePageEnabled: false,
}