import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { globalStyles } from '../../../styles/globalStyles';
import Card from '../../../components/card';
import Picker from '../../../components/settingPicker';

export default function AdvancedSetting() {
    return (
        <SafeAreaView style={globalStyles.container} >

            <Card>
                <Picker title={'Language: '} />
            </Card>
            <Card>
                <Picker title={'Default screen: '} />
            </Card>
        </SafeAreaView>
    )
}