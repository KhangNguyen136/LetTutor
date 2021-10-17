import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { GetIcon, MyButton } from '../button';
import { useNavigation } from '@react-navigation/core';
import { outputDate } from '../../styles/outputDate';
import Card from '../card';
import { Rating } from 'react-native-ratings';

export default function ListFeedback({ data, search, filter = 'All' }) {
    const filterData = (item) => {
        if (filter == 'All')
            return true
        return item.rating == filter
    }
    const navigation = useNavigation()
    const Feedback = ({ item }) => {
        return (
            <View style={{ marginHorizontal: 2 }}  >
                <Card>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Image source={require('../../../assets/botAvt.jpg')} style={styles.img}  ></Image>
                        <View style={{ flex: 1, margin: 5 }} >
                            <Text style={{ fontSize: 15, fontWeight: '500' }} >{item.name}</Text>
                            <Text style={{ marginLeft: 4 }} >{item.date.toString().substr(0, 24)}</Text>
                            <Rating readonly={true}
                                startingValue={item.rating}
                                style={{ margin: 3, alignSelf: 'flex-start' }}
                                imageSize={20}
                            />
                        </View>
                    </View>
                    <Card>
                        <Text style={{ fontSize: 15 }} numberOfLines={3} >{item.comment}</Text>
                    </Card>
                </Card >
            </View >
        )
    }
    return (
        <FlatList
            data={dataTest.filter(filterData)}
            renderItem={Feedback}
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
    rowItem:
    {
        flexDirection: 'row', alignItems: 'center',
        margin: 3
    }

})

const dataTest = [
    {
        id: 0,
        name: 'John',
        date: new Date(),
        rating: 4,
        comment: 'Thank you for booking my class. I hope to see you again soon. Keep learning and improve yourself everyday, you will get what you want.Thank you for booking my class. I hope to see you again soon. Keep learning and improve yourself everyday, you will get what you want.Thank you for booking my class. I hope to see you again soon. Keep learning and improve yourself everyday, you will get what you want.'
    },
    {
        id: 1,
        name: 'Anna',
        date: new Date(),
        rating: 5,
        comment: 'Thank you for booking my class. I hope to see you again soon. Keep learning and improve yourself everyday, you will get what you want.'
    },
    {
        id: 2,
        name: 'Kelvin',
        date: new Date(),
        rating: 3,
        comment: 'Thank you for booking my class. I hope to see you again soon. Keep learning and improve yourself everyday, you will get what you want.'
    },
    {
        id: 3,
        name: 'Jack',
        date: new Date(),
        rating: 4,
        comment: 'Thank you for booking my class. I hope to see you again soon. Keep learning and improve yourself everyday, you will get what you want.'
    },
    {
        id: 4,
        name: 'Jenny',
        date: new Date(),
        rating: 5,
        comment: 'Thank you for booking my class. I hope to see you again soon. Keep learning and improve yourself everyday, you will get what you want.'
    },
    {
        id: 5,
        name: 'Paul',
        date: new Date(),
        rating: 3,
        comment: 'Thank you for booking my class. I hope to see you again soon. Keep learning and improve yourself everyday, you will get what you want.'
    },
    {
        id: 6,
        name: 'Julia',
        date: new Date(),
        rating: 5,
        comment: 'Thank you for booking my class. I hope to see you again soon. Keep learning and improve yourself everyday, you will get what you want.'
    },
    {
        id: 7,
        name: 'Ino',
        date: new Date(),
        rating: 4,
        comment: 'Thank you for booking my class. I hope to see you again soon. Keep learning and improve yourself everyday, you will get what you want.'
    },
    {
        id: 8,
        name: 'Roy',
        date: new Date(),
        rating: 3,
        comment: 'Thank you for booking my class. I hope to see you again soon. Keep learning and improve yourself everyday, you will get what you want.'
    },
    {
        id: 9,
        name: 'Yang',
        date: new Date(),
        rating: 5,
        comment: 'Thank you for booking my class. I hope to see you again soon. Keep learning and improve yourself everyday, you will get what you want.'
    },
]