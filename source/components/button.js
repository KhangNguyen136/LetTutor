import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
    MaterialIcons, Ionicons, MaterialCommunityIcons, FontAwesome5, FontAwesome,
    AntDesign, Entypo, Fontisto, Feather, Octicons, SimpleLineIcons
} from '@expo/vector-icons';

export function IconButton({ iconName, onPress, source, size, color = 'black' }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.iconButton}>
                <GetIcon iconName={iconName} source={source} size={size} color={color} />
            </View>
        </TouchableOpacity>
    );
}

export function GetIcon({ iconName, source, size = 20, color = 'black' }) {
    switch (source) {
        case 'Fontisto':
            return <Fontisto name={iconName} size={size} color={color} />
        case 'Entypo':
            return <Entypo name={iconName} size={size} color={color} />
        case 'AntDesign':
            return <AntDesign name={iconName} size={size} color={color} />
        case 'FontAwesome5':
            return <FontAwesome5 name={iconName} size={size} color={color} />
        case 'FontAwesome':
            return <FontAwesome name={iconName} size={size} color={color} />
        case 'MaterialCommunityIcons':
            return (<MaterialCommunityIcons name={iconName} size={size} color={color} />)
        case 'MaterialIcons':
            return (<MaterialIcons name={iconName} size={size} color={color} />)
        case 'Feather':
            return (<Feather name={iconName} size={size} color={color} />)
        case 'Octicons':
            return (<Octicons name={iconName} size={size} color={color} />)
        case 'SimpleLineIcons':
            return (<SimpleLineIcons name={iconName} size={size} color={color} />)
        default:
            return (<Ionicons name={iconName} size={size} color={color} />)
    }
}


export function MyIconButtonLeft({ onPress, title, iconName, iconSource, iconSize = 22, iconColor = 'black', moreStyle, moreTitleStyle }) {
    return (
        <TouchableOpacity style={[styles.MyButtonCotainer, moreStyle]} onPress={onPress} >
            <GetIcon iconName={iconName} source={iconSource} size={iconSize} color={iconColor} />
            <Text style={[styles.btnTitle, moreTitleStyle]} > {title} </Text>
        </TouchableOpacity>
    )
}

export function MyIconButtonRight({ onPress, title, iconName, iconSource, iconSize = 22, iconColor = 'black', moreStyle, moreTitleStyle }) {
    return (
        <TouchableOpacity style={[styles.MyButtonCotainer, moreStyle]} onPress={onPress} >
            <Text style={[styles.btnTitle, moreTitleStyle]} > {title} </Text>
            <GetIcon iconName={iconName} source={iconSource} size={iconSize} color={iconColor} />
        </TouchableOpacity>
    )
}

export function MyButton({ onPress, title, moreStyle, moreTitleStyle }) {
    return (
        <TouchableOpacity style={[styles.MyButtonCotainer, moreStyle]} onPress={onPress} >
            <Text style={[styles.btnTitle, moreTitleStyle]} > {title} </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create(
    {
        iconButton: {
            paddingVertical: 3,
            paddingHorizontal: 3,
            justifyContent: 'center',
        },
        MyButtonCotainer: {
            alignSelf: 'center',
            margin: 5,
            paddingVertical: 5,
            paddingHorizontal: 7,
            alignItems: 'center',
            backgroundColor: '#0be881',
            borderRadius: 10,
            shadowColor: '#333',
            shadowOpacity: 0.1,
            shadowOffset: { width: 1, height: 1 },
        },
        btnTitle: {
            color: 'black',
            fontSize: 16,
            fontWeight: '600'
        },


    }
)