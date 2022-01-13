import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { GetIcon } from './button';

export default function TextInputCard({ value, title, placeholder, onChangeValue, onBlur, keyboardType = 'default', isEdit = true }) {
    var iconName
    var source
    switch (title) {
        case 'Phone number':
            iconName = 'phone'
            source = 'SimpleLineIcons'
            break;
        case 'Email':
        case 'Email address':
        case 'Email or phone number':
            iconName = 'email'
            source = 'Entypo'
            break;

        case 'Name':
        case 'Your name':
            iconName = 'user'
            source = 'AntDesign'
    }
    return (
        <View style={styles.container} >
            <View style={styles.titleContainer} >
                <GetIcon iconName={iconName} size={20} source={source} />
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.contentContainer}>
                <TextInput style={styles.content}
                    value={value}
                    onChangeText={onChangeValue}
                    placeholder={placeholder}
                    placeholderTextColor={'#95a0a0'}
                    onBlur={onBlur}
                    keyboardType={keyboardType}
                    editable={isEdit}
                    multiline={true}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 3
    },
    titleContainer: {
        flexDirection: 'row',
        margin: 2,
        alignItems: 'center',
    },
    content: {
        fontSize: 15,
        paddingVertical: 5,
        // alignContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#ecf0f1',
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 4,
    },
    contentContainer: {
        margin: 2,
    },
    title: { fontSize: 16, fontWeight: '500', marginLeft: 4 }
})