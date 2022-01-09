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
import { handleListTutor, updateFavorTutor } from '../../bussiness/tutorHandle';
import { getListTutor, favorAction } from '../../services/tutor';
import { DataTable } from 'react-native-paper';

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
    const [data, setData] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const navigation = useNavigation();
    const [itemPerPage, setItemPerPage] = React.useState(2);
    const maxPage = Math.ceil(count / itemPerPage);
    React.useEffect(
        () => {
            getData()
        },
        [offset, itemPerPage])
    const getData = async () => {
        setLoading(true);
        const res = await getListTutor(offset, itemPerPage, token);
        const result = handleListTutor(res);
        console.log(res);
        setCount(res.tutors.count);
        setData(result)
        setLoading(false)
    }

    const Tutor = ({ item }) => {
        const listSpecialies = getListLabel(item.specialties.split(","));
        icon = item.isFavor ? 'heart' : 'hearto';
        const pressLike = async () => {
            const res = await favorAction(item.userId, token);
            if (res)
                getData();
            // {
            //     console.log(res);
            //     setData(updateFavorTutor(data, item.userId))
            // }
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
        <View style={{ flex: 1 }} >
            <FlatList
                data={data}
                renderItem={Tutor}
                keyExtractor={item => item.id.toString()}
                refreshing={false}
                onRefresh={getData}
            />
            <DataTable.Pagination page={offset - 1}
                numberOfPages={maxPage}
                style={{ width: '100%', flexWrap: 'nowrap', backgroundColor: '#7ed6df' }}
                onPageChange={page => {
                    console.log(page);
                    if (page < 0 || page > maxPage - 1)
                        return
                    setOffset(page + 1)
                }}
                label={`${offset} of ${maxPage}`}
                showFastPaginationControls
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={itemPerPage}
                onItemsPerPageChange={setItemPerPage}
                selectPageDropdownLabel={'Tutor/page'}
            />
        </View>

    )
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
