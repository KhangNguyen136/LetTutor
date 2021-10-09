import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { IconButton } from '../button';
import { Rating } from 'react-native-ratings';
import Card from '../card';

export default function ListTutor({ data }) {
    const item = ({ item }) => {
        icon = item.liked ? 'heart' : 'hearto'
        return (
            <TouchableOpacity style={{ marginHorizontal: 10 }} >
                <Card>
                    <View style={{ flexDirection: 'row' }} >
                        <Image source={require('../../../assets/botAvt.jpg')} style={styles.img}  ></Image>
                        <View style={{ flex: 1, margin: 5 }} >
                            <Text>{item.name}</Text>
                            <Rating readonly={true}
                                startingValue={item.rating}
                                style={{ marginVertical: 3, alignSelf: 'flex-start' }}
                                imageSize={20}
                            />
                            <Text>{item.tag[0]}</Text>
                        </View>
                        <IconButton iconName={icon} color={'pink'} source={'AntDesign'} />
                    </View>
                    <Text style={{ maxHeight: 60 }}>{item.intro}</Text>
                </Card>
            </TouchableOpacity>
        )
    }
    return (
        <FlatList
            data={dataTest}
            renderItem={item}
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
        name: 'John',
        rating: 4,
        tag: ['tag1', 'tag2'],
        intro: "Intro of John. I am an experienced English Teacher from Philippine. I would like share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy t focus on my learner's goal."
    },
    {
        name: 'Anna',
        rating: 3.5,
        tag: ['tag2'],
        intro: 'Intro of Anna'
    },
    {
        name: 'Kelvin',
        rating: 4.5,
        tag: ['tag1', 'tag3'],
        intro: 'Intro of Kelvin'
    },
    {
        name: 'Jack',
        rating: 3.3,
        tag: ['tag1', 'tag2', 'tag3'],
        intro: 'Intro of Jack'
    },
    {
        name: 'Jenny',
        rating: 4.4,
        tag: ['tag1', 'tag2'],
        intro: 'Intro of Jenny'
    },
    {
        name: 'Paul',
        rating: 4,
        tag: ['tag1', 'tag2'],
        intro: 'Intro of Paul'
    },
]