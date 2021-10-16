import React from 'react';
import { Text, Button, StyleSheet, View, ScrollView, Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Table, TableWrapper, Row, Rows, Col, Cell, Cols } from 'react-native-table-component';

const today = new Date()

export default function TableBooking({ data }) {
    const listDate = getListDates()
    const state = {
        tableHead: listDate,
        tableTitle: ['7:00 - 7:25', '8:00 - 8:25', '9:00 - 9:25', '10:00 - 10:25', '11:00 - 11:25', '12:00 - 12:25', '13:00 - 13:25', '14:00 - 14:25', '15:00 - 15:25', '16:00 - 16:25'],
        tableData: [
            // listDate,
            ['', '2', '3', '1', '2', '3', '1'],
            ['a', 'b', 'c', '1', '2', '3', '1'],
            ['1', '2', '3', '1', '2', '3', '1'],
            ['a', 'b', 'c', '1', '2', '3', '1'],
            ['a', 'b', 'c', '1', '2', '3', '1'],
            ['a', 'b', 'c', '1', '2', '3', '1'],
            ['a', 'b', 'c', '1', '2', '3', '1'],
            ['a', 'b', 'c', '1', '2', '3', '1'],
            ['a', 'b', 'c', '1', '2', '3', '1'],
            ['a', 'b', 'c', '1', '2', '3', '1'],
        ],
        widthArr: [60, 60, 60, 60, 60, 60, 60],
        widthArrHeader: [100, 60, 60, 60, 60, 60, 60, 60],
    }

    const BookBtn = () => {
        return (
            <Text style={{ padding: 3, backgroundColor: '#55efc4' }}
                onPress={() => console.log('Click book')}
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
                            <Col data={state.tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text} />
                            <Rows data={state.tableData} widthArr={state.widthArr} style={styles.row} textStyle={styles.text} />
                            {/* {
                                state.tableData.map((rowData, index) => (
                                    <TableWrapper key={index} style={styles.row}>
                                        {
                                            rowData.map((cellData, cellIndex) => (
                                                <Cell key={cellIndex} style={{ height: 28, width: 60 }} data={cellIndex === 3 ? BookBtn() : cellData} textStyle={styles.text} />
                                            ))
                                        }
                                    </TableWrapper>
                                ))
                            } */}
                        </TableWrapper>
                    </Table>
                </View>
            </ScrollView>
        </View>

    )
}



const dataTest = {
    startTime: '',
    endTime: '',
    item: [
        {
            time: '7:30 - 7:55',
            stt: 'empty',
        },
        {
            time: '8:30 - 8:55',
            stt: 'booked',
        },
        {
            time: '9:30 - 9:55',
            stt: 'available',
        },
        {
            time: '10:30 - 10:55',
            stt: 'availabel',
        },
        {
            time: '11:30 - 11:55',
            stt: 'booked',
        },
        {
            time: '12:30 - 12:55',
            stt: 'booked',
        },
        {
            time: '13:30 - 13:55',
            stt: 'booked',
        },
        {
            time: '14:30 - 14:55',
            stt: 'empty',
        },
        {
            time: '15:30 - 15:55',
            stt: 'empty',
        },
        {
            time: '16:30 - 16:55',
            stt: 'empty',
        },
        {
            time: '17:30 - 17:55',
            stt: 'empty',
        }
    ]

}

function getState() {
    var result = []
    for (var i = 0; i < dataTest.item.length; i++) {
        let stt = Math.floor(Math.random() * 3)
        switch (stt) {
            case 0:
                result.push('empty')
                break;
            case 1:
                result.push('booked')
                break;
            default:
                result.push('availabel')
        }
    }
    return result
}

function getListDates() {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    var result = ['']
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
    text: { textAlign: 'center', fontSize: 13 }

})