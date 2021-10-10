import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { IconButton } from '../button';
import { Rating } from 'react-native-ratings';
import ListTag from './listTag';
import Card from '../card';

export default function ListTutor({ data, searchKey = '' }) {
    const Tutor = ({ item }) => {
        icon = item.liked ? 'heart' : 'hearto'
        return (
            <TouchableOpacity style={{ marginHorizontal: 5 }} >
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
    const checkName = (tutor) => {
        return tutor.name.toLowerCase().includes(searchKey.toLowerCase())
    }
    return (
        <FlatList
            data={dataTest.filter(checkName)}
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
        tag: ['tag1', 'tag2'],
        intro: "Intro of John. I am an experienced English Teacher from Philippine. I would like share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy t focus on my learner's goal."
    },
    {
        id: 1,
        name: 'Anna',
        rating: 3.5,
        tag: ['tag2'],
        intro: "Intro of Anna. I am an experienced English Teacher from Philippine. I would like share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy t focus on my learner's goal."
    },
    {
        id: 2,
        name: 'Kelvin',
        rating: 4.5,
        tag: ['tag1', 'tag3'],
        intro: "Intro of Kelvin. I am an experienced English Teacher from Philippine. I would like share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy t focus on my learner's goal."
    },
    {
        id: 3,
        name: 'Jack',
        rating: 3.3,
        tag: ['tag1', 'tag2', 'tag3'],
        intro: "Intro of Jack. I am an experienced English Teacher from Philippine. I would like share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy t focus on my learner's goal."
    },
    {
        id: 4,
        name: 'Jenny',
        rating: 4.4,
        tag: ['tag1', 'tag2'],
        intro: "Intro of Jenny. I am an experienced English Teacher from Philippine. I would like share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy t focus on my learner's goal."
    },
    {
        id: 5,
        name: 'Paul',
        rating: 4,
        tag: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8'],
        intro: "Intro of Paul. I am an experienced English Teacher from Philippine. I would like share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy t focus on my learner's goal."
    },
]