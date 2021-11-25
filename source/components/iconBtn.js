import React from 'react';
import { Text, Touchable, TouchableOpacity } from 'react-native';
import { GetIcon } from './button';

export default function IconBtn({ title, onPress, liked = false }) {
    var icon = { name: 'chatbubble-ellipses-outline', source: 'Ionicons', color: 'black' }
    switch (title) {
        case 'Favourite':
            icon = { name: liked ? 'heart' : 'heart-outline', source: 'Ionicons', color: 'pink' }
            break;
        case 'Report':
            icon = { name: 'report', source: 'MaterialIcons', color: 'black' }
            break;
        case 'Review':
            icon = { name: 'staro', source: 'AntDesign', color: 'black' }
            break;
    }
    return (
        <TouchableOpacity style={{ alignItems: 'center', padding: 5 }} onPress={onPress} >
            <GetIcon iconName={icon.name} source={icon.source} color={icon.color} />
            <Text style={{ fontWeight: '500' }} >{title}</Text>
        </TouchableOpacity>
    )
}