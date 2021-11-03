import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { FlexCard } from '../../components/card';
import { globalStyles } from '../../styles/globalStyles';
import Picker from '../../components/filter';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { GetIcon, MyButton } from '../../components/button';

export default function BuyLesson({ navigation }) {
    const [nlesson, setnLesson] = React.useState(1)
    const [nday, setnDay] = React.useState(2)
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
                    style={{ fontSize: 16, fontWeight: '600', color: itemColor.textColor }} >
                    {item.value}</Text>
                <Text
                    style={{ fontSize: 14, fontWeight: '500', color: itemColor.textColor }}>
                    {item.sale}</Text>
            </TouchableOpacity>
        )
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
                        <Picker title={nlesson + " lesson daily"} value={nlesson + " lesson daily"} data={lessonDaily} didSelect={setnLesson} />
                        <Text style={{ fontWeight: '500', color: 'orange' }}>25 minutes per lesson</Text>
                    </View>
                    <Picker title={nday + " day weekly"} value={nday + " day weekly"} data={dayWeekly} didSelect={setnLesson} />
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
                    <GetIcon iconName={'attach-money'} source={'MaterialIcons'} />
                    <Text style={globalStyles.title1}> Total:</Text>
                </View>
                <View style={styles.total}>
                    <Text>10.000.000 vnđ</Text>
                </View>

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
        alignSelf: 'center', padding: 20, alignItems: 'center',
        backgroundColor: '#dfe6e9',
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        margin: 5,
    }
})

const lessonDaily = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const dayWeekly = [1, 2, 3, 4, 5, 6, 7]
const periods = [
    {
        value: '1 month', sale: '-',
    },
    {
        value: '3 month', sale: '10% off',
    },
    {
        value: '6 month', sale: '25% off',
    },
    {
        value: '12 month', sale: '60% off',
    },
]