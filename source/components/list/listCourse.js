import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { IconButton } from '../button';
import { Rating } from 'react-native-ratings';
import ListTag from './listTag';
import { useNavigation } from '@react-navigation/core';
import Card from '../card';
import Tag from '../tag';
import { globalStyles } from '../../styles/globalStyles';

const defaultFilter = {
    level: 'Level',
    tag: 'Specialies',
    sort: 'Sort by'
}


export default function ListCourse({ data, searchKey = '', filter = defaultFilter }) {
    const navigation = useNavigation()
    const filterItem = (item) => {
        if (!item.name.toLowerCase().includes(searchKey.toLocaleLowerCase()))
            return false
        if (filter.level != 'Level' && item.level != filter.level)
            return false
        if (filter.tag != 'Specialies')
            if (!item.tag.find((tag) => tag == filter.tag))
                return false
        return true

    }
    const sortBy = (arr) => {
        if (filter.sort == 'Sort by')
            return arr
        const n = arr.length
        const result = arr
        if (filter.sort == 'Level ascending') {
            for (let i = 0; i < n; i++)
                for (let j = i + 1; j < n; j++)
                    if (result[i].nLevel > result[j].nLevel) {
                        let temp = result[i]
                        result[i] = result[j]
                        result[j] = temp
                    }
            return result
        }
        for (let i = 0; i < n; i++)
            for (let j = i + 1; j < n; j++)
                if (result[i].nLevel < result[j].nLevel) {
                    let temp = result[i]
                    result[i] = result[j]
                    result[j] = temp
                }
        return result
    }
    const Courese = ({ item }) => {
        icon = item.liked ? 'heart' : 'hearto'
        const toDetail = () => {
            navigation.navigate('CourseDetail', { data: item })
        }
        return (
            <TouchableOpacity style={{ marginHorizontal: 1 }} onPress={toDetail} >
                <Card>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }} >
                        <Image source={{ uri: item.img }} style={styles.img}  ></Image>
                        <View style={{ flex: 1, margin: 5, justifyContent: 'flex-end' }} >
                            <Text style={{ fontWeight: '500', fontSize: 18 }} >{item.name}</Text>
                            <ListTag tags={item.tag} />
                            <Text style={{ maxHeight: 60, fontSize: 14, margin: 5 }}>{item.intro}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <Text style={globalStyles.title2} > Level: </Text>
                                <Tag item={item.level} />
                                <Text> - {item.nlesson} lessons </Text>

                            </View>
                        </View>
                        {/* <IconButton iconName={icon} color={'pink'} source={'AntDesign'} /> */}

                    </View>

                </Card>
            </TouchableOpacity>
        )
    }
    return (
        <FlatList
            data={sortBy(dataTest.filter(filterItem))}
            renderItem={Courese}
            keyExtractor={item => item.id.toString()}
        />
    )
}

const styles = StyleSheet.create({
    img: {
        width: 100,
        height: 100,
        borderRadius: 10,
        margin: 5
    },
    rating: {
        alignSelf: 'flex-start'
    }
})

const dataTest = [
    {
        id: 0,
        name: 'Course1',
        rating: 4.6,
        tag: ['TOIEC', 'IELTS'],
        intro: 'Intro for Course1 as sf sdf s df s df sdf s df s df sd fs df s df s as da sd as d as da sd a sd as d as da sd a sd as da sd a sd as da sd as da sd a sd as da sd as d a a sda sd ad fs df sd fs df s df sd fs df s df sdf d as da sd as da sd as da sd as d asd a sd as da sd a sd as d as d asd a sd as d as da sd a sd as da sd as da sd asd sd as da sd as d as da sd as d as d as da sd a sd as d asd a sd as d as da sd as da sd asd a sda ',
        level: 'Beginner',
        nLevel: 1,
        nlesson: 10,
        img: 'https://i.imgur.com/lIRSK8k.png',
    },
    {
        id: 1,
        name: 'Course2',
        rating: 4,
        tag: ['English for kid', 'Conversational'],
        intro: 'Intro for Course2',
        level: 'Beginner',
        nLevel: 1,
        nlesson: 10,
        img: 'https://i.imgur.com/1TWTEOf.png'
    },
    {
        id: 2,
        name: 'Course3',
        rating: 4.8,
        tag: ['TOIEC', 'IELTS', 'English for business'],
        intro: 'Intro for Course3',
        level: 'Advanced',
        nLevel: 3,

        nlesson: 10,
        img: 'https://i.imgur.com/W92wVE1.png'
    },
    {
        id: 3,
        name: 'Course4',
        rating: 3.5,
        tag: ['English for business'],
        intro: 'Intro for Course4',
        level: 'Intermediate',
        nLevel: 2,

        nlesson: 10,
        img: 'https://i.imgur.com/jF64GYu.png'
    },
    {
        id: 4,
        name: 'Course5',
        rating: 2.7,
        tag: ['TOIEC'],
        intro: 'Intro for Course5',
        level: 'Beginner',
        nLevel: 1,

        nlesson: 10,
        img: 'https://i.imgur.com/gzCQvGY.png'

    },
    {
        id: 5,
        name: 'Course6',
        rating: 1,
        tag: ['TOEFL', 'KET', 'PET'],
        intro: 'Intro for Course6',
        level: 'Intermediate',
        nLevel: 2,

        nlesson: 10,
        img: 'https://i.imgur.com/SMhjLTJ.jpg'
    },
    {
        id: 6,
        name: 'Course7',
        rating: 1.6,
        tag: ['STARTER', 'MOVERS'],
        intro: 'Intro for Course7',
        level: 'Beginner',
        nLevel: 1,

        nlesson: 10,
        img: 'https://i.imgur.com/7HMKp6z.jpg'
    },
    {
        id: 7,
        name: 'Course8',
        rating: 4.9,
        tag: ['MOVERS', 'FLYERS'],
        intro: 'Intro for Course8',
        level: 'Intermediate',
        nLevel: 2,

        nlesson: 10,
        img: 'https://i.imgur.com/rUTRERD.jpg'
    },
    {
        id: 8,
        name: 'Course9',
        rating: 2.9,
        tag: ['PET', 'KET'],
        intro: 'Intro for Course9',
        level: 'Advanced',
        nLevel: 3,
        nlesson: 10,
        img: 'https://i.imgur.com/2CUBZuo.jpg'
    },
]