import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image, Alert } from 'react-native';
import { IconButton, MyButton } from '../button';
import { useNavigation } from '@react-navigation/core';
import Card, { TextCard } from '../card';
import Tag from '../tag';
import { useSelector } from 'react-redux';
import { FlagButton } from 'react-native-country-picker-modal';
import LoadingIndicator from '../loadingIndicator';
import LoadMore from './loadMoreButton';
import MyViewMoreText from '../schedule/viewMoreText';
import { getUpcomingSchedule } from '../../bussiness/schedule';
import { cancelLesson } from '../../bussiness/booking';
import { checkAfter2h } from '../../bussiness/date';
import { showMessage } from 'react-native-flash-message';
import { globalStyles } from '../../styles/globalStyles';
export default function ListUpcoming({ }) {
    const userInfo = useSelector(state => state.userInfoState);
    const token = userInfo.tokens.access.token
    const navigation = useNavigation()
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [page, setPage] = React.useState(1);

    const getData = async () => {
        setLoading(true);
        const result = await getUpcomingSchedule(token, page);
        setData(prs => prs.concat(result));
        setPage(page + 1);
        setLoading(false);
    }
    React.useEffect(() => {
        getData();
    }, [])

    const Upcoming = ({ item }) => {
        const tutorInfo = item.scheduleDetailInfo.scheduleInfo.tutorInfo;
        const scheduleInfo = item.scheduleDetailInfo.scheduleInfo;
        const endTime = new Date(scheduleInfo.endTimestamp);
        const startTime = new Date(scheduleInfo.startTimestamp);
        // const date = new Date(scheduleInfo.date);
        const toStudyRoom = () => {
            navigation.navigate('StudyRoom', {
                name: 'Juila'
            })
        }
        const cancel = async () => {
            const id = [item.scheduleDetailInfo.id]
            const res = await cancelLesson(id, token);
            console.log(res);
        }
        const pressCancel = async () => {
            if (!checkAfter2h(startTime)) {
                showMessage({ type: 'warning', message: "Cann't cancel this lesson", description: "You can cancel the lessons start after 2 hours from now." })
                return;
            }
            Alert.alert('Are you sure to cancel this lesson?', 'This action cannot be undone and you will not be refunded.',
                [
                    {
                        text: 'Yes',
                        onPress: () => cancel(),
                        style: 'destructive'
                    },
                    {
                        text: 'No',
                        onPress: () => { },
                        style: 'cancel'
                    },
                ])



        }
        const editRequest = () => {
            navigation.push('EditRequest', { item, token })
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
                                <Text style={{ fontSize: 15, fontWeight: '500', marginEnd: 10 }} >{startTime.toUTCString().substring(0, 16)}</Text>
                                <Tag item={startTime.toString().substring(16, 21)} />
                                <Text>-</Text>
                                <Tag item={endTime.toString().substring(16, 21)} />
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5 }} >
                        <Text style={styles.imp}>Request: </Text>
                        <TouchableOpacity onPress={editRequest} ><Text style={{ ...styles.imp, color: '#3399ff' }}>Edit</Text></TouchableOpacity>
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
                        <MyButton title={'Cancel'} onPress={pressCancel}
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
                ListEmptyComponent={() => emptyComponent(() => navigation.navigate('Tutors'))}
                ListFooterComponent={() =>
                    <LoadMore onPress={getData} loading={loading} isEmpty={data.length == 0} />
                }
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
                <Text style={globalStyles.title2} >You have no upcoming lesson</Text>
                <Text style={globalStyles.title2}>Let choose a tutor and book</Text>
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
