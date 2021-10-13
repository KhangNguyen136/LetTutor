import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { GetIcon } from './button';

export default function TextInputCard({ value, title, placeholder, onChangeValue, onBlur, keyboardType = 'default', isEdit = true }) {
    var iconName
    var source
    switch (title) {

        case 'Country: ':
            iconName = 'flag'
            source = 'Feather'
            break;
        case 'Birthday: ':
            iconName = 'birthday-cake'
            source = 'FontAwesome'
            break;
        case 'Phone number: ':
            iconName = 'phone'
            source = 'SimpleLineIcons'
            break;
        case 'Email: ':
            iconName = 'email'
            source = 'Entypo'
            break;

        case 'Name: ':
            iconName = 'user'
            source = 'AntDesign'
    }
    return (
        <View style={styles.container} >
            <GetIcon iconName={iconName} size={20} source={source} />
            <Text style={styles.title}>{title}</Text>
            <View style={styles.contentArea}>
                <TextInput style={styles.content}
                    value={value}
                    onChangeText={onChangeValue}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    keyboardType={keyboardType}
                    editable={isEdit}

                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center',

    },
    content: {
        fontSize: 16,
        padding: 5,
    },
    contentArea: {
        flex: 1,
        borderBottomWidth: 0.25,
        borderColor: 'black'
    },
    title: { fontSize: 16, fontWeight: '500', marginLeft: 4 }
})