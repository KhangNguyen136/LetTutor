import React from 'react';
import { SafeAreaView, Image, View, Text, Button } from 'react-native';
import { MyButton } from '../../../components/button';
import Card, { FlexCard } from '../../../components/card';
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
                    <View>
                        <Text style={{ fontWeight: '600', fontSize: 16 }} >Khang Nguyen</Text>
                        <Text>Account id: asdd123dsd3434</Text>
                        <Text>Account type: student</Text>
                    </View>
                </View>
            </Card>
            <Card>
                <TextInputCard title={'Name: '} />
            </Card>
            <Card>
                <TextInputCard title={'Phone number: '} keyboardType={'phone-pad'} />
            </Card>
            <Card>
                <TextInputCard title={'Email: '} />
            </Card>
            <Card>
                <TextInputCard title={'Country: '} />
            </Card>
            <Card>
                <TextInputCard title={'Birthday: '} />
            </Card>
            <MyButton moreStyle={{ ...globalStyles.authBtnContainer, width: '69%' }} title={'Save'} moreTitleStyle={{ color: 'white' }} />
        </SafeAreaView>
    )
}