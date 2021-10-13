import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { IconButton } from '../button';
import { outputDate } from '../../styles/outputDate';
import { useNavigation } from '@react-navigation/core';

export default function ListMessage({ data, searchKey = '' }) {
    const navigation = useNavigation()

    const Message = ({ item }) => {
        const toChatBox = () => {
            navigation.navigate('ChatBox', {
                name: 'Juila'
            })
        }
        return (
            <TouchableOpacity style={{ marginHorizontal: 2 }} onPress={toChatBox} >
                <View style={{ flexDirection: 'row' }} >
                    <Image source={require('../../../assets/botAvt.jpg')} style={styles.img}  ></Image>
                    <View style={{ flex: 1, margin: 5 }} >
                        <Text style={{ fontSize: 15 }} >{item.name}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                            <Text numberOfLines={2} style={{ flex: 1, color: 'gray' }} >{item.lastMsg}</Text>
                            <Text style={{ fontSize: 10, color: 'gray' }} >{outputDate(item.lastMsgTime)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    const checkName = (tutor) => {
        return tutor.name.toLowerCase().includes(searchKey.toLowerCase())
    }
    return (
        <FlatList
            data={dataTest.filter(checkName)}
            renderItem={Message}
            keyExtractor={item => item.id.toString()}
        />
    )
}

const styles = StyleSheet.create({
    img: {
        width: 60,
        height: 60,
        borderRadius: 10,
        margin: 5
    },
    rating: {
        alignSelf: 'flex-start'
        // width: 100,
        // height: 20
        // width: 50
    }
})

const dataTest = [
    {
        id: 0,
        name: 'John',
        lastMsg: "Alo can't you cancel upcoming lesson because i have a problem with my laptop.",
        lastMsgTime: new Date(),
        activeStt: true
    },
    {
        id: 1,
        name: 'Anna',
        lastMsg: "Alo can't you cancel upcoming lesson because i have a problem with my laptop.",
        lastMsgTime: new Date(),
        activeStt: true
    },
    {
        id: 2,
        name: 'Kelvin',
        lastMsg: "Alo can't you cancel upcoming lesson because i have a problem with my laptop.",
        lastMsgTime: new Date(),
        activeStt: true
    },
    {
        id: 3,
        name: 'Jack',
        lastMsg: "Alo can't you cancel upcoming lesson because i have a problem with my laptop.",
        lastMsgTime: new Date(),
        activeStt: true
    },
    {
        id: 4,
        name: 'Jenny',
        lastMsg: "Alo can't you cancel upcoming lesson because i have a problem with my laptop.",
        lastMsgTime: new Date(),
        activeStt: true
    },
    {
        id: 5,
        name: 'Paul',
        lastMsg: "Alo can't you cancel upcoming lesson because i have a problem with my laptop.",
        lastMsgTime: new Date(),
        activeStt: true
    },
    {
        id: 6,
        name: 'Julia',
        lastMsg: "Alo can't you cancel upcoming lesson because i have a problem with my laptop.",
        lastMsgTime: new Date(),
        activeStt: true
    },
    {
        id: 7,
        name: 'Ino',
        lastMsg: "Alo can't you cancel upcoming lesson because i have a problem with my laptop.",
        lastMsgTime: new Date(),
        activeStt: true
    },
    {
        id: 8,
        name: 'Roy',
        lastMsg: "Alo can't you cancel upcoming lesson because i have a problem with my laptop.",
        lastMsgTime: new Date(),
        activeStt: true
    },
    {
        id: 9,
        name: 'Yang',
        lastMsg: "Alo can't you cancel upcoming lesson because i have a problem with my laptop.",
        lastMsgTime: new Date(),
        activeStt: true
    },
]