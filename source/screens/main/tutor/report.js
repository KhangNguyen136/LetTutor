import React from 'react';
import {
    SafeAreaView, Text, StyleSheet, View, TextInput
} from 'react-native';
import { GetIcon, MyButton } from '../../../components/button';
import Card from '../../../components/card';
import { globalStyles } from '../../../styles/globalStyles';
import { CheckBox } from 'react-native-elements';

export default function ReportScreen({ navigation }) {
    const [report1, setReport1] = React.useState(false)
    const [report2, setReport2] = React.useState(false)
    const [report3, setReport3] = React.useState(false)
    const [report4, setReport4] = React.useState(false)
    const [report5, setReport5] = React.useState(false)
    const [description, setDescript] = React.useState('')
    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                <View style={{ width: '100%', alignItems: 'center' }} >
                    <GetIcon iconName={'report'} source={'MaterialIcons'} size={40} color={'#f0932b'} />
                </View>
                <Text style={styles.title}>You are reporting Jack</Text>
                <Text style={styles.title}>Help us understand what's happening!</Text>
                <CheckBox title={'This tutor is annoying me'} checked={report1} onPress={() => setReport1(!report1)} />
                <CheckBox title={'This profile is pretending be someone or is fake'} checked={report2} onPress={() => setReport2(!report2)} />
                <CheckBox title={'Inappropriate profile photo'} checked={report3} onPress={() => setReport3(!report3)} />
                <CheckBox title={"This tutor didn't appear at lesson"} checked={report4} onPress={() => setReport4(!report4)} />
                <CheckBox title={"This tutor's behavior is not appropriate"} checked={report5} onPress={() => setReport5(!report5)} />
                <TextInput multiline={true} style={styles.textInput} placeholder={'Let us know details about the problem'} value={description} onChangeText={setDescript} />
                <MyButton title={'Send'} moreStyle={{ ...globalStyles.authBtnContainer, width: '69%' }} />
            </Card>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: '600',
        color: '#6ab04c',
        fontSize: 18,
        textAlign: 'center'
    },
    textInput: {
        minHeight: 60,
        margin: 5,
        padding: 5,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 5
    }
})