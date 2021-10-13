import React from 'react';
import { SafeAreaView, Image, View, Text, TouchableOpacity } from 'react-native';
import { GetIcon, MyButton } from '../../../components/button';
import Card, { FlexCard } from '../../../components/card';
import CountryPicker from '../../../components/countryPicker';
import MyDatePicker from '../../../components/datePicker';
import TextInputCard from '../../../components/TextInputCard';
import { globalStyles } from '../../../styles/globalStyles';

export default function UserInfo({ navigation }) {
    React.useEffect(() => {

    }, [])
    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <Image style={{ width: 100, height: 100, borderRadius: 8 }} source={require('../../../../assets/botAvt.jpg')} />
                    <View style={{ flex: 1 }} >
                        <Text style={{ fontWeight: '600', fontSize: 16 }} >Khang Nguyen</Text>
                        <Text>Account id: asdd123dsd3434</Text>
                        <Text>Account type: student</Text>
                        <TouchableOpacity style={{ alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate('ChangePassword')} >
                            <Text style={{ color: '#3399ff' }} >Change password</Text>
                            <GetIcon iconName={'right'} source={'AntDesign'} size={14} color={'#3399ff'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Card>
            <Card>
                <TextInputCard title={'Name: '} placeholder={'Enter your name'} />
                {/* </Card>
            <Card> */}
                <TextInputCard title={'Phone number: '} keyboardType={'phone-pad'} placeholder={'Enter your phone number'} />
                {/* </Card>
            <Card> */}
                <TextInputCard title={'Email: '} placeholder={'Enter your email'} />
            </Card>
            <Card>
                <CountryPicker />
            </Card>
            <Card>
                <MyDatePicker title={'Birthday: '} />
            </Card>
            <MyButton moreStyle={{ ...globalStyles.authBtnContainer, width: '69%' }} title={'Save'} moreTitleStyle={{ color: 'white' }} />
        </SafeAreaView>
    )
}