import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { GetIcon, MyButton } from '../../../components/button';
import Card from '../../../components/card';
import Step from '../../../components/stepProcess';
import { globalStyles } from '../../../styles/globalStyles';

export default function BecomeTutor3({ navigation }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Become tutor',
            headerBackVisible: false
        })
    }, [])
    return (
        <SafeAreaView style={globalStyles.container} >
            <Step step={2} />
            <Card>
                <View style={{ alignItems: 'center', padding: 20 }} >
                    <GetIcon iconName={'checksquare'} source={'AntDesign'} size={80} color={'#27ae60'} />
                    <Text style={{ fontSize: 20, textAlign: 'center' }} >
                        You have done all the steps{'\n'}
                        Please, wait for the operator's approval
                    </Text>
                    <MyButton title={'Go back'} moreTitleStyle={{ color: 'white' }}
                        moreStyle={{ backgroundColor: '#27ae60' }}
                        onPress={() => navigation.popToTop()} />
                </View>
            </Card>
        </SafeAreaView>
    )
}