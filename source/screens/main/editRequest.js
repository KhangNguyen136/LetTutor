import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput } from 'react-native';
import { MyButton } from '../../components/button';
import Card, { TextCard } from '../../components/card';
import { globalStyles } from '../../styles/globalStyles';
import { GetIcon } from '../../components/button';
import { editRequest } from '../../services/booking';
import LoadingIndicator from '../../components/loadingIndicator';

export default function EditRequest({ navigation, route }) {
    const { item, token, getData } = route.params;
    const [loading, setLoading] = React.useState(false);
    const [studentRequest, setStudentRequest] = React.useState(item.studentRequest != null ? item.studentRequest : '');
    const tutorInfo = item.scheduleDetailInfo.scheduleInfo.tutorInfo;
    const scheduleInfo = item.scheduleDetailInfo.scheduleInfo;
    const endTime = new Date(scheduleInfo.endTimestamp);
    const startTime = new Date(scheduleInfo.startTimestamp);
    const submit = async () => {
        setLoading(true);
        const res = await editRequest(studentRequest, item.id, token);
        if (res) {
            getData();
            navigation.goBack();
        }
    }
    return (
        <SafeAreaView style={globalStyles.container} >
            {loading &&
                <LoadingIndicator />}
            <Card>
                <Image source={{ uri: tutorInfo.avatar }} style={{ width: 120, height: 120, alignSelf: 'center' }}  ></Image>
                <View style={{ margin: 5 }} >
                    {/* <Text style={globalStyles.title1}>Booking information: </Text> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <GetIcon iconName={'chalkboard-teacher'} source={'FontAwesome5'} size={18} />
                        <Text style={globalStyles.title2} > Tutor: </Text>
                        <Text style={globalStyles.titleName} >{tutorInfo.name}</Text>
                    </View>
                    <View style={globalStyles.verticalDivide} />
                    <View style={styles.rowItem} >
                        <GetIcon iconName={'calendar'} source={'AntDesign'} size={18} />
                        <Text style={globalStyles.title2}>Booking date:</Text>
                        <Text style={{ marginLeft: 4, fontSize: 16 }} >{startTime.toString().substring(0, 16)}</Text>
                    </View>
                    <View style={globalStyles.verticalDivide} />
                    <View style={styles.rowItem} >
                        <GetIcon iconName={'clockcircleo'} source={'AntDesign'} size={18} />
                        <Text style={globalStyles.title2}>Booking time:</Text>
                        <Text style={{ marginLeft: 4, fontSize: 16 }} >{startTime.toString().substring(16, 21)} - {endTime.toString().substring(16, 21)}</Text>
                    </View>
                    <View style={globalStyles.verticalDivide} />

                    <View style={globalStyles.verticalDivide} />
                    <Text style={globalStyles.title2} >Request </Text>
                    <TextCard>
                        <TextInput placeholder={'What you want the tutor know?'} value={studentRequest} onChangeText={setStudentRequest} multiline={true} style={{ minHeight: 80 }} />

                    </TextCard>
                </View>
            </Card>
            <MyButton title={'Submit'} moreStyle={globalStyles.authBtnContainer} moreTitleStyle={{ color: 'white' }} onPress={submit} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    rowItem: {
        flexDirection: 'row', alignItems: 'center',
        margin: 5
    }

})