import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { IconButton, MyButton } from '../button';
import { useNavigation } from '@react-navigation/core';
import Card, { TextCard } from '../card';
import Tag from '../tag';
import { serverUrl } from '../../const';
import axios from 'axios';
import { useSelector } from 'react-redux';
import errorHandle from '../../bussiness/errorHanle';
import { Chip } from 'react-native-paper';
import { FlagButton } from 'react-native-country-picker-modal';
import LoadingIndicator from '../loadingIndicator';
import LoadMore from './loadMoreButton';
import MyViewMoreText from '../schedule/viewMoreText';
export default function ListUpcoming({ }) {
    const userInfo = useSelector(state => state.userInfoState);
    const navigation = useNavigation()
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const today = new Date()
    const paramDate = new Date(today.setMinutes(today.getMinutes() - 5));
    const getData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(serverUrl + 'booking/list/student', {
                params: {
                    page, perPage: 20,
                    dateTimeGte: paramDate.getTime(),
                    orderBy: 'meeting',
                    sortBy: 'asc'
                },
                headers: { 'Authorization': 'Bearer ' + userInfo.tokens.access.token }
            })
            console.log(res.data.data.count);
            setPage(page + 1);
            setData(prs => prs.concat(res.data.data.rows));
        } catch (error) {
            errorHandle(error);
        }
        setLoading(false);
    }
    React.useEffect(() => {
        getData();
    }, [])

    const Upcoming = ({ item }) => {
        const tutorInfo = item.scheduleDetailInfo.scheduleInfo.tutorInfo;
        const scheduleInfo = item.scheduleDetailInfo.scheduleInfo;
        const date = new Date(scheduleInfo.date);
        const toStudyRoom = () => {
            navigation.navigate('StudyRoom', {
                name: 'Juila'
            })
        }
        const cancel = () => {

        }
        return (
            <View style={{ marginHorizontal: 2 }}  >
                <Card>
                    <View style={{ flexDirection: 'row' }} >
                        <Image source={{ uri: tutorInfo.avatar }} style={styles.img}  ></Image>
                        <View style={{ flex: 1, margin: 5 }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <Text style={{ fontSize: 16, fontWeight: 'bold', }} >{tutorInfo.name}</Text>
                                <FlagButton {...{ countryCode: tutorInfo.country, containerButtonStyle: styles.countryContainer }} withCountryNameButton />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <Text style={{ fontSize: 15, fontWeight: '500', marginEnd: 10 }} >{date.toUTCString().substring(0, 16)}</Text>
                                <Tag item={scheduleInfo.startTime} />
                                <Text>-</Text>
                                <Tag item={scheduleInfo.endTime} />
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5 }} >
                        <Text style={styles.imp}>Request: </Text>
                        <TouchableOpacity ><Text style={{ ...styles.imp, color: '#3399ff' }}>Edit</Text></TouchableOpacity>
                    </View>
                    <TextCard>
                        <MyViewMoreText content={item.studentRequest != null ? item.studentRequest : noRequest} numberOfLine={3} />
                    </TextCard>
                    <View style={{ marginHorizontal: 5 }} >
                        {item.tutorReview != null ?
                            <View>
                                <Text style={styles.imp}>Review</Text>
                                <TextCard>
                                    <MyViewMoreText content={item.tutorReview} numberOfLine={3} />
                                </TextCard>
                            </View>
                            : <Text style={styles.imp}>No review yet</Text>
                        }
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 5 }} >
                        <MyButton title={'Cancel'} onPress={cancel}
                            moreStyle={{ flex: 1, borderRadius: 0, backgroundColor: 'gray', margin: 0, }}
                            moreTitleStyle={{ color: 'white' }} />
                        <MyButton title={'Go to meeting'} onPress={toStudyRoom}
                            moreStyle={{ flex: 1, borderRadius: 0, margin: 0 }}
                            moreTitleStyle={{ color: 'black' }} />
                    </View>
                </Card>
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                renderItem={Upcoming}
                keyExtractor={item => item.id.toString()}
                ListFooterComponent={() => <LoadMore onPress={getData} loading={loading} />}
            />
            {
                loading &&
                <LoadingIndicator />
            }
        </View>
    )
}

const noRequest = 'Currently there are no requests for this class. Please write down any requests for the teacher.';

const styles = StyleSheet.create({
    img: {
        width: 60,
        height: 60,
        // resizeMode: 'contant',
        borderRadius: 10,
        margin: 5
    },
    countryContainer: {
        borderColor: 'gray',
        borderWidth: 0.5, borderRadius: 8,
        margin: 4, padding: 0, paddingHorizontal: 5
    },
    imp: {
        fontSize: 16, fontWeight: '600'
    }
})
