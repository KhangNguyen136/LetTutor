import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { IconButton, MyButton } from '../button';
import { useNavigation } from '@react-navigation/core';
import { outputDate } from '../../styles/outputDate';
import Card from '../card';
import Tag from '../tag';

export default function ListUpcoming({ data }) {
    const navigation = useNavigation()
    const Upcoming = ({ item }) => {
        const toStudyRoom = () => {
            navigation.navigate('StudyRoom', {
                name: 'Juila'
            })
        }
        const cancel = () => {

        }
        return (
            <View style={{ marginHorizontal: 2 }}  >
                <Card>
                    <View style={{ flexDirection: 'row' }} >
                        <Image source={require('../../../assets/botAvt.jpg')} style={styles.img}  ></Image>
                        <View style={{ flex: 1, margin: 5 }} >
                            <Text style={{ fontSize: 15, fontWeight: '500' }} >{item.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <Text style={{ marginRight: 4 }} >{outputDate(item.date)}</Text>
                                <Tag item={item.startTime} />
                                <Text>-</Text>
                                <Tag item={item.endTime} />
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }} >
                        <MyButton title={'Cancel'} onPress={cancel}
                            moreStyle={{ flex: 1, borderRadius: 0, backgroundColor: 'gray', margin: 0, }}
                            moreTitleStyle={{ color: 'white' }} />
                        <MyButton title={'Go to meeting'} onPress={toStudyRoom}
                            moreStyle={{ flex: 1, borderRadius: 0, margin: 0 }}
                            moreTitleStyle={{ color: 'black' }} />
                    </View>
                </Card>
            </View>
        )
    }
    return (
        <FlatList
            data={dataTest}
            renderItem={Upcoming}
            keyExtractor={item => item.id.toString()}
        />
    )
}

const styles = StyleSheet.create({
    img: {
        width: 50,
        height: 50,
        borderRadius: 10,
        margin: 5
    },
})

const dataTest = [
    {
        id: 0,
        name: 'John',
        date: new Date(),
        startTime: '15:30',
        endTime: '16:00'
    },
    {
        id: 1,
        name: 'Anna',
        date: new Date(),
        startTime: '15:30',
        endTime: '16:00'
    },
    {
        id: 2,
        name: 'Kelvin',
        date: new Date(),
        startTime: '15:30',
        endTime: '16:00'
    },
    {
        id: 3,
        name: 'Jack',
        date: new Date(),
        startTime: '15:30',
        endTime: '16:00'
    },
    {
        id: 4,
        name: 'Jenny',
        date: new Date(),
        startTime: '15:30',
        endTime: '16:00'
    },
    {
        id: 5,
        name: 'Paul',
        date: new Date(),
        startTime: '15:30',
        endTime: '16:00'
    },
    {
        id: 6,
        name: 'Julia',
        date: new Date(),
        startTime: '15:30',
        endTime: '16:00'
    },
    {
        id: 7,
        name: 'Ino',
        date: new Date(),
        startTime: '15:30',
        endTime: '16:00'
    },
    {
        id: 8,
        name: 'Roy',
        date: new Date(),
        startTime: '15:30',
        endTime: '16:00'
    },
    {
        id: 9,
        name: 'Yang',
        date: new Date(),
        startTime: '15:30',
        endTime: '16:00'
    },
]