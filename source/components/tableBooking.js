import React from 'react';
import { Text, Button, StyleSheet, View, ScrollView, Touchable } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cell, Cols } from 'react-native-table-component';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import { getTableBookingTitle, initBasceSchedule, initBookingTableTitle } from '../bussiness/scheduleHandle';
import { getScheduleByID } from '../services/tutor';
import LoadingIndicator from './loadingIndicator';
const today = new Date()
export default function TableBooking({ data, tutor }) {
    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState(0);
    const [dataSrc, setDataSrc] = React.useState([]);
    const [dataShow, setDataShow] = React.useState(Array(7).fill(Array(48).fill(0)));
    console.log(initBookingTableTitle());
    const title = getListDates()
    const navigation = useNavigation();
    const baseTitle = initBasceSchedule();
    const state = {
        tableHead: title.title,
        tableTitle: baseTitle,
        tableData: dataShow,
        // widthArr: Array(2).fill(60),
        widthArrHeader: [100].concat(Array(7).fill(60)),
        heightArr: Array(48).fill(28)
    }
    React.useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        setLoading(true);
        setDataSrc()
    }
    const Booked = () => {
        return (
            <Text style={{ color: 'gray', textAlign: 'center', fontSize: 12, fontWeight: '600', padding: 1 }}
            >Reserved</Text>
        )
    }
    const toBooking = (item) => {
        console.log(item)
        navigation.navigate('Booking', { data: { date: listDate.dates[item.index].toString(), time: state.tableTitle[item.cellIndex], name: tutor.name } })
    }
    const BookBtn = (item) => {
        return (
            <Text style={{ textAlign: 'center', fontWeight: '600', color: '#3399ff', }}
                onPress={() => toBooking(item)}
            >Book</Text>
        )
    }


    return (
        <View style={styles.container}>

            <ScrollView horizontal showsHorizontalScrollIndicator >
                <View>
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
                                                <Cell key={cellIndex} style={styles.cell} data={
                                                    cellData === 1 ? Booked() : cellData === 2 ? BookBtn({ index, cellIndex }) : null} textStyle={styles.text} />
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
            <DataTable.Pagination page={0} style={{ alignSelf: 'center' }} />
        </View>

    )
}

function getListDates() {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    var result = { title: [''], dates: [null] }
    var temp = new Date()
    for (var i = 0; i < 7; i++) {
        temp.setDate(today.getDate() + i)
        const date = temp.getDate() + "/" + (temp.getMonth() + 1)
        const day = daysOfWeek[temp.getDay()]
        result.title.push(date + '\n' + day)
        result.dates.push(temp)
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