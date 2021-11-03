import React from 'react';
import { Text, Button, StyleSheet, View, ScrollView, Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Table, TableWrapper, Row, Rows, Col, Cell, Cols } from 'react-native-table-component';
import { useNavigation } from '@react-navigation/native'

const today = new Date()
export default function TableBooking({ data, tutor }) {
    const listDate = getListDates()
    const navigation = useNavigation()
    const state = {
        tableHead: listDate.title,
        tableTitle: ['7:00 - 7:25', '8:00 - 8:25', '9:00 - 9:25', '10:00 - 10:25', '11:00 - 11:25', '12:00 - 12:25', '13:00 - 13:25', '14:00 - 14:25', '15:00 - 15:25', '16:00 - 16:25'],
        tableData: [
            [0, 1, 2, 0, 1, 2, 2, 0, 2, 1],
            [0, 1, 2, 0, 1, 2, 2, 0, 2, 1],
            [0, 1, 2, 0, 1, 2, 2, 0, 2, 1],
            [0, 1, 2, 0, 1, 2, 2, 0, 2, 1],
            [0, 1, 2, 0, 1, 2, 2, 0, 2, 1],
            [0, 1, 2, 0, 1, 2, 2, 0, 2, 1],
            [0, 1, 2, 0, 1, 2, 2, 0, 2, 1],

        ],
        widthArr: Array(7).fill(60),
        widthArrHeader: [100].concat(Array(7).fill(60)),
        heightArr: Array(10).fill(28)
    }

    const Booked = () => {
        return (
            <Text style={{ color: 'black', textAlign: 'center', fontSize: 12 }}
            >Booked</Text>
        )
    }
    const Empty = () => {
        return (
            <Text style={{ color: 'gray', textAlign: 'center', fontSize: 12 }}
            >Empty</Text>
        )
    }
    const toBooking = (item) => {
        console.log(item)
        navigation.navigate('Booking', { data: { date: listDate.dates[item.index].toString(), time: state.tableTitle[item.cellIndex], name: tutor.name } })
    }
    const BookBtn = (item) => {

        return (
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: '500', backgroundColor: '#3399ff', borderRadius: 5 }}
                onPress={() => toBooking(item)}
            >Book</Text>
        )
    }


    return (
        <View style={styles.container}>
            <ScrollView horizontal >
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
                                                    cellData === 1 ? Booked() : cellData === 2 ? BookBtn({ index, cellIndex }) : Empty()
                                                } textStyle={styles.text} />
                                            ))
                                        }
                                    </TableWrapper>
                                ))
                            }
                        </TableWrapper>
                    </Table>
                </View>
            </ScrollView>
        </View>

    )
}

function getListDates() {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    var result = { title: [], dates: [] }
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