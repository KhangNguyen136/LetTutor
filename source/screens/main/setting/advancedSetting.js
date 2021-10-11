import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { Menu, MenuDivider } from 'react-native-material-menu';
import globalStyles from '../../../styles/globalStyles';
import Card from '../../../components/card';

export default function AdvancedSetting() {
    return (
        <SafeAreaView style={globalStyles.container} >

            <Card>
                <View style={{ flexDirection: 'row' }} >
                    <Text>Language: </Text>
                    <Menu />
                </View>
            </Card>
        </SafeAreaView>
    )
}