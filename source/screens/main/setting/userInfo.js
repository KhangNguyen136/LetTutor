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
                    <Image style={globalStyles.avt} source={require('../../../../assets/botAvt.jpg')} />
                    <View style={{ flex: 1 }} >
                        <Text style={globalStyles.titleName} >Khang Nguyen</Text>
                        <Text>Account id: asdd123dsd3434</Text>
                        <Text>Account type: student</Text>


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