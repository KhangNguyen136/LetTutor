import React from 'react';
import {
    SafeAreaView, Text, StyleSheet, View, TextInput
} from 'react-native';
import { GetIcon, MyButton } from '../../../components/button';
import Card from '../../../components/card';
import { globalStyles } from '../../../styles/globalStyles';
import { Checkbox } from 'react-native-paper';
import { reportTutor } from '../../../services/tutor';
import { showMessage } from 'react-native-flash-message';

export default function ReportScreen({ navigation, route }) {
    const { data, token } = route.params;
    console.log(data)
    const [report1, setReport1] = React.useState(false)
    const [report2, setReport2] = React.useState(false)
    const [report3, setReport3] = React.useState(false)
    const [report4, setReport4] = React.useState(false)
    const [report5, setReport5] = React.useState(false)
    const [description, setDescript] = React.useState('');
    const setDescription = (id) => {
        setDescript(description + reportContent[id] + '\n');
    }
    const removeDescription = (id) => {
        setDescript(description.replace(reportContent[id] + '\n', ''));
    }
    const send = async () => {
        if (description == '') {
            showMessage({ type: 'warning', message: 'Please enter detail problem about this tutor!' });
            return;
        }
        const res = await reportTutor(description, data.userId, token);
        if (res) {
            showMessage({ type: 'success', message: 'Report sent', description: 'We will consider the matter as soon as possible.' });
            navigation.goBack();
        }
    }
    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                <View style={{ width: '100%', alignItems: 'center' }} >
                    <GetIcon iconName={'report'} source={'MaterialIcons'} size={40} color={'#f0932b'} />
                </View>
                <Text style={styles.title}>You are reporting {data.User.name}</Text>
                <Text style={styles.title}>Help us understand what's happening!</Text>
                <View style={styles.checkBoxRow}>
                    <Checkbox status={report1 ? 'checked' : 'unchecked'} onPress={() => {
                        if (!report1)
                            setDescription(0);
                        else
                            removeDescription(0)
                        setReport1(!report1)
                    }} />
                    <Text style={styles.itemContent}> This tutor is annoying me </Text>
                </View>
                <View style={styles.checkBoxRow}>

                    <Checkbox status={report2 ? 'checked' : 'unchecked'}
                        onPress={() => {
                            if (!report2)
                                setDescription(1);
                            else
                                removeDescription(1);
                            setReport2(!report2)
                        }} />
                    <Text style={styles.itemContent}>This profile is pretending be someone or is fake</Text>
                </View>
                <View style={styles.checkBoxRow}>
                    <Checkbox status={report3 ? 'checked' : 'unchecked'}
                        onPress={() => {
                            if (!report3)
                                setDescription(2)
                            else
                                removeDescription(2);
                            setReport3(!report3)
                        }} />
                    <Text style={styles.itemContent}>Inappropriate profile photo</Text>
                </View>
                <View style={styles.checkBoxRow}>
                    <Checkbox status={report4 ? 'checked' : 'unchecked'}
                        onPress={() => {
                            if (!report4)
                                setDescription(3)
                            else
                                removeDescription(3);
                            setReport4(!report4)
                        }} />
                    <Text style={styles.itemContent}>This tutor didn't appear at lesson</Text>
                </View>
                <View style={styles.checkBoxRow}>

                    <Checkbox status={report5 ? 'checked' : 'unchecked'}
                        onPress={() => {
                            if (!report5)
                                setDescription(4)
                            else
                                removeDescription(4);
                            setReport5(!report5)
                        }} />
                    <Text style={styles.itemContent}>This tutor's behavior is not appropriate</Text>
                </View>
                <TextInput multiline={true} style={styles.textInput} placeholder={'Let us know details about the problem'} value={description} onChangeText={setDescript} />
                <MyButton title={'Send'} onPress={send}
                    moreStyle={{ ...globalStyles.authBtnContainer, width: '44%' }} />
            </Card>
        </SafeAreaView>
    )
}

const reportContent = [
    'This tutor is annoying me',
    'This profile is pretending be someone or is fake',
    'Inappropriate profile photo',
    "This tutor didn't appear at lesson",
    "This tutor's behavior is not appropriate"
]

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
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
    },
    checkBoxRow: {
        flexDirection: 'row', alignItems: 'center',
    },
    itemContent: {
        fontSize: 15, fontWeight: '600'
    }
})