import React from 'react';
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';
import Card from '../../components/card';


export default function StudyRoom() {
    const [timerCount, setTimer] = React.useState(7200)

    React.useEffect(() => {
        let interval = setInterval(() => {
            setTimer(lastTimerCount => {
                lastTimerCount <= 1 && clearInterval(interval)
                return lastTimerCount - 1
            })
        }, 1000) //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval)
    }, []);

    const toTimeString = (time) => {
        const hour = parseInt(time / 3600)
        const minute = parseInt((time % 3600) / 60)
        const second = (time % 3600) % 60
        return (hour + ' : ' + minute + " : " + second)
    }
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }} >
            <Card>
                <View style={{ alignItems: 'center', padding: 10, margin: 10 }} >
                    <Text style={styles.title} >The lesson will be started after</Text>
                    <Text style={styles.title}>{toTimeString(timerCount)}</Text>
                </View>
            </Card>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 17,
        fontWeight: '600'
    }
})