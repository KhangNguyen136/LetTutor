import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { IconButton } from '../button';
import { Rating } from 'react-native-ratings';
import ListTag from './listTag';
import { useNavigation } from '@react-navigation/core';
import Card from '../card';
import { getListLabel } from '../../bussiness/specialies';
import { useSelector } from 'react-redux';
import { FlagButton } from 'react-native-country-picker-modal';
import { handleListConst, handleListTutor, updateFavorTutor } from '../../bussiness/tutorHandle';
import { getListTutor, favorAction, getListPreTest, getListTopic, searchTutor, getFavourData } from '../../services/tutor';
import { DataTable, Searchbar } from 'react-native-paper';
import LoadingIndicator from '../loadingIndicator';
import Filter from '../filter';
import errorHandle from '../../bussiness/errorHanle';
import NoData from './noData';
import LoadMore from './loadMoreButton';

const itemPerPage = 2;
export default function ListTutor({ }) {
    const userInfo = useSelector(state => state.userInfoState);
    const token = userInfo.tokens.access.token;
    const [offset, setOffset] = React.useState(1)
    const [loading, setLoading] = React.useState(true);
    const [topic, setTopic] = React.useState(null);
    const [listTopic, setListTopic] = React.useState([])
    const [preTest, setPreTest] = React.useState(null);
    const [listPreTest, setListPreTest] = React.useState([])
    const [favourData, setFavourData] = React.useState([])
    const [data, setData] = React.useState([]);
    const listRef = React.useRef(null);
    const navigation = useNavigation();
    React.useEffect(
        () => {
            getData();
            getConst();
        },
        [])
    const getConst = async () => {
        Promise.all([getListTopic(token), getListPreTest(token)]).then(
            (result) => {
                setListTopic(handleListConst(result[0].data));
                setListPreTest(handleListConst(result[1].data));
            }
        ).catch(error => errorHandle(error));
    }

    const search = async (topicParam, preTestParam) => {
        setLoading(true);
        const params = {
            page: 1,
            perPage: itemPerPage
        }
        const specialies = getSpecialies(topicParam, preTestParam);
        if (specialies.length != 0)
            params.filters = {
                specialties: specialies,
                date: new Date().toString()
            }
        console.log(params);
        const favour = await getListTutor(1, 1, token);
        const res = await searchTutor(token, params);
        setData(handleListTutor(res.rows, favour.favoriteTutor));
        setOffset(2);
        listRef.current.scrollToOffset({ animated: true, offset: 0 });
        setLoading(false);
    }

    const getParams = () => {
        const params = {
            page: offset,
            perPage: itemPerPage
        }
        const specialies = getSpecialies(topic, preTest);
        if (specialies.length != 0)
            params.filters = {
                specialties: specialies,
                date: new Date().toString()
            }
        console.log(params);
        return params;
    }

    const getData = async () => {
        setLoading(true);
        const favour = await getListTutor(1, 1, token);
        setFavourData(favour.favoriteTutor);
        const res = await searchTutor(token, getParams());
        const result = handleListTutor(res.rows, favour.favoriteTutor);
        setOffset(offset + 1);
        setData(prs => prs.concat(result))
        setLoading(false)
    }


    return (
        <View style={{ flex: 1 }} >
            {
                loading &&
                <LoadingIndicator />
            }
            <View style={{
                flexDirection: 'row', backgroundColor: 'white',
                marginTop: 5, paddingHorizontal: 5
            }} >
                <Filter data={listTopic} value={topic} title={'Select topic'} didSelect={(item) => {
                    setTopic(item);
                    search(item, preTest);
                }} />
                <Filter data={listPreTest} value={preTest} title={'Select test'} didSelect={(item) => {
                    setPreTest(item);
                    search(topic, item);
                }} />
            </View>
            <FlatList
                ref={listRef}
                data={data}
                renderItem={({ item }) => <Tutor item={item} token={token} navigation={navigation} />}
                keyExtractor={item => item.id.toString()}
                refreshing={false}
                onRefresh={getData}
                ListEmptyComponent={NoData}
                ListFooterComponent={() => <LoadMore onPress={getData} loading={loading} isEmpty={data.length == 0} />}
            />

        </View>

    )
}

export function Tutor({ item, navigation, token }) {
    const [isFavour, setIsFavour] = React.useState(item.isFavor)
    const listSpecialies = getListLabel(item.specialties.split(","));
    const icon = isFavour ? 'heart' : 'hearto';
    const pressLike = async () => {
        const res = await favorAction(item.userId, token);
        if (res)
            setIsFavour(!isFavour)
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

const getSpecialies = (topic, preTest) => {
    const result = [];
    if (topic != null)
        result.push(topic.key);
    if (preTest != null)
        result.push(preTest.key);
    return result;
}

const numberOfItemsPerPageList = [2, 3, 4];

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
