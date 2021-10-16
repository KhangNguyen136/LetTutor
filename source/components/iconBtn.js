import React from 'react';
import { Text, Touchable, TouchableOpacity } from 'react-native';
import { GetIcon } from './button';

export default function IconBtn({ title, onPress }) {
    var icon = { name: 'chatbubble-ellipses-outline', source: 'Ionicons' }
    switch (title) {
        case 'Favorite':
            icon = { name: 'heart-outline', source: 'Ionicons' }
            break;
        case 'Report':
            icon = { name: 'report', source: 'MaterialIcons' }
            break;
        case 'Review':
            icon = { name: 'staro', source: 'AntDesign' }
            break;
    }
    return (
        <TouchableOpacity style={{ alignItems: 'center', padding: 5 }} onPress={onPress} >
            <GetIcon iconName={icon.name} source={icon.source} />
            <Text style={{ fontWeight: '500' }} >{title}</Text>
        </TouchableOpacity>
    )
}