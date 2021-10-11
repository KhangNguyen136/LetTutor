import React from 'react';
import { Text, SafeAreaView, Image, ScrollView, View } from 'react-native';
import firebaseApp from '../../../firebase';
import { showMessage } from 'react-native-flash-message';
import { globalStyles } from '../../../styles/globalStyles';
import { MyButton } from '../../../components/button';
import Card from '../../../components/card';
import SettingBtn from '../../../components/settingBtn';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SettingScreen({ navigation }) {
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
                    <TouchableOpacity style={{ width: '96%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => navigation.navigate('UserInfo')} >
                        <Image style={{ width: 80, height: 80, borderRadius: 10 }} source={require('../../../../assets/botAvt.jpg')} />
                        <View style={{ alignContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, margin: 2 }} >Nguyen Tan Khang</Text>
                            <Text style={{ color: 'gray', fontSize: 13, margin: 2 }} >nguyentankhang136@gmail.com</Text>
                        </View>
                    </TouchableOpacity>
                </Card>

                <SettingBtn title={'View feedbacks'} iconName={'feedback'} iconSource={'MaterialIcons'} onPress={() => navigation.navigate('ViewFeedbacks')} />
                <SettingBtn title={'Booking history'} iconName={'bars'} iconSource={'AntDesign'} onPress={() => navigation.navigate('BookingHistory')} />
                <SettingBtn title={'Session history'} iconName={'history'} iconSource={'MaterialIcons'} onPress={() => navigation.navigate('SessionHistory')} />
                <SettingBtn title={'Advanced setting'} iconName={'setting'} iconSource={'AntDesign'} onPress={() => navigation.navigate('AdvancedSetting')} />

                <SettingBtn title={'Website'} iconName={'web'} iconSource={'MaterialCommunityIcons'} />

                <SettingBtn title={'Facebook'} iconName={'facebook-square'} iconSource={'FontAwesome'} />
                <MyButton title={'Log out'} onPress={() => logOut(showMessage)} moreStyle={globalStyles.authBtnContainer} moreTitleStyle={{ color: 'white' }} />
            </ScrollView>
        </SafeAreaView >
    )
}