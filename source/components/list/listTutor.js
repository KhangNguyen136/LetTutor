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
import LoadMore from './loadMoreButton';
import { FlagButton } from 'react-native-country-picker-modal';
import { handleListTutor, favorAction } from '../../bussiness/tutorHandle';

const defaultFilter = {
    rating: 'All',
    country: 'Country',
    tag: 'Specialies'
}

export default function ListTutor({ searchKey = '', filter = defaultFilter }) {
    const userInfo = useSelector(state => state.userInfoState);
    const token = userInfo.tokens.access.token;
    const [offset, setOffset] = React.useState(1)
    const [loading, setLoading] = React.useState(true);
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
                headers: { 'Authorization': 'Bearer ' + token }
            });
            // const result = [...res.data.favoriteTutor, ...res.data.tutors.rows];
            const result = handleListTutor(res.data);
            setData(previousData => previousData.concat(result))
            setOffset(offset + 1);
        } catch (error) {
            errorHanle(error);
        }
        setLoading(false)
    }

    const Tutor = ({ item }) => {
        // console.log(item.userId);
        const listSpecialies = getListLabel(item.specialties.split(","));
        icon = item.isFavor ? 'heart' : 'hearto';
        // const pressLike = () => {
        //     favorAction(item.userId, token);
        //     getData();
        // }
        function toDetail() {
            navigation.navigate('TutorInfo', { id: item.userId });
        }
        return (
            <View style={{ marginHorizontal: 1 }}   >
                <Card>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={toDetail} >
                        <Image source={{ uri: item.avatar }} style={styles.img}  ></Image>
                        <View style={{ flex: 1, margin: 5, justifyContent: 'space-between' }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}  >{item.name}</Text>
                            <FlagButton {...{ countryCode: item.country }} withCountryNameButton />
                            {item.rating != undefined ?
                                <Rating readonly={true}
                                    startingValue={item.rating}
                                    style={{ marginVertical: 3, alignSelf: 'flex-start' }}
                                    imageSize={20}
                                />
                                :
                                <Text style={{ fontWeight: '600', fontSize: 14 }} >No review yet</Text>
                            }
                        </View>
                        <View style={{ justifyContent: 'flex-start' }}>
                            <IconButton iconName={icon} color={'pink'} source={'AntDesign'} />

                        </View>
                    </TouchableOpacity>
                    <ListTag tags={listSpecialies} />
                    <Text style={{ maxHeight: 60, fontSize: 13, margin: 5 }} onPress={toDetail} >{item.bio}</Text>
                </Card>
            </View>
        )
    }
    return (
        <FlatList
            data={data}
            renderItem={Tutor}
            keyExtractor={item => item.id.toString()}
            ListFooterComponent={() => <LoadMore onPress={getData} loading={loading} isEmpty={data.length == 0}
            />}
            refreshing={false}
            onRefresh={getData}
        />
    )
}

const styles = StyleSheet.create({
    img: {
        width: 80,
        height: 80,
        borderRadius: 10,
        margin: 5
    },
    rating: {
        alignSelf: 'flex-start'
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