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

export default function TutorInfo({ navigation }) {
    const [data, setData] = React.useState(dataTest)
    const scrollViewRef = React.useRef(null)
    const videoRef = React.useRef(null)
    React.useEffect(() => {
    }
    )
    const scrollToBook = () =>
        scrollViewRef.current.scrollToEnd({ animated: true })

    return (
        <SafeAreaView style={globalStyles.container} >
            <ScrollView ref={scrollViewRef}>
                <Card>
                    <View style={{ ...globalStyles.rowContainer }} >
                        <Image style={globalStyles.avt} source={require('../../../../assets/botAvt.jpg')} />
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
                                    <Image source={countryFlag.Vietnam} style={{ width: 35, height: 20, marginRight: 3 }} />
                                    <Text>{data.country}</Text>
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
                        source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                        useNativeControls
                        resizeMode={'contain'}
                        isLooping={false}
                    />
                </Card>
                <Card>
                    <View style={{ ...globalStyles.rowContainer, justifyContent: 'space-around' }}>
                        <IconBtn title={'Message'} onPress={() => navigation.navigate('ChatBox', { tutor: data.name })} />
                        <IconBtn title={'Favorite'} onPress={() => console.log('Click favorite')} />
                        <IconBtn title={'Report'} onPress={() => navigation.navigate('Report', { tutor: data.name })} />
                        <IconBtn title={'Reviews'} onPress={() => navigation.navigate('Reviews', { tutor: data.name })} />
                    </View>
                </Card>
                <Card>
                    <View style={{ padding: 5 }} >
                        <Text style={{ ...globalStyles.titleName, marginBottom: 3 }} >Languages: </Text>
                        <ListTag tags={data.languages} />
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text style={{ ...globalStyles.titleName, marginBottom: 3 }} >Specialties: </Text>
                        <ListTag tags={data.specialties} />
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text style={{ ...globalStyles.titleName, marginBottom: 3 }} >Teaching experienced: </Text>
                        <Text style={{ paddingHorizontal: 5 }} >{data.teachingExperience}</Text>
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
    intro: "I am an experienced English Teacher from Vietnam. I would like share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy t focus on my learner's goal.",
    languages: ['Vietnamese', 'English', 'Japanese'],
    specialties: ['English for bussiness', 'Conversation', 'TOIEC', 'IELTS', 'English for kids', 'Japanese for kids'],
    interests: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    teachingExperience: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."


}