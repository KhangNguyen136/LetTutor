import React from 'react';
import { Text, SafeAreaView, Image, ScrollView, View, TouchableOpacity } from 'react-native';
import { GetIcon } from '../../../components/button';
import Card from '../../../components/card';
import { Rating } from 'react-native-ratings';
import { globalStyles } from '../../../styles/globalStyles';
import countryFlag from '../../../styles/countryFlag';
import IconBtn from '../../../components/iconBtn';
import { Video } from 'expo-av';
import ListTag from '../../../components/list/listTag';
import TableBooking from '../../../components/tableBooking';
import { getListLabel } from '../../../bussiness/specialies'

export default function TutorInfo({ navigation, route }) {
    const [data, setData] = React.useState(route.params.data)
    const [liked, setLiked] = React.useState(false)
    const listSpecialies = getListLabel(data.specialties.split(","));
    const scrollViewRef = React.useRef(null)
    const videoRef = React.useRef(null)
    // React.useEffect(() => {
    //     const receivedData = route.params.data
    //     setData(receivedData)
    //     setLiked(receivedData.liked)
    // }, []
    // )
    const clickFavourite = () => {
        setLiked(!liked)
    }
    const scrollToBook = () =>
        scrollViewRef.current.scrollToEnd({ animated: true })

    return (
        <SafeAreaView style={globalStyles.container} >
            <ScrollView ref={scrollViewRef}>
                <Card>
                    <View style={{ ...globalStyles.rowContainer }} >
                        <Image style={globalStyles.avt} source={{ uri: data.avatar }} />
                        <View style={{ flex: 1 }} >
                            <Text style={globalStyles.titleName} >{data.name}</Text>
                            {
                                data.rating == -1 ?
                                    (<Text>No reviews yet</Text>) :
                                    (<Rating readonly={true} startingValue={data.rating}
                                        style={{ marginVertical: 3, alignSelf: 'flex-start' }}
                                        imageSize={16} />)
                            }
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <View style={globalStyles.rowContainer}>
                                    <Text style={{ fontWeight: '600' }}>Country: {data.country}</Text>
                                </View>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={scrollToBook} >
                                    <Text style={{ color: '#3399ff' }} >Book</Text>
                                    <GetIcon iconName={'down'} source={'AntDesign'} size={14} color={'#3399ff'} />
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>
                    <Text style={{ paddingHorizontal: 5 }} >{data.intro}</Text>
                    <Video ref={videoRef}
                        style={{ width: '96%', height: 200, alignSelf: 'center', margin: 5 }}
                        source={{ uri: data.video }}
                        useNativeControls
                        resizeMode={'contain'}
                        isLooping={false}
                    />
                </Card>
                <Card>
                    <View style={{ ...globalStyles.rowContainer, justifyContent: 'space-around' }}>
                        <IconBtn liked={liked} title={'Favourite'} onPress={clickFavourite} />
                        <IconBtn title={'Report'} onPress={() => navigation.navigate('Report', { tutor: data.name })} />
                        <IconBtn title={'Reviews'} onPress={() => navigation.navigate('Reviews', { tutor: data.name })} />
                    </View>
                </Card>
                <Card>
                    <View style={{ padding: 5 }} >
                        <Text style={{ ...globalStyles.titleName, marginBottom: 3 }} >Languages: </Text>
                        <ListTag tags={[data.languages]} />
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text style={{ ...globalStyles.titleName, marginBottom: 3 }} >Specialties: </Text>
                        <ListTag tags={listSpecialies} />
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text style={{ ...globalStyles.titleName, marginBottom: 3 }} >Teaching experienced: </Text>
                        <Text style={{ paddingHorizontal: 5 }} >{data.experience}</Text>
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text style={{ ...globalStyles.titleName, marginBottom: 3 }} >Interests: </Text>
                        <Text style={{ paddingHorizontal: 5 }} >{data.interests}</Text>
                    </View>
                </Card>

                <Card >
                    <Text
                        style={{ ...globalStyles.titleName, marginBottom: 3 }} > Booking: </Text>
                    <TableBooking tutor={dataTest} />
                </Card>
            </ScrollView>
        </SafeAreaView>
    )
}

const dataTest = {
    name: 'Quyen',
    rating: 4,
    country: 'Vietnam',
    languages: ['Vietnamese', 'English', 'Japanese'],
    specialties: ['English for bussiness', 'Conversation', 'TOIEC', 'IELTS', 'English for kids', 'Japanese for kids'],
}