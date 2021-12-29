import React from 'react';
import { SafeAreaView, Image, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { GetIcon, MyButton, MyIconButtonRight } from '../../../components/button';
import Card, { FlexCard } from '../../../components/card';
import CountryPicker from '../../../components/countryPicker';
import MyDatePicker from '../../../components/datePicker';
import TextInputCard from '../../../components/TextInputCard';
import { globalStyles } from '../../../styles/globalStyles';
import { launchImageLibrary } from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';
import { serverUrl } from '../../../const';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfoAction } from '../../../redux/userInfoSlice';
import LoadingIndicator from '../../../components/loadingIndicator';
import errorHandle from '../../../bussiness/errorHanle';
var options = {
    title: 'Select Image',
    customButtons: [
        {
            name: 'customOptionKey',
            title: 'Choose Photo from Custom Option'
        },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
    // mediaType: 'photo'
};

export default function UserInfoScreen({ navigation }) {
    const userInfo = useSelector(state => state.userInfoState);
    const [name, setName] = React.useState(userInfo.name);
    const [phone, setPhone] = React.useState('');
    const [birthday, setBirthday] = React.useState(new Date());
    const [country, setCountry] = React.useState('Vietnam');
    const [img, setImg] = React.useState(require('../../../../assets/botAvt.jpg'));
    const [role, setRole] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            const res = await axios.get(serverUrl + 'user/info', {
                headers: { 'Authorization': 'Bearer ' + userInfo.tokens.access.token }
            })
            const data = res.data.user
            setRole(data.roles[0]);
            setPhone(data.phone)
        } catch (error) {
            console.log(error);
            errorHandle(error);
        }
        setLoading(false)
    }
    const updateData = async () => {
        setLoading(true)
        try {
            const res = await axios.put(serverUrl + 'user/info', {
                name, country, phone,
                birthday: birthday.toLocaleString().substring(0, 10),
                level: 'HIGHER_BEGINNER',
                learnTopics: [],
                testPreparations: []
            }, { headers: { 'Authorization': 'Bearer ' + userInfo.tokens.access.token } })
            console.log(res.data);
            dispatch(setUserInfoAction(res.data.user));
            showMessage({ type: 'success', message: 'Update successful' })
        } catch (error) {
            errorHandle(error);
        }
        setLoading(false)

    }
    React.useEffect(() => {
        getData()
    }, [])
    const editAvt = () => {
        launchImageLibrary(options, Response => {
            if (Response.didCancel) {
                return
            }
            else if (Response.errorCode) {
                showMessage({
                    message: 'Action failed', description: Response.errorMessage, type: 'danger'
                })
            }
            else {
                console.log(Response.assets)
                setImg({ uri: Response.assets[0].uri })
            }

        })
    }
    return (
        <SafeAreaView style={globalStyles.container} >
            <ScrollView>
                <Card>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <TouchableOpacity style={{ alignItems: 'center', marginHorizontal: 10, marginVertical: 2 }} onPress={editAvt} >
                            <Image style={globalStyles.avt} source={img} />
                            <View style={{ flexDirection: 'row', marginTop: 4 }} >
                                <Text style={{ fontWeight: '500', color: '#3399ff' }} >Edit</Text>
                                <GetIcon iconName={'edit'} source={'AntDesign'} size={16} color={'#3399ff'} />

                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} >
                            <Text style={globalStyles.titleName} >Khang Nguyen</Text>
                            <Text>Account id: {userInfo.id}</Text>
                            <Text>Account type: {role}</Text>


                        </View>
                    </View>
                </Card>
                <Card>
                    <TextInputCard title={'Name'} placeholder={'Enter your name'} value={name} onChangeValue={setName} />
                    {/* </Card>
            <Card> */}
                    <TextInputCard title={'Phone number'} keyboardType={'phone-pad'} value={phone} onChangeValue={setPhone}
                        placeholder={'Enter your phone number'} />
                    {/* </Card>
            <Card> */}
                    <TextInputCard title={'Email'} placeholder={'Enter your email'} isEdit={false} value={userInfo.email} />
                </Card>
                <Card>
                    <CountryPicker value={country} didSelect={setCountry} />
                </Card>
                <Card>
                    <MyDatePicker title={'Birthday'} value={birthday} onChageValue={setBirthday} />
                </Card>
                <MyButton onPress={updateData} moreStyle={{ ...globalStyles.authBtnContainer, width: '69%' }} title={'Save'} moreTitleStyle={{ color: 'white' }} />
            </ScrollView>
            {
                loading &&
                <LoadingIndicator />
            }
        </SafeAreaView>
    )
}