import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { FlexCard } from '../../components/card';
import { globalStyles } from '../../styles/globalStyles';
import Picker from '../../components/picker';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { GetIcon, MyButton } from '../../components/button';
import { formatAmount } from '../../styles/globalStyles';

export default function BuyLesson({ navigation }) {

    const [nlesson, setnLesson] = React.useState(lessonDaily[2])
    const [nday, setnDay] = React.useState(dayWeekly[3]);
    const [period, setPeriod] = React.useState(periods[0])
    const [coupon, setCoupon] = React.useState('')

    const SegmentButton = ({ item }) => {

        const itemColor = item.value == period.value ? {
            textColor: 'white',
            backgroundColor: '#0071F0'
        } : {
            textColor: 'black',
            backgroundColor: '#dfe6e9'
        }
        return (
            <TouchableOpacity onPress={() => setPeriod(item)}
                style={{
                    alignItems: 'center', padding: 8, borderRadius: 8,
                    backgroundColor: itemColor.backgroundColor
                }}>
                <Text
                    style={{ fontSize: 15, fontWeight: '600', color: itemColor.textColor }} >
                    {item.value}{monthUnit(item.value)}</Text>
                <Text
                    style={{ fontSize: 14, fontWeight: '500', color: itemColor.textColor }}>
                    {item.sale}</Text>
            </TouchableOpacity>
        )
    }

    const calTotal = () => {
        return (nday.value * nlesson.value * 4 * period.value * 100000 * period.saleValue)
    }

    return (
        <SafeAreaView style={globalStyles.container} >
            <FlexCard>
                <Text style={{ fontSize: 30, fontWeight: '700', textAlign: 'center', margin: 5 }}> Plan and Prices </Text>
                <Text style={{ fontSize: 16, fontWeight: '400', textAlign: 'center', margin: 5 }}>Choose the best fitting plan and start to improve your English today!</Text>
                {/* <View style={globalStyles.verticalDivide} /> */}
                <View style={styles.rowContainer}>
                    <GetIcon iconName={'schedule'} source={'MaterialIcons'} />
                    <Text style={globalStyles.title1}> Set a weekly schedule</Text>
                </View>
                <View style={{
                    flexDirection: 'row', margin: 5,
                    justifyContent: 'space-evenly', alignItems: 'flex-start'
                }}>
                    <View>
                        <Picker value={nlesson} data={listNlesson} didSelect={setnLesson} config={configPicker} />
                        <Text style={{ fontWeight: '500', color: 'orange' }}>25 minutes per lesson</Text>
                    </View>
                    <Picker value={nday.value + dayUnit(nday.value) + "weekly"} data={listNday} didSelect={setnDay} config={configPicker} />
                </View>
                <View style={globalStyles.verticalDivide} />
                <View style={styles.rowContainer}>
                    <GetIcon iconName={'timetable'} source={'MaterialCommunityIcons'} />
                    <Text style={globalStyles.title1}> Select a commitment level</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
                    <SegmentButton item={periods[0]} />
                    <SegmentButton item={periods[1]} />
                    <SegmentButton item={periods[2]} />
                    <SegmentButton item={periods[3]} />
                </View>
                <View style={globalStyles.verticalDivide} />
                <View style={styles.rowContainer}>
                    <GetIcon iconName={'sale'} source={'MaterialCommunityIcons'} />
                    <Text style={globalStyles.title1}> Utilize your promotion</Text>
                </View>
                <View style={{ ...styles.rowContainer, paddingVertical: 0 }}>
                    <TextInput placeholder={'Enter your coupon'} style={styles.textInput}
                        value={coupon} onChangeText={setCoupon} />
                    <MyButton title={'Apply'} />
                </View>
                <Text style={styles.pr}>TAKE AN EXTRA 25% OFF FOR ORDERS IN THIS MONTH</Text>

                <View style={globalStyles.verticalDivide} />
                <View style={styles.rowContainer}>
                    <GetIcon iconName={'money-check-alt'} source={'FontAwesome5'} />
                    <Text style={globalStyles.title1}> Total:</Text>
                </View>
                <View style={styles.total}>
                    <Text style={styles.sale}>{Math.fround((0.25 + 1 - period.saleValue) * 100)}%</Text>
                    <Text style={styles.money}>{formatAmount(calTotal() * 0.75)}</Text>
                    <Text style={styles.notSale}>{formatAmount(calTotal())}</Text>
                </View>
                <Text style={styles.note} > (~ {formatAmount(calTotal() * 0.75 / period.value)} per month) </Text>

                <MyButton title={'Check out'} moreStyle={globalStyles.authBtnContainer} moreTitleStyle={{ color: 'white' }} />

            </FlexCard>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 10
    },
    textInput: {
        fontSize: 16,
        paddingVertical: 3,
        paddingHorizontal: 10,
        backgroundColor: '#dfe6e9',
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 4,
        flex: 1
    },
    pr: {
        textAlign: 'center', fontWeight: '600', fontSize: 16, color: '#ff7675'
    },
    total: {
        alignSelf: 'center', padding: 10, alignItems: 'center',
        backgroundColor: '#dfe6e9',
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        margin: 5,
    },
    money: { fontWeight: '600', fontSize: 18, color: '#0071F0', margin: 7 },
    sale: {
        padding: 4, marginTop: -15, marginRight: -15, alignSelf: 'flex-end', borderRadius: 10,
        fontWeight: '600', backgroundColor: '#F09400', color: 'white'
    },
    notSale: { textDecorationLine: 'line-through' },
    note: { color: 'orange', marginBottom: 7, marginLeft: 20 }
})

const configPicker = {
    containerStyle: {
        backgroundColor: '#0071F0',
        padding: 7,
    },
    textStyle: {
        color: 'white', fontWeight: '600'
    }
}

const listNday = () => {
    const result = []
    for (let id in dayWeekly) {
        const value = dayWeekly[id].value
        result.push({ label: value + dayUnit(value) + 'weekly', value })
    } return result
}

const listNlesson = () => {
    const result = []
    for (let id in lessonDaily) {
        const value = lessonDaily[id].value
        result.push({ value, label: value + lessonUnit(value) + 'daily' })
    }
    return result
}


const lessonDaily = [
    {
        value: 1, label: '1'
    },
    {
        value: 2, label: '2'
    },
    {
        value: 3, label: '3'
    },
    {
        value: 4, label: '4'
    },
    {
        value: 5, label: '5'
    },
    {
        value: 6, label: '6'
    },
    {
        value: 7, label: '7'
    },
    {
        value: 8, label: '8'
    },
    {
        value: 9, label: '9'
    },
]
const dayWeekly = [
    {
        value: 1, label: '1'
    },
    {
        value: 2, label: '2'
    },
    {
        value: 3, label: '3'
    },
    {
        value: 4, label: '4'
    },
    {
        value: 5, label: '5'
    },
    {
        value: 6, label: '6'
    },
    {
        value: 7, label: '7'
    },
]
const periods = [
    {
        value: 1, sale: '-', saleValue: 1
    },
    {
        value: 3, sale: '10% off', saleValue: 0.9
    },
    {
        value: 6, sale: '25% off', saleValue: 0.75
    },
    {
        value: 12, sale: '55% off', saleValue: 0.45
    },
]

const dayUnit = (nday) => {
    return nday > 1 ? ' days ' : ' day '
}

const lessonUnit = (nlesson) => {
    return nlesson > 1 ? ' lessons ' : ' lesson '
}

const monthUnit = (nmonth) => {
    return nmonth > 1 ? ' months ' : ' month '
}