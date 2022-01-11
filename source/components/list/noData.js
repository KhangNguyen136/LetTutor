import React from 'react';
import { View, Text } from 'react-native';
import { GetIcon } from '../button';
import Card from '../card';

export default function NoData() {
    return (
        <Card>
            <View style={{ padding: 20, width: '100%', alignItems: 'center' }}>
                <GetIcon iconName={'inbox'} source={'Feather'} color={'#95a5a6'} size={40} />
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginVertical: 20 }}>No data</Text>
            </View>

        </Card>
    )
}