import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { IconButton } from '../button';
import { Rating } from 'react-native-ratings';
import ListTag from './listTag';
import { useNavigation } from '@react-navigation/core';
import Card from '../card';
import Tag from '../tag';

const defaultFilter = {
    rating: 'All',
    level: 'All',
    tag: 'All'
}


export default function ListEbook({ data, searchKey = '', filter = defaultFilter }) {
    const navigation = useNavigation()
    console.log(filter)
    const filterItem = (item) => {
        if (!item.name.toLowerCase().includes(searchKey.toLocaleLowerCase()))
            return false
        if (filter.level != 'All' && item.level != filter.level)
            return false
        if (filter.tag != 'All')
            if (!item.tag.find((tag) => tag == filter.tag))
                return false
        if (filter.rating != 'All')
            switch (filter.rating) {
                case '5':
                    return item.rating <= 5 && item.rating > 4
                case '2':
                    return item.rating <= 2 && item.rating > 1
                case '3':
                    return item.rating <= 3 && item.rating > 2
                case '4':
                    return item.rating <= 4 && item.rating > 3
                default:
                    return item.rating <= 1
            }
        return true

    }
    const Ebook = ({ item }) => {
        icon = item.liked ? 'heart' : 'hearto'
        const toDetail = () => {
            navigation.navigate('EbookDetail')
        }
        return (
            <TouchableOpacity style={{ marginHorizontal: 1 }} onPress={toDetail} >
                <Card>
                    <View style={{ flexDirection: 'row' }} >
                        <Image source={require('../../../assets/botAvt.jpg')} style={styles.img}  ></Image>
                        <View style={{ flex: 1, margin: 5 }} >
                            <Text style={{ fontWeight: '500' }} >{item.name}</Text>
                            <Rating readonly={true}
                                startingValue={item.rating}
                                style={{ marginVertical: 3, alignSelf: 'flex-start' }}
                                imageSize={20}
                            />
                            <ListTag tags={item.tag} />
                        </View>
                        <IconButton iconName={icon} color={'pink'} source={'AntDesign'} />
                    </View>
                    <Text style={{ maxHeight: 60, fontSize: 13 }}>{item.intro}</Text>
                    <Tag item={item.level} />
                </Card>
            </TouchableOpacity>
        )
    }
    return (
        <FlatList
            data={dataTest.filter(filterItem)}
            renderItem={Ebook}
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
    }
})

const dataTest = [
    {
        id: 0,
        name: 'book1',
        rating: 4.6,
        tag: ['TOIEC', 'IELTS'],
        intro: 'Intro for book1',
        level: 'Beginner'
    },
    {
        id: 1,
        name: 'book2',
        rating: 4,
        tag: ['English for kid', 'Conversational'],
        intro: 'Intro for book2',
        level: 'Beginner'
    },
    {
        id: 2,
        name: 'book3',
        rating: 4.8,
        tag: ['TOIEC', 'IELTS', 'English for business'],
        intro: 'Intro for book3',
        level: 'Advanced'
    },
    {
        id: 3,
        name: 'book4',
        rating: 3.5,
        tag: ['English for business'],
        intro: 'Intro for book4',
        level: 'Intermediate'
    },
    {
        id: 4,
        name: 'book5',
        rating: 2.7,
        tag: ['TOIEC'],
        intro: 'Intro for book5',
        level: 'Beginner'

    },
    {
        id: 5,
        name: 'book6',
        rating: 1,
        tag: ['TOEFL', 'KET', 'PET'],
        intro: 'Intro for book6',
        level: 'Intermediate'
    },
    {
        id: 6,
        name: 'book7',
        rating: 1.6,
        tag: ['STARTER', 'MOVERS'],
        intro: 'Intro for book7',
        level: 'Beginner'

    },
    {
        id: 7,
        name: 'book8',
        rating: 4.9,
        tag: ['MOVERS', 'FLYERS'],
        intro: 'Intro for book8',
        level: 'Beginner'

    },
    {
        id: 8,
        name: 'book9',
        rating: 2.9,
        tag: ['PET', 'KET'],
        intro: 'Intro for book9',
        level: 'Advanced'

    },
]