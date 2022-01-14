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
                <View style={{ alignItems: 'center' }} >
                    <GetIcon iconName={'email-receive'} source={'MaterialCommunityIcons'} size={80} color={'#55efc4'} />
                    <Text style={{ fontSize: 20, textAlign: 'center' }} >
                        You have done all the steps{'\n'}
                        Please, wait for the operator's approval
                    </Text>
                    <MyButton title={'Go back'} onPress={() => navigation.goBack()} />
                </View>
            </Card>
        </SafeAreaView>
    )
}