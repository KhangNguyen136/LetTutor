import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { IconButton } from '../button';
import ListTag from './listTag';
import Card from '../card';
import Tag from '../tag';
import LoadingIndicator from '../loadingIndicator';
import LoadMore from './loadMoreButton';
import * as Linking from 'expo-linking';
import { getListCategory, getListEbook } from '../../services/ebook';
import { useSelector } from 'react-redux';
import Filter from '../filter';
import { getLevelTitle } from '../../bussiness/course';
import { Searchbar } from 'react-native-paper';
import { levelFilter } from '../../constant';
const itemPerPage = 10;

export default function ListEbook() {
    const userInfo = useSelector(stt => stt.userInfoState);
    const token = userInfo.tokens.access.token;
    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const [dataSrc, setDataSrc] = React.useState([]);
    const [searchKey, setSearchKey] = React.useState('');
    const listRef = React.useRef();
    const [listTag, setListTag] = React.useState([]);
    const [tag, setTag] = React.useState(null);
    const [level, setLevel] = React.useState(null);
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
    const search = React.useCallback(async (searchKey, tagParam, levelParam) => {
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
        const res = await getListEbook(token, params);
        console.log(res.length)
        setDataSrc(res);
        setPage(2)
        listRef.current.scrollToOffset({ animated: true, offset: 0 })
        setLoading(false);
    }, [searchKey, tag, level])

    const getData = async () => {
        setLoading(true)
        const params = getParams(page);
        console.log(params);
        const res = await getListEbook(token, params);
        console.log(res.length)
        setDataSrc(pre => pre.concat(res));
        setPage(page + 1)
        setLoading(false);
    }

    const Ebook = ({ item }) => {
        const getListTag = () => {
            const result = []
            item.categories.forEach(category =>
                result.push(category.title))
            return result;
        }
        const toDetail = () => {
            // navigation.navigate('EbookDetail')
            Linking.openURL(item.fileUrl);
        }
        return (
            <TouchableOpacity style={{ marginHorizontal: 1 }} onPress={toDetail} >
                <Card>
                    <View style={{ flexDirection: 'row' }} >
                        <Image source={{ uri: item.imageUrl }} style={styles.img}  ></Image>
                        <View style={{ flex: 1, margin: 5 }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }} >{item.name}</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                                <Text style={styles.title}>Level: </Text>
                                <Tag item={getLevelTitle(item.level)} />
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                                <Text style={styles.title}>Category: </Text>
                                <ListTag tags={getListTag()} />
                            </View>
                        </View>
                    </View>
                    <Text style={{ maxHeight: 60, fontSize: 14, margin: 3 }}>{item.description}</Text>
                </Card>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ flex: 1 }} >
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
                    setTag(item);
                    search(searchKey, item, level);
                }} />
                <Filter data={levelFilter} value={level} title={'Select level'} didSelect={(item) => {
                    setLevel(item);
                    search(searchKey, tag, item);
                }} />
            </View>

            {loading && <LoadingIndicator />}
            <FlatList
                ref={listRef}
                data={dataSrc}
                renderItem={Ebook}
                keyExtractor={item => item.name}
                ListFooterComponent={() => <LoadMore onPress={getData} loading={loading} isEmpty={dataSrc.length == 0} />}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    img: {
        width: 120,
        height: 120,
        borderRadius: 10,
        margin: 5,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 15, fontWeight: '600'
    }
})
