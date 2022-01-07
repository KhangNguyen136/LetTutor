import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { IconButton, MyButton, MyIconButtonLeft } from '../button';
import { useNavigation } from '@react-navigation/core';
import Card, { TextCard } from '../card';
import Tag from '../tag';
import { useSelector } from 'react-redux';
import { FlagButton } from 'react-native-country-picker-modal';
import LoadingIndicator from '../loadingIndicator';
import LoadMore from './loadMoreButton';
import MyViewMoreText from '../schedule/viewMoreText';
import { getHistorySchedule } from '../../services/schedule';
import { globalStyles } from '../../styles/globalStyles';
export default function ListHistory({ }) {
    const userInfo = useSelector(state => state.userInfoState);
    const navigation = useNavigation()
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [page, setPage] = React.useState(1);

    const getData = async () => {
        setLoading(true);
        const result = await getHistorySchedule(userInfo.tokens.access.token, page);
        setData(prs => prs.concat(result));
        setPage(page + 1);
        setLoading(false);
    }
    React.useEffect(() => {
        getData();
    }, [])

    const History = ({ item }) => {
        const tutorInfo = item.scheduleDetailInfo.scheduleInfo.tutorInfo;
        const scheduleInfo = item.scheduleDetailInfo.scheduleInfo;
        const endTime = new Date(scheduleInfo.endTimestamp);
        const startTime = new Date(scheduleInfo.startTimestamp);

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
                                <Text style={{ fontSize: 15, fontWeight: '500', marginEnd: 10 }} >{startTime.toUTCString().substring(0, 16)}</Text>
                                <Tag item={startTime.toString().substring(16, 21)} />
                                <Text>-</Text>
                                <Tag item={endTime.toString().substring(16, 21)} />
                            </View>
                        </View>
                    </View>
                    <Text style={{ ...styles.imp, marginLeft: 5 }}>Request: </Text>
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
                    </View >
                    {
                        item.recordUrl != null ?
                            <MyIconButtonLeft iconName={'video'} iconSource={'Entypo'}
                                iconColor='black' title={'Lesson video'}
                                onPress={() => navigation.push('WatchVideo', { url: item.recordUrl })} />
                            : <Text style={{ ...styles.imp, margin: 5 }}>No lesson video</Text>
                    }
                </Card>
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                renderItem={History}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={() => emptyComponent(() => navigation.navigate('Tutors'))}
                ListFooterComponent={() => <LoadMore onPress={getData} loading={loading} isEmpty={data.length == 0} />}
            />
            {
                loading &&
                <LoadingIndicator />
            }
        </View>
    )
}

const emptyComponent = (toBook) => {
    return (
        <Card>
            <View style={{ alignItems: 'center' }} >
                <Text style={globalStyles.title2} >Your history is empty </Text>
                <Text style={globalStyles.title2}>Let choose a tutor to book lesson</Text>
                <MyButton title={'View tutors'} onPress={toBook} moreStyle={{ backgroundColor: '#3498db' }} moreTitleStyle={{ color: 'white' }} />
            </View>
        </Card>
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
