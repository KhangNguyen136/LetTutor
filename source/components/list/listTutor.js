import React from 'react';
import { FlatList, View, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Tutor } from '../tutor';
import { useSelector } from 'react-redux';
import { handleListConst, handleListTutor } from '../../bussiness/tutorHandle';
import { getListTutor, getListPreTest, getListTopic, searchTutor } from '../../services/tutor';
import LoadingIndicator from '../loadingIndicator';
import Filter from '../filter';
import errorHandle from '../../bussiness/errorHanle';
import NoData from './noData';
import LoadMore from './loadMoreButton';
import { Searchbar } from 'react-native-paper';

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
    const [data, setData] = React.useState([]);
    const [searchKey, setSearchKey] = React.useState('');
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
    const filter = (item) => {
        return item.name.toLowerCase().includes(searchKey.toLowerCase());
    }
    const search = async (searchParam, topicParam, preTestParam, perPage = itemPerPage) => {
        setLoading(true);
        const params = {
            page: 1,
            perPage
        }
        const specialies = getSpecialies(topicParam, preTestParam);
        if (specialies.length != 0)
            params.filters = {
                specialties: specialies,
                date: new Date().toString()
            }
        if (searchParam != '')
            params.search = searchParam
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
        if (searchKey != '')
            params.search = searchKey
        console.log(params);
        return params;
    }

    const getData = async () => {
        setLoading(true);
        const res = await searchTutor(token, getParams());
        if (res.rows.length == 0) {
            setLoading(false);
            return;
        }
        const favour = await getListTutor(1, 1, token);
        // setFavourData(favour.favoriteTutor);
        const result = handleListTutor(res.rows, favour.favoriteTutor);
        setOffset(offset + 1);
        setData(prs => prs.concat(result))
        setLoading(false)
    }


    return (
        <View style={{ flex: 1 }} >
            <Searchbar placeholder="Search by tutor's name" value={searchKey} onChangeText={(value) => {
                if (value == '')
                    search('', topic, preTest)
                setSearchKey(value)
            }}
                onIconPress={() => search(searchKey, topic, preTest)} />
            <View style={{
                flexDirection: 'row', backgroundColor: 'white',
                marginTop: 5, paddingHorizontal: 5
            }} >
                <Filter data={listTopic} value={topic} title={'Select topic'} didSelect={(item) => {
                    setTopic(item);
                    search(searchKey, item, preTest);
                }} />
                <Filter data={listPreTest} value={preTest} title={'Select test'} didSelect={(item) => {
                    setPreTest(item);
                    search(searchKey, topic, item);
                }} />
            </View>
            <FlatList
                ref={listRef}
                data={data}
                renderItem={({ item }) => <Tutor item={item} token={token} navigation={navigation} />}
                keyExtractor={item => item.id.toString()}
                refreshing={false}
                onRefresh={getData}
                // onRefresh={() => search(topic, preTest, itemPerPage * (offset - 1))}
                ListEmptyComponent={() => <NoData loading={loading} />}
                ListFooterComponent={() => <LoadMore onPress={getData} loading={loading} isEmpty={data.length == 0} />}
            />
            {
                loading &&
                <LoadingIndicator />
            }
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
