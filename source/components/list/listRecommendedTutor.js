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
import { FlagButton } from 'react-native-country-picker-modal';
import { handleListTutor, favorAction, updateFavorTutor } from '../../bussiness/tutorHandle';
import { globalStyles } from '../../styles/globalStyles';
// import { formatFavoriteTutor } from '../../bussiness/tutorHandle';

export default function ListRecommendedTutor() {
    const [data, setData] = React.useState([]);
    const [change, setChange] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const navigation = useNavigation()
    const userInfo = useSelector(state => state.userInfoState);
    const token = userInfo.tokens.access.token;
    const getData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(serverUrl + 'tutor/more', {
                params: {
                    perPage: 9,
                    page: 1
                },
                headers: { 'Authorization': 'Bearer ' + token }
            });
            setData(handleListTutor(res.data));
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }
    // const reload
    React.useEffect(() => {
        getData();
    }, [])
    const Tutor = ({ item }) => {
        // console.log(item.userId);
        const listSpecialies = getListLabel(item.specialties.split(","));
        icon = item.isFavor ? 'heart' : 'hearto';
        const pressLike = () => {
            favorAction(item.userId, token);
            getData();
        }
        function toDetail() {
            navigation.navigate('TutorInfo', { id: item.userId });
        }
        return (
            <View style={{ marginHorizontal: 1 }}   >
                <Card>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <TouchableOpacity onPress={toDetail} >
                            <Image source={{ uri: item.avatar }} style={styles.img}  ></Image>
                        </TouchableOpacity>
                        <View style={{ flex: 1, margin: 5 }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }} onPress={toDetail} >{item.name}</Text>
                            <FlagButton {...{ countryCode: item.country }} onOpen={toDetail} withCountryNameButton />
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
                        <IconButton iconName={icon} color={'pink'} source={'AntDesign'} onPress={pressLike} />
                    </View>
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
            // refreshControl={getData}
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
