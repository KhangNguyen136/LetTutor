import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput } from 'react-native';
import { MyButton } from '../../components/button';
import Card, { TextCard } from '../../components/card';
import { globalStyles } from '../../styles/globalStyles';
import { GetIcon } from '../../components/button';
import { getUserInfo } from '../../services/userInfo';
import { useSelector } from 'react-redux';
import LoadingIndicator from '../../components/loadingIndicator';
import { bookingLesson } from '../../services/booking';

export default function Booking({ navigation, route }) {
    const userInfo = useSelector(state => state.userInfoState);
    const token = userInfo.tokens.access.token;
    const { item, tutor, callBack } = route.params;
    console.log(item);
    const [sucess, setSucess] = React.useState(false);
    const [balance, setBalance] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const [note, setNote] = React.useState('');
    const startTime = new Date(item.startPeriodTimestamp);
    const endTime = new Date(item.endPeriodTimestamp);
    React.useEffect(() => {
        getBalance()
    }, [])
    const getBalance = async () => {
        const userInfo = await getUserInfo(token)
        setBalance(userInfo.walletInfo.amount / 100000);
        setLoading(false);
    }
    const submit = async () => {
        setLoading(true);
        const res = await bookingLesson([item.id], note, token);
        if (res) {
            setSucess(true);
            callBack();
        }
        setLoading(false);
    }
    if (loading)
        return <LoadingIndicator />
    if (sucess)
        return (
            <SafeAreaView style={{ ...globalStyles.container }}>
                <Card>
                    <View style={{ padding: 20, width: '100%', alignItems: 'center' }}>
                        <GetIcon iconName={'checkcircle'} source={'AntDesign'} color={'#52C41A'} size={40} />
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginVertical: 20 }}>Booking success</Text>
                        <Text style={{ fontSize: 15 }}>Check your mail's inbox to see detail information</Text>
                    </View>

                </Card>
            </SafeAreaView>
        )
    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                <Image source={{ uri: tutor.User.avatar }} style={{ width: 120, height: 120, borderRadius: 20, alignSelf: 'center' }}  ></Image>
                <View style={{ margin: 5 }} >
                    {/* <Text style={globalStyles.title1}>Booking information: </Text> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <GetIcon iconName={'chalkboard-teacher'} source={'FontAwesome5'} size={18} />
                        <Text style={globalStyles.title2} > Tutor: </Text>
                        <Text style={globalStyles.titleName} >{tutor.User.name}</Text>
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
                        <Text style={{ marginLeft: 4, fontSize: 16 }} >{startTime.toString().substring(16, 22)} - {endTime.toString().substring(16, 22)}</Text>
                    </View>
                    <View style={globalStyles.verticalDivide} />
                    <View style={styles.rowItem} >
                        <GetIcon iconName={'price-tag'} source={'Entypo'} size={18} />
                        <Text style={globalStyles.title2}>Price: </Text>
                        <Text style={{ marginLeft: 4, fontSize: 16 }} > 1 lesson</Text>
                    </View>
                    <View style={globalStyles.verticalDivide} />

                    <View style={styles.rowItem} >
                        <GetIcon iconName={'wallet'} source={'Entypo'} size={18} />
                        <Text style={globalStyles.title2} > Your balance: </Text>
                        <Text style={{ fontSize: 16 }} > {balance} {balance > 1 ? 'lessons' : 'lesson'} left</Text>
                    </View>
                    <View style={globalStyles.verticalDivide} />
                    <Text style={globalStyles.title2} >Request </Text>
                    <TextCard>
                        <TextInput value={note} onChangeText={setNote} placeholder={'What you want the tutor know?'} multiline={true} style={{ minHeight: 80 }} />

                    </TextCard>
                </View>
            </Card>
            <MyButton onPress={submit} title={'Book'} moreStyle={globalStyles.authBtnContainer} moreTitleStyle={{ color: 'white' }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    rowItem: {
        flexDirection: 'row', alignItems: 'center',
        margin: 5
    }

})