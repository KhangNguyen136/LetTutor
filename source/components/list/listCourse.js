import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { Rating } from 'react-native-ratings';
import ListTag from './listTag';
import { useNavigation } from '@react-navigation/core';
import Card from '../card';
import Tag from '../tag';
import { serverUrl } from '../../const';
import { useSelector } from 'react-redux';
import axios from 'axios';
import errorHandle from '../../bussiness/errorHanle';
import { Searchbar } from 'react-native-paper';
import Filter from '../filter';
import LoadMore from '../list/loadMoreButton';
import { getListCategory } from '../../services/ebook';
import { getListTag, getLevelTitle } from '../../bussiness/course';
import { levelFilter } from '../../constant';
import { getListCourse } from '../../services/course';
import NoData from './noData';
import LoadingIndicator from '../loadingIndicator';
const defaultFilter = {
    level: 'Level',
    tag: 'Specialies',
    sort: 'Sort by'
}

const itemPerPage = 13;

export default function ListCourse({ }) {
    const token = useSelector(state => state.userInfoState.tokens.access.token);
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [searchKey, setSearchKey] = React.useState('');
    const listRef = React.useRef();
    const [listTag, setListTag] = React.useState([]);
    const [tag, setTag] = React.useState(null);
    const [level, setLevel] = React.useState(null);
    const navigation = useNavigation()
    React.useEffect(() => {
        getData();
        getCategorys();
    }, [])
    const getCategorys = async () => {
        const res = await getListCategory(token);
        console.log(res.length)
        setListTag(res);
    }
    const getParams = (paramPage) => {
        const params = {
            page: paramPage, size: itemPerPage
        }
        if (searchKey != '')
            params.q = searchKey.toLowerCase();
        if (tag != null)
            params.categoryId = [tag.id]
        if (level != null)
            params.level = [level.id]
        return params;
    }

    const search = async (searchKey, tagParam, levelParam) => {
        setLoading(true)
        const params = {
            page: 1, size: itemPerPage
        }
        if (searchKey != '')
            params.q = searchKey.toLowerCase();
        if (tagParam != null)
            params.categoryId = [tagParam.id]
        if (levelParam != null)
            params.level = [levelParam.id];
        console.log(params);
        const res = await getListCourse(token, params);
        console.log(res.length)
        setData(res);
        setPage(2)
        listRef.current.scrollToOffset({ animated: true, offset: 0 })
        setLoading(false);
    }
    const getData = async () => {
        setLoading(true);
        const params = getParams(page)
        const res = await getListCourse(token, params);
        setData(prs => prs.concat(res));
        setPage(page + 1);
        setLoading(false);
    }

    const Course = ({ item }) => {

        const toDetail = () => {
            navigation.navigate('CourseDetail', { data: item })
        }
        return (
            <TouchableOpacity style={{ marginHorizontal: 1 }} onPress={toDetail} >
                <Card>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }} >
                        <Image source={{ uri: item.imageUrl }} style={styles.img}  ></Image>
                        <View style={{ flex: 1, margin: 5, justifyContent: 'space-between', alignItems: 'flex-start' }} >
                            <Text style={{ fontWeight: '500', fontSize: 18, margin: 3 }} >{item.name}</Text>
                            <ListTag tags={getListTag(item.categories)} />
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 3 }} >
                                <Text style={{ fontWeight: '600', margin: 0 }} > Level: </Text>
                                <Tag item={getLevelTitle(item.level)} />
                                <Text> - {item.topics.length} lesson </Text>
                            </View>
                            <Text style={{ maxHeight: 60, fontSize: 14, margin: 3 }}>{item.description}</Text>

                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        )
    }
    // if (loading)
    //     return <LoadingIndicator />
    return (
        <View style={{ flex: 1 }}>
            <Searchbar value={searchKey} onChangeText={(value) => {
                if (value == '')
                    search('', tag, level)
                setSearchKey(value)
            }}
                // inputStyle={{ textDecorationLine: 'underline' }}
                // style={{ borderBottomColor: 'gray', borderBottomWidth: 0.5 }} 
                onIconPress={() => search(searchKey, tag, level)} placeholder="Search by course's name" />

            <View style={{
                flexDirection: 'row', backgroundColor: 'white',
                marginTop: 5, paddingHorizontal: 5
            }} >
                <Filter data={listTag} value={tag} title={'Select category'} didSelect={(item) => {
                    console.log(item);
                    setTag(item);
                    search(searchKey, item, level);
                }} />
                <Filter data={levelFilter} value={level} title={'Select level'} didSelect={(item) => {
                    console.log(item)
                    setLevel(item);
                    search(searchKey, tag, item);
                }} />
            </View>
            <FlatList
                ref={listRef}
                data={data}
                renderItem={Course}
                ListEmptyComponent={NoData}
                keyExtractor={item => item.id.toString()}
                ListFooterComponent={() => <LoadMore onPress={getData} loading={loading} isEmpty={data.length == 0} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        width: 100,
        height: 100,
        borderRadius: 10,
        margin: 5
    },
    rating: {
        alignSelf: 'flex-start'
    }
})
