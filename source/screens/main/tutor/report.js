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
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    const select1 = () => {
        if (!report1)
            setDescription(0);
        else
            removeDescription(0)
        setReport1(!report1)
    }
    const select2 = () => {
        if (!report2)
            setDescription(1);
        else
            removeDescription(1);
        setReport2(!report2)
    }
    const select3 = () => {
        if (!report3)
            setDescription(2)
        else
            removeDescription(2);
        setReport3(!report3)
    }
    const select4 = () => {
        if (!report4)
            setDescription(3)
        else
            removeDescription(3);
        setReport4(!report4)
    }
    const select5 = () => {
        if (!report5)
            setDescription(4)
        else
            removeDescription(4);
        setReport5(!report5)
    }
    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                <View style={{ width: '100%', alignItems: 'center' }} >
                    <GetIcon iconName={'report'} source={'MaterialIcons'} size={40} color={'#f0932b'} />
                </View>
                <Text style={styles.title}>You are reporting {data.User.name}</Text>
                <Text style={styles.title}>Help us understand what's happening!</Text>
                <TouchableOpacity style={styles.checkBoxRow} onPress={select1} >
                    <Checkbox status={report1 ? 'checked' : 'unchecked'} onPress={select1} />
                    <Text style={styles.itemContent}> This tutor is annoying me </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.checkBoxRow} onPress={select2}  >
                    <Checkbox status={report2 ? 'checked' : 'unchecked'}
                        onPress={select2} />
                    <Text style={styles.itemContent}>This profile is pretending be someone or is fake</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.checkBoxRow} onPress={select3}>
                    <Checkbox status={report3 ? 'checked' : 'unchecked'}
                        onPress={select3} />
                    <Text style={styles.itemContent}>Inappropriate profile photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.checkBoxRow} onPress={select4}>
                    <Checkbox status={report4 ? 'checked' : 'unchecked'}
                        onPress={select4} />
                    <Text style={styles.itemContent}>This tutor didn't appear at lesson</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.checkBoxRow} onPress={select5} >

                    <Checkbox status={report5 ? 'checked' : 'unchecked'}
                        onPress={select5} />
                    <Text style={styles.itemContent}>This tutor's behavior is not appropriate</Text>
                </TouchableOpacity>
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
        flexDirection: 'row', alignItems: 'center'
    },
    itemContent: {
        fontSize: 15, fontWeight: '600'
    }
})