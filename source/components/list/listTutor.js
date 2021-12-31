import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { IconButton } from '../button';
import { Rating } from 'react-native-ratings';
import ListTag from './listTag';
import { useNavigation } from '@react-navigation/core';
import Card from '../card';
import { getListLabel } from '../../bussiness/specialies';
import { serverUrl } from '../../const';
import axios from 'axios';
import errorHanle from '../../bussiness/errorHanle';
import { useSelector } from 'react-redux';

const defaultFilter = {
    rating: 'All',
    country: 'Country',
    tag: 'Specialies'
}

export default function ListTutor({ searchKey = '', filter = defaultFilter }) {

    const userInfo = useSelector(state => state.userInfoState);
    const [offset, setOffset] = React.useState(1)
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState([])
    const navigation = useNavigation()
    React.useEffect(
        () => {
            getData()
        },
        [])
    const getData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(serverUrl + 'tutor/more', {
                params: {
                    perPage: 2,
                    page: offset
                },
                headers: { 'Authorization': 'Bearer ' + userInfo.tokens.access.token }
            });
            const result = [...res.data.favoriteTutor, ...res.data.tutors.rows];
            setData(previousData => previousData.concat(result)
            )
            setOffset(offset + 1);
        } catch (error) {
            errorHanle(error);
        }
        setLoading(false)
    }
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
    const MyFooter = () => {
        return (
            //Footer View with Load More button
            <View style={styles.footer}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={getData}
                    //On Click of button load more data
                    style={styles.loadMoreBtn}>
                    <Text style={styles.btnText}>Load More</Text>
                    {loading ? (
                        <ActivityIndicator
                            color="white"
                            style={{ marginLeft: 8, height: 18 }} />
                    ) : null}
                </TouchableOpacity>
            </View>
        );
    };
    const Tutor = ({ item }) => {
        const listSpecialies = getListLabel(item.specialties.split(","));
        icon = item.liked ? 'heart' : 'hearto';
        function toDetail() {
            navigation.navigate('TutorInfo', { id: item.userId });
        }
        return (
            <View style={{ marginHorizontal: 1 }}   >
                <Card>
                    <View style={{ flexDirection: 'row' }} >
                        <TouchableOpacity onPress={toDetail} >
                            <Image source={{ uri: item.avatar }} style={styles.img}  ></Image>
                        </TouchableOpacity>
                        <View style={{ flex: 1, margin: 5 }} >
                            <Text style={{ fontWeight: 'bold' }} onPress={toDetail} >{item.name}</Text>
                            <Rating readonly={true}
                                startingValue={item.rating}
                                style={{ marginVertical: 3, alignSelf: 'flex-start' }}
                                imageSize={20}
                            />
                            <ListTag tags={listSpecialies} />
                        </View>
                        <IconButton iconName={icon} color={'pink'} source={'AntDesign'} />
                    </View>
                    <Text style={{ maxHeight: 60, fontSize: 13 }} onPress={toDetail} >{item.bio}</Text>
                </Card>
            </View>
        )
    }
    return (
        <FlatList
            data={data}
            renderItem={Tutor}
            keyExtractor={item => item.id.toString()}
            ListFooterComponent={MyFooter}
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
    },
    footer: {
        padding: 5,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 6,
        paddingHorizontal: 9,
        backgroundColor: '#0984e3',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
})

export const dataTestTutor = [
    {
        id: 0,
        name: 'John',
        rating: 4,
        tag: ['TOIEC', 'IELTS'],
        intro: "Intro of John. I am an experienced English Teacher from Philippine. I would like share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy t focus on my learner's goal.",
        country: 'Vietnam',
        liked: 1,
    },
    {
        id: 1,
        name: 'Anna',
        rating: 3.5,
        tag: ['English for kid', 'Conversational'],
        intro: "Intro of Anna. I am an experienced English Teacher from Philippine. I would like share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy t focus on my learner's goal.",
        country: 'USA',
        liked: 0,

    },
    {
        id: 2,
        name: 'Kelvin',
        rating: 4.5,
        tag: ['TOIEC', 'IELTS', 'English for business'],
        intro: "Intro of Kelvin. I am an experienced English Teacher from Philippine. I would like share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy t focus on my learner's goal.",
        country: 'China',
        liked: 0,

    },
    {
        id: 3,
        name: 'Jack',
        rating: 3.3,
        tag: ['English for business'],
        intro: "Intro of Jack. I am an experienced English Teacher from Philippine. I would like share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy t focus on my learner's goal.",
        country: 'Korea',
        liked: 1,

    },
    {
        id: 4,
        name: 'Jenny',
        rating: 4.4,
        tag: ['TOIEC', 'STARTER'],
        intro: "Intro of Jenny. I am an experienced English Teacher from Philippine. I would like share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy t focus on my learner's goal.",
        country: 'Japan',
        liked: 0,


    },
    {
        id: 5,
        name: 'Paul',
        rating: 4,
        tag: ['TOEFL', 'KET', 'PET'],
        intro: "Intro of Paul. I am an experienced English Teacher from Philippine. I would like share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy t focus on my learner's goal.",
        country: 'Russia',
        liked: 1,

    },
]