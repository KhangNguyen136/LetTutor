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
import LoadMore from '../list/loadMoreButton';
import { getListTag, getLevelTitle } from '../../bussiness/course';
import { levelFilter } from '../../constant';
const defaultFilter = {
    level: 'Level',
    tag: 'Specialies',
    sort: 'Sort by'
}


export default function ListCourse({ searchKey = '', filter = defaultFilter }) {
    const token = useSelector(state => state.userInfoState.tokens.access.token);
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const navigation = useNavigation()
    React.useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(serverUrl + 'course', {
                params: {
                    page, size: 10
                },
                headers: { 'Authorization': 'Bearer ' + token }
            })
            const result = res.data.data.rows;
            setData(prs => prs.concat(result));
            setPage(page + 1);
        } catch (error) {
            console.log(error);
            errorHandle(error);
        }
        setLoading(false);
    }
    const filterItem = (item) => {
        if (!item.name.toLowerCase().includes(searchKey.toLocaleLowerCase()))
            return false
        if (filter.level != 'Level' && item.level != filter.level)
            return false
        if (filter.tag != 'Specialies')
            if (!item.tag.find((tag) => tag == filter.tag))
                return false
        return true

    }
    const sortBy = (arr) => {
        if (filter.sort == 'Sort by')
            return arr
        const n = arr.length
        const result = arr
        if (filter.sort == 'Level ascending') {
            for (let i = 0; i < n; i++)
                for (let j = i + 1; j < n; j++)
                    if (result[i].nLevel > result[j].nLevel) {
                        let temp = result[i]
                        result[i] = result[j]
                        result[j] = temp
                    }
            return result
        }
        for (let i = 0; i < n; i++)
            for (let j = i + 1; j < n; j++)
                if (result[i].nLevel < result[j].nLevel) {
                    let temp = result[i]
                    result[i] = result[j]
                    result[j] = temp
                }
        return result
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
    return (
        <FlatList
            data={data}
            renderItem={Course}
            keyExtractor={item => item.id.toString()}
            ListFooterComponent={() => <LoadMore onPress={getData} loading={loading} isEmpty={data.length == 0} />}
        />
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
