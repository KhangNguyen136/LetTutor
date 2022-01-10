import React from 'react';
import { Text, Button, StyleSheet, View, ScrollView, Touchable } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cell, Cols } from 'react-native-table-component';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import { initBasceSchedule } from '../bussiness/scheduleHandle';
import { getScheduleByID } from '../services/tutor';
import LoadingIndicator from './loadingIndicator';
import { getUserInfo } from '../services/userInfo';
// import BookingDialog from './booking/bookingDialog';
const today = new Date()
export default function TableBooking({ tutor, token, userId }) {
    const allColTitle = initBasceSchedule();
    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState(0);
    const [dataSrc, setDataSrc] = React.useState([]);
    const [dataShow, setDataShow] = React.useState(initDataShow());
    const [colTitle, setColTitle] = React.useState(allColTitle)
    // const [bookingItem, setBookingItem] = React.useState({});
    // const [showBooking, setShowBooking] = React.useState(false);
    // const [bookBtnCalBack, setBookBtnCalBack] = React.useState(null);
    // const [balance, setBalance] = React.useState(0);
    const [userInfo, setUserInfo] = React.useState({});
    const navigation = useNavigation();
    const state = {
        tableHead: dataShow.title,
        tableTitle: colTitle,
        tableData: dataShow.data,
        widthArrHeader: [100].concat(Array(7).fill(60)),
        heightArr: Array(48).fill(28)
    }
    React.useEffect(() => {
        getData();
    }, [])

    React.useEffect(() => {
        if (dataSrc.length == 0)
            return
        const data = dataSrc.data.slice(page * 7, page * 7 + 7);
        setDataShow({
            title: [dataSrc.title[0]].concat(dataSrc.title.slice(7 * page + 1, 7 * page + 8)),
            data
        })
        // set
    }, [page])
    const getData = async () => {
        setLoading(true);
        const userInfo = await getUserInfo(token);
        setUserInfo(userInfo);
        const res = await getScheduleByID(tutor.userId, token);
        setDataSrc(res)
        setDataShow({
            title: res.title.slice(0, 8),
            data: res.data.slice(0, 7)
        });
        // setBalance(userInfo.walletInfo.amount / 100000);
        setLoading(false);
    }

    // const toBooking = (item, callBack) => {
    //     // navigation.navigate('Booking', { item, tutor })
    //     setShowBooking(true);
    //     setBookingItem(item);
    //     setBookBtnCalBack(callBack);
    // }

    // const bookingCallBackDialog = (result) => {
    //     console.log(result);
    //     if (result)
    //         bookBtnCalBack();
    //     setShowBooking(false);
    //     setBookingItem(null);
    //     setBookBtnCalBack(null)
    // }

    function BookingCell(item) {
        if (item == null)
            return null
        if (item.isBooked) {
            const bookedInfo = item.bookingInfo;
            const length = bookedInfo.length
            if (length != 0 && bookedInfo[length - 1].userId == userInfo.id)
                return Booked()
            return Reverse()
        }
        return (<BookBtn item={item} tutor={tutor} navigation={navigation} />)
    }

    return (
        <View style={styles.container}>
            {/* <BookingDialog show={showBooking} item={bookingItem} balance={balance} callBack={bookingCallBackDialog} /> */}
            <ScrollView horizontal showsHorizontalScrollIndicator >
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 5 }}>{dataShow.title[1].substring(0, 4)} - {dataShow.title[7].substring(0, 4)}</Text>
                        <DataTable.Pagination numberOfPages={4} onPageChange={
                            page => {
                                if (page < 0 || page > 3)
                                    return
                                setPage(page)
                            }
                        }
                            page={0} style={{ alignSelf: 'flex-start' }} />

                    </View>
                    <Table borderStyle={{ borderWidth: 1 }}>
                        <Row data={state.tableHead} widthArr={state.widthArrHeader} style={styles.head} textStyle={styles.text} />
                        <TableWrapper style={styles.wrapper}>
                            <Col data={state.tableTitle} style={styles.title} textStyle={styles.text} heightArr={state.heightArr} />
                            {/* <Cols data={state.tableData} widthArr={state.widthArr} heightArr={state.heightArr} style={styles.row} textStyle={styles.text} /> */}
                            {
                                state.tableData.map((rowData, index) => (
                                    <TableWrapper key={index} style={styles.row}>
                                        {
                                            rowData.map((cellData, cellIndex) => (
                                                <Cell key={cellIndex} style={styles.cell}
                                                    data={
                                                        BookingCell(cellData)
                                                    }
                                                    textStyle={styles.text} />
                                            ))
                                        }
                                    </TableWrapper>
                                ))
                            }
                        </TableWrapper>
                    </Table>
                </View>
                {loading &&
                    <LoadingIndicator />}
            </ScrollView>
        </View>

    )
}

function BookBtn({ item, navigation, tutor }) {
    const [isBooked, setIsBooked] = React.useState(false);
    const callBack = () => {
        setIsBooked(true);
    }
    const onPress = () => {
        navigation.navigate('Booking', { item, tutor, callBack })
    }
    if (isBooked)
        return (Booked())
    return (
        <Text style={{ textAlign: 'center', fontWeight: '600', color: '#3399ff', }}
            onPress={onPress}
        >Book</Text>
    )
}

const Booked = () => {
    return (
        <Text style={{ color: '#2ECC71', textAlign: 'center', fontSize: 12, fontWeight: '600', padding: 1 }}
        >Booked</Text>
    )
}

const Reverse = () => {
    return (
        <Text style={{ color: 'gray', textAlign: 'center', fontSize: 11, fontWeight: '600', padding: 1 }}
        >Reserved</Text>
    )
}

function initDataShow() {
    return ({
        title: getListDates(),
        data: Array(7).fill(Array(48).fill(null))

    })
}

function getListDates() {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    var result = [''];
    var temp = new Date()
    for (var i = 0; i < 7; i++) {
        temp.setDate(today.getDate() + i)
        const date = temp.getDate() + "/" + (temp.getMonth() + 1)
        const day = daysOfWeek[temp.getDay()]
        result.push(date + '\n' + day)
    }
    return result;
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    head: { backgroundColor: '#f1f8ff', height: 40 },
    wrapper: { flexDirection: 'row' },
    title: { width: 100, backgroundColor: '#f6f8fa' },
    row: { height: 28 },
    rowHeader: { height: 50 },
    text: { textAlign: 'center', fontSize: 13 },
    cell: { height: 28, width: 60, backgroundColor: 'white' }

})