import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image, Alert } from 'react-native';
import { MyIconButtonLeft, MyButton } from '../button';
import { useNavigation } from '@react-navigation/core';
import Card, { TextCard } from '../card';
import Tag from '../tag';
import { useSelector } from 'react-redux';
import { FlagButton } from 'react-native-country-picker-modal';
import LoadingIndicator from '../loadingIndicator';
import MyViewMoreText from '../schedule/viewMoreText';
import { getUpcomingSchedule } from '../../services/schedule';
import { cancelLesson } from '../../services/booking';
import { checkAfter2h } from '../../bussiness/date';
import { showMessage } from 'react-native-flash-message';
import { globalStyles } from '../../styles/globalStyles';
import { DataTable, Searchbar } from 'react-native-paper';
import EditRequestDialog from '../editRequestDialog';
export default function ListUpcoming({ route }) {
    const userInfo = useSelector(state => state.userInfoState);
    const token = userInfo.tokens.access.token
    const navigation = useNavigation()
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [count, setCount] = React.useState(0);
    const [itemPerPage, setItemPerPage] = React.useState(4);
    const [showEditRequest, setShowEditReqest] = React.useState(false);
    const [editRequestItem, setEditRequestItem] = React.useState({});
    const [searchKey, setSearchKey] = React.useState('');
    const maxPage = Math.ceil(count / itemPerPage);
    const getData = async () => {
        setLoading(true);
        const result = await getUpcomingSchedule(token, page, itemPerPage);
        setData(result.rows);
        setCount(result.count)
        setLoading(false);
    }
    React.useEffect(() => {
        getData();
    }, [page, itemPerPage])
    const editedRequest = () => {
        cancelEditRequest();
        getData();
    }
    const cancelEditRequest = () => {
        setShowEditReqest(false);
        setEditRequestItem({});
    }

    const filter = (item) => {
        const key = searchKey.toLowerCase()
        return item.studentRequest?.toLowerCase().includes(key) || item.scheduleDetailInfo.scheduleInfo.tutorInfo.name.toLowerCase().includes(key)
    }

    const Upcoming = ({ item }) => {
        const tutorInfo = item.scheduleDetailInfo.scheduleInfo.tutorInfo;
        const scheduleInfo = item.scheduleDetailInfo.scheduleInfo;
        const endTime = new Date(scheduleInfo.endTimestamp);
        const startTime = new Date(scheduleInfo.startTimestamp);
        // const date = new Date(scheduleInfo.date);
        const toStudyRoom = () => {
            navigation.navigate('StudyRoom', {
                data: item
            })
        }
        const cancel = async () => {
            const id = [item.scheduleDetailInfo.id]
            const res = await cancelLesson(id, token);
            if (res)
                getData();
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
            setShowEditReqest(true);
            setEditRequestItem(item);
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
                        <MyViewMoreText textStyle={item.studentRequest == null ? { color: 'gray' } : {}} content={item.studentRequest != null ? item.studentRequest : noRequest} numberOfLine={3} />
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
            <Searchbar placeholder="Search by tutor's name or request" value={searchKey} onChangeText={setSearchKey} />
            <EditRequestDialog
                item={editRequestItem} show={showEditRequest}
                token={token} cancel={cancelEditRequest} onSuccess={editedRequest} />
            <FlatList
                data={data.filter(filter)}
                renderItem={Upcoming}
                keyExtractor={item => item.id.toString()}
                refreshing={false}
                onRefresh={getData}
                ListEmptyComponent={() => emptyComponent(() => navigation.navigate('Tutors'), loading)}
            />
            <DataTable.Pagination page={page - 1}
                numberOfPages={maxPage}
                style={{ width: '100%', flexWrap: 'nowrap', backgroundColor: '#7ed6df' }}
                onPageChange={page => {
                    if (page < 0 || page > maxPage - 1)
                        return
                    setPage(page + 1)
                }}
                label={`${page} of ${maxPage}`}
                showFastPaginationControls
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={itemPerPage}
                onItemsPerPageChange={setItemPerPage}
                selectPageDropdownLabel={'item/page'}
            />
            {
                loading &&
                <LoadingIndicator />
            }
        </View>
    )
}

const numberOfItemsPerPageList = [2, 3, 4];


const emptyComponent = (toBook, loading) => {
    if (loading)
        return null
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
