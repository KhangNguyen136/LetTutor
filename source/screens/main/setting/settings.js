import React from 'react';
import { Text, SafeAreaView, Image, ScrollView, View } from 'react-native';
import firebaseApp from '../../../firebase';
import { showMessage } from 'react-native-flash-message';
import { globalStyles } from '../../../styles/globalStyles';
import { MyButton } from '../../../components/button';
import Card from '../../../components/card';
import SettingBtn from '../../../components/settingBtn';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';
import { GetIcon } from '../../../components/button';

export default function SettingScreen({ navigation, route }) {
    React.useEffect(() => {

    }, [])
    const logOut = (showMessage) => {
        firebaseApp.auth().signOut().then(() => {
            console.log("Logged out successfully")
            showMessage({
                message: "Logged out sucessfully",
                type: 'success'
            })

        }).catch((error) => {
            console.log('Log out failed', error.message)
            showMessage({
                message: 'Action failed',
                description: error.message,
                type: 'danger'
            })
        })
    }
    return (
        <SafeAreaView style={globalStyles.container} >
            <ScrollView>
                <Card>
                    <View>
                        <TouchableOpacity style={{ width: '96%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => navigation.navigate('UserInfo')} >
                            <Image style={{ width: 80, height: 80, borderRadius: 10 }} source={require('../../../../assets/botAvt.jpg')} />
                            <View style={{ alignContent: 'center' }}>
                                <Text style={{ fontWeight: '500', fontSize: 16, margin: 2 }} >Nguyen Tan Khang</Text>
                                <Text style={{ color: 'gray', fontSize: 13, margin: 2 }} >nguyentankhang136@gmail.com</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate('ChangePassword')} >
                            <Text style={{ color: '#3399ff', fontSize: 15 }} >Change password</Text>
                            <GetIcon iconName={'right'} source={'AntDesign'} size={14} color={'#3399ff'} />
                        </TouchableOpacity>
                    </View>
                </Card>
                {
                    true &&
                    (<SettingBtn title={'Become tutor'} iconName={'teach'} iconSource={'MaterialCommunityIcons'} onPress={() => navigation.navigate('BecomeTutor1')} />)

                }
                <SettingBtn title={'View feedbacks'} iconName={'feedback'} iconSource={'MaterialIcons'} onPress={() => navigation.navigate('ViewFeedback')} />
                <SettingBtn title={'Booking history'} iconName={'bars'} iconSource={'AntDesign'} onPress={() => navigation.navigate('BookingHistory')} />
                <SettingBtn title={'Session history'} iconName={'history'} iconSource={'MaterialIcons'} onPress={() => navigation.navigate('SessionHistory')} />
                <SettingBtn title={'Advanced setting'} iconName={'setting'} iconSource={'AntDesign'} onPress={() => navigation.navigate('AdvancedSetting')} />

                <SettingBtn title={'Website'} iconName={'web'} iconSource={'MaterialCommunityIcons'}
                    onPress={() => Linking.openURL('https://github.com/KhangNguyen136/LetTutor')} />

                <SettingBtn title={'Facebook'} iconName={'facebook-square'} iconSource={'FontAwesome'} onPress={() => Linking.openURL('https://www.facebook.com/nguyenkhang136/')} />
                <MyButton title={'Log out'} onPress={() => logOut(showMessage)} moreStyle={globalStyles.authBtnContainer} moreTitleStyle={{ color: 'white' }} />
            </ScrollView>
        </SafeAreaView >
    )
}