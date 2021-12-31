import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { IconButton } from '../button';
import { Rating } from 'react-native-ratings';
import ListTag from './listTag';
import { useNavigation } from '@react-navigation/core';
import Card from '../card';
import { serverUrl } from '../../const';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { getListLabel } from '../../bussiness/specialies';

export default function ListRecommendedTutor() {
    const [data, setData] = React.useState([])
    const navigation = useNavigation()
    const userInfo = useSelector(state => state.userInfoState)
    const getData = async () => {
        try {
            const res = await axios.get(serverUrl + 'tutor/more', {
                params: {
                    perPage: 9,
                    page: 1
                },
                headers: { 'Authorization': 'Bearer ' + userInfo.tokens.access.token }
            });
            setData([...res.data.favoriteTutor, ...res.data.tutors.rows])
        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(() => {
        getData();
    }, [])
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

})
