import React from 'react';
import { Text, SafeAreaView, Image, ScrollView, View } from 'react-native';
import firebaseApp from '../../../firebase';
import { showMessage } from 'react-native-flash-message';
import { globalStyles } from '../../../styles/globalStyles';
import { MyButton } from '../../../components/button';
import Card from '../../../components/card';
import OtherButton from '../../../components/otherButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';
import { GetIcon } from '../../../components/button';
import { loggedOut } from '../../../redux/authSlice';
import { useDispatch } from 'react-redux';
import RealmConfig from '../../../models';
import Realm from 'realm';

export default function OtherScreen({ navigation, route }) {
    const dispatch = useDispatch();
    React.useEffect(() => {

    }, [])
    const logOut = async () => {
        try {
            const realm = await Realm.open(RealmConfig);
            realm.write(() => {
                realm.deleteAll();
            })
            dispatch(loggedOut())
            showMessage({ type: 'success', message: 'Log out successful' });
            realm.close();
        } catch (error) {
            console.log(error)
            showMessage({ type: 'danger', message: 'Log out failed' });
        }
    }
    return (
        <SafeAreaView style={globalStyles.container} >
            <ScrollView>
                <Card>
                    <View  >
                        <TouchableOpacity style={{
                            width: '96%', alignSelf: 'center',
                            flexDirection: 'row', alignItems: 'center'
                        }}
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
                <OtherButton title={'Messages'} iconName={'message1'} iconSource={'AntDesign'} so onPress={() => navigation.navigate('Message')} color={'#E348A6'} />

                {
                    true &&
                    (<OtherButton title={'Become tutor'} iconName={'teach'} iconSource={'MaterialCommunityIcons'} onPress={() => navigation.navigate('BecomeTutor1')} color={'#0984e3'} />)

                }
                <OtherButton title={'View feedbacks'} iconName={'feedback'} iconSource={'MaterialIcons'} onPress={() => navigation.navigate('ViewFeedback')} color={'#e17055'} />
                <OtherButton title={'Booking history'} iconName={'bars'} iconSource={'AntDesign'} onPress={() => navigation.navigate('BookingHistory')} />
                <OtherButton title={'Session history'} iconName={'history'} iconSource={'MaterialIcons'} onPress={() => navigation.navigate('SessionHistory')} />
                <OtherButton title={'Ebook'} iconName={'book'} iconSource={'Entypo'} onPress={() => navigation.navigate('Ebook')} color={'#00b894'} />
                <OtherButton title={'Buy lesson'} iconName={'shop'} iconSource={'MaterialIcons'} onPress={() => navigation.navigate('BuyLesson')} color={'#0984e3'} />

                <OtherButton title={'Advanced setting'} iconName={'setting'} iconSource={'AntDesign'} onPress={() => navigation.navigate('AdvancedSetting')} color={'#2d3436'} />

                <OtherButton title={'Website'} iconName={'web'} iconSource={'MaterialCommunityIcons'} color={'#2F62E4'}
                    onPress={() => Linking.openURL('https://github.com/KhangNguyen136/LetTutor')} />

                <OtherButton title={'Facebook'} iconName={'facebook-square'} iconSource={'FontAwesome'} onPress={() => Linking.openURL('https://www.facebook.com/nguyenkhang136/')} color={'#0980EC'} />
                <MyButton title={'Log out'} onPress={logOut} moreStyle={globalStyles.authBtnContainer} moreTitleStyle={{ color: 'white' }} />
            </ScrollView>
        </SafeAreaView >
    )
}