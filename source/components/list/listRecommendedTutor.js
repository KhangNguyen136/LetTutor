import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { IconButton } from '../button';
import { Rating } from 'react-native-ratings';
import ListTag from './listTag';
import { useNavigation } from '@react-navigation/core';
import Card from '../card';
import { useSelector } from 'react-redux';
import { getListLabel } from '../../bussiness/specialies';
import { FlagButton } from 'react-native-country-picker-modal';
import { handleListTutor } from '../../bussiness/tutorHandle';
import { favorAction, getListTutor } from '../../services/tutor';
// import { formatFavoriteTutor } from '../../bussiness/tutorHandle';

export default function ListRecommendedTutor() {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const navigation = useNavigation()
    const userInfo = useSelector(state => state.userInfoState);
    const token = userInfo.tokens.access.token;
    const getData = async () => {
        setLoading(true);
        try {
            const res = await getListTutor(1, 9, token);
            setData(handleListTutor(res));
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
        const pressLike = async () => {
            const res = await favorAction(item.userId, token);
            if (res)
                getData();
        }
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
                            <FlagButton {...{ countryCode: item.country, onOpen: toDetail }} withCountryNameButton />
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
                            <IconButton iconName={icon} color={'pink'} source={'AntDesign'} onPress={pressLike} />
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
