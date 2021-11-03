import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { IconButton } from '../button';
import { Rating } from 'react-native-ratings';
import ListTag from './listTag';
import { useNavigation } from '@react-navigation/core';
import Card from '../card';

const defaultFilter = {
    rating: 'All',
    country: 'Country',
    tag: 'Specialies'
}


export default function ListTutor({ data, searchKey = '', filter = defaultFilter }) {
    const navigation = useNavigation()
    const filterItem = (item) => {
        if (!item.name.toLowerCase().includes(searchKey.toLocaleLowerCase()))
            return false
        if (filter.country != 'Country' && item.country != filter.country)
            return false
        if (filter.tag != 'Specialies')
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
    const Tutor = ({ item }) => {
        // const [liked, setLiked] = React.useState(Math.random() > 0.5)
        icon = item.liked ? 'heart' : 'hearto'
        const toDetail = () => {
            navigation.navigate('TutorInfo')
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
                </Card>
            </TouchableOpacity>
        )
    }
    return (
        <FlatList
            data={dataTest.filter(filterItem)}
            renderItem={Tutor}
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
        rating: 4,
        tag: ['TOIEC', 'IELTS'],
        intro: "Intro of John. I am an experienced English Teacher from Philippine. I would like share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy t focus on my learner's goal.",
        country: 'Vietnam'
    },
    {
        id: 1,
        name: 'Anna',
        rating: 3.5,
        tag: ['English for kid', 'Conversational'],
        intro: "Intro of Anna. I am an experienced English Teacher from Philippine. I would like share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy t focus on my learner's goal.",
        country: 'USA'

    },
    {
        id: 2,
        name: 'Kelvin',
        rating: 4.5,
        tag: ['TOIEC', 'IELTS', 'English for business'],
        intro: "Intro of Kelvin. I am an experienced English Teacher from Philippine. I would like share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy t focus on my learner's goal.",
        country: 'China'

    },
    {
        id: 3,
        name: 'Jack',
        rating: 3.3,
        tag: ['English for business'],
        intro: "Intro of Jack. I am an experienced English Teacher from Philippine. I would like share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy t focus on my learner's goal.",
        country: 'Korea'

    },
    {
        id: 4,
        name: 'Jenny',
        rating: 4.4,
        tag: ['TOIEC', 'STARTER'],
        intro: "Intro of Jenny. I am an experienced English Teacher from Philippine. I would like share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy t focus on my learner's goal.",
        country: 'Japan'

    },
    {
        id: 5,
        name: 'Paul',
        rating: 4,
        tag: ['TOEFL', 'KET', 'PET'],
        intro: "Intro of Paul. I am an experienced English Teacher from Philippine. I would like share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy t focus on my learner's goal.",
        country: 'Russia'

    },
]