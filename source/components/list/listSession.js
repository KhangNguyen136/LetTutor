import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { GetIcon, MyButton } from '../button';
import { useNavigation } from '@react-navigation/core';
import { outputDate } from '../../styles/outputDate';
import Card from '../card';
import { Rating } from 'react-native-ratings';

export default function ListSession({ data, search }) {
    const navigation = useNavigation()
    const Session = ({ item }) => {
        const rated = item.rating != -1
        const feedback = () => {
            navigation.navigate('GiveFeedback', { data: item })

        }
        const seeTutorDetails = () => {
            navigation.navigate('TutorInfo')
        }
        return (
            <View style={{ marginHorizontal: 2 }}  >
                <Card>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Image source={require('../../../assets/botAvt.jpg')} style={styles.img}  ></Image>
                        <View style={{ flex: 1, margin: 5 }} >
                            <Text style={{ fontSize: 15, fontWeight: '500' }} >{item.name}</Text>
                            <View style={styles.rowItem} >
                                <GetIcon iconName={'calendar'} source={'AntDesign'} size={16} />
                                <Text style={{ marginLeft: 4 }} >{item.date.toString().substr(0, 24)}</Text>
                            </View>
                            <View style={styles.rowItem} >
                                <GetIcon iconName={'md-time-outline'} source={'Ionicons'} size={16} />
                                <Text style={{ marginLeft: 4 }} >{item.time}</Text>
                            </View>
                            {rated ?
                                (
                                    <Rating readonly={true}
                                        startingValue={item.rating}
                                        style={{ margin: 3, alignSelf: 'flex-start' }}
                                        imageSize={20}
                                    />
                                )
                                :
                                (<View style={styles.rowItem} >
                                    <GetIcon iconName={'staro'} source={'AntDesign'} size={16} />
                                    <Text style={{ marginLeft: 4 }} >Not feedback yet</Text>
                                </View>)
                            }
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }} >
                        <MyButton title={rated ? 'Edit feedback' : 'Give feedback'} onPress={feedback}
                            moreStyle={{ flex: 1, borderRadius: 0, margin: 0 }}
                            moreTitleStyle={{ color: 'black' }} />
                        <MyButton title={'See tutor details'} onPress={seeTutorDetails}
                            moreStyle={{ flex: 1, borderRadius: 0, backgroundColor: 'gray', margin: 0 }}
                            moreTitleStyle={{ color: 'white' }} />

                    </View>
                </Card >
            </View >
        )
    }
    const checkName = (item) => {
        return item.name.toLowerCase().includes(search.toLowerCase())
    }
    return (
        <FlatList
            data={dataTest.filter(checkName)}
            renderItem={Session}
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
        time: '11:22:33',
        rating: -1
    },
    {
        id: 1,
        name: 'Anna',
        date: new Date(),
        time: '11:22:33',
        rating: 4.5
    },
    {
        id: 2,
        name: 'Kelvin',
        date: new Date(),
        time: '11:22:33',
        rating: 4
    },
    {
        id: 3,
        name: 'Jack',
        date: new Date(),
        time: '11:22:33',
        rating: -1
    },
    {
        id: 4,
        name: 'Jenny',
        date: new Date(),
        time: '11:22:33',
        rating: 3.5
    },
    {
        id: 5,
        name: 'Paul',
        date: new Date(),
        time: '11:22:33',
        rating: -1
    },
    {
        id: 6,
        name: 'Julia',
        date: new Date(),
        time: '11:22:33',
        rating: 5
    },
    {
        id: 7,
        name: 'Ino',
        date: new Date(),
        time: '11:22:33',
        rating: 4
    },
    {
        id: 8,
        name: 'Roy',
        date: new Date(),
        time: '11:22:33',
        rating: -1
    },
    {
        id: 9,
        name: 'Yang',
        date: new Date(),
        time: '11:22:33',
        rating: -1
    },
]