import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { MyButton } from './button';
import { TextCard } from './card';
import { editRequest } from '../services/booking';
import { Dialog, Portal } from 'react-native-paper';
export default function EditRequestDialog({ show, item, token, onSuccess, cancel }) {

    const [studentRequest, setStudentRequest] = React.useState("");

    React.useEffect(() => {
        setStudentRequest(item.studentRequest)
    }, [item])
    const submit = async () => {
        const res = await editRequest(studentRequest, item.id, token);
        if (res) {
            onSuccess();
        }
    }
    return (
        <Portal >
            <Dialog onDismiss={cancel} visible={show} style={{ width: '100%', alignSelf: 'center', padding: 10 }} >
                <Dialog.Content >
                    <View style={{
                        alignSelf: 'center',
                        backgroundColor: 'white',
                    }} >
                        <Text style={{ fontSize: 18, fontWeight: '600', margin: 5 }} >Request</Text>
                        <TextCard>
                            <TextInput placeholder={'What you want the tutor know?'}
                                value={studentRequest} onChangeText={setStudentRequest} multiline={true}
                                style={{ minHeight: 150, }} />
                        </TextCard>
                        <Text style={{ padding: 5, color: 'gray', fontSize: 14 }}>You can write in English or Vietnamese (Maximum 200 letters)</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }} >
                            <MyButton title={'Cancel'} onPress={cancel} moreStyle={{ borderWidth: 0.5, borderColor: 'black', backgroundColor: '#dfe6e9' }} />
                            <MyButton title={'Submit'} moreStyle={{ paddingHorizontal: 20 }} onPress={submit} />
                        </View>
                    </View>
                </Dialog.Content>
            </Dialog>
        </Portal>

    )
}

const styles = StyleSheet.create({
    rowItem: {
        flexDirection: 'row', alignItems: 'center',
        margin: 5
    }

})