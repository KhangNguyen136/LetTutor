import { Video } from 'expo-av';
import React from 'react';
import { SafeAreaView, Text, View, ScrollView, StyleSheet, Button } from 'react-native';
import { MyButton } from '../../../components/button';
import Card from '../../../components/card';
import { globalStyles } from '../../../styles/globalStyles';
import { launchImageLibrary } from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';
import Step from '../../../components/stepProcess';

export default function BecomeTutor2({ navigation, route }) {
    const { data } = route.params;
    console.log(data.birthday)
    const [video, setVideo] = React.useState(null)
    const videoRef = React.useRef(null)

    const pickVideo = () => {
        launchImageLibrary(
            {
                mediaType: 'video',
                durationLimit: 360,

            }, Response => {
                if (Response.didCancel) {
                    return
                }
                // console.log(Response.errorMessage)
                else if (Response.errorCode) {
                    console.log(Response.errorMessage)
                    showMessage({
                        message: 'Action failed', description: Response.errorMessage, type: 'warning'
                    })
                }
                else {
                    setVideo(Response.assets[0])
                    // console.log(Response.assets[0])
                }

            }

        )

    }
    return (
        <SafeAreaView style={globalStyles.container} >
            <Step step={1} />
            <ScrollView>
                <Card>
                    <Text style={{
                        textAlign: 'center', fontSize: 18, color: '#0984e3',
                        fontWeight: '600', margin: 3
                    }} >Step 2: Introduce yourself</Text>
                    <Text>
                        Let students know what they can expect from a lesson with you by recording a video highlighting your teaching style, expertise and personality. Students can be nervous to speak with a foreigner, so it really helps to have a friendly video that introduces yourself and invites students to call you.
                    </Text>
                    <View style={globalStyles.verticalDivide} />
                    <Text style={globalStyles.guideLine} >
                        A few helpful tips:{'\n'}
                        1. Find a clean and quiet space{'\n'}
                        2. Smile and look at the camera{'\n'}
                        3. Dress smart{'\n'}
                        4. Speak for 1-3 minutes{'\n'}
                        5. Brand yourself and have fun!
                    </Text>
                    {
                        video != null &&
                        (<View>
                            <Video ref={videoRef}
                                style={{ width: '96%', height: 200, alignSelf: 'center', margin: 5 }}
                                source={{ uri: video.uri }}
                                useNativeControls
                                resizeMode={'contain'}
                                isLooping={false}
                            />
                        </View>)
                    }
                    <MyButton title={'Choose video'} onPress={pickVideo} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                        <MyButton title={'Previous'} moreStyle={{ backgroundColor: '#dfe6e9' }} onPress={() => navigation.goBack()} />
                        <MyButton title={'Done'} onPress={() => navigation.navigate('BecomeTutor3')} />
                    </View>
                </Card>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({

})