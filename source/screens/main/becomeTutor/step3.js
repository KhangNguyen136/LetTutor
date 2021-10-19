import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { GetIcon, MyButton } from '../../../components/button';
import Card from '../../../components/card';
import { globalStyles } from '../../../styles/globalStyles';

export default function BecomeTutor3({ navigation }) {
    return (
        <SafeAreaView style={globalStyles.container} >
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