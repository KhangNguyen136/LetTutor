import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
import { GetIcon } from './button';
import CountryPicker from 'react-native-country-picker-modal';

export default function MyCountryPicker({ value, didSelect }) {
    const onSelect = (result) => {
        didSelect(result.cca2)
    }
    return (
        <View style={styles.container} >
            <Text style={{ marginHorizontal: 5, fontSize: 16, fontWeight: '600' }} >Country: </Text>
            <View style={styles.typeContainer} >
                <CountryPicker {...{
                    countryCode: value,
                    withFlag: true,
                    withFilter: true,
                    withCountryNameButton: true,
                    onSelect: onSelect,
                }} />
                <GetIcon iconName={'down'} source={'AntDesign'} size={18} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 3,
        alignItems: 'center',
        // justifyContent: 'space-between'
    },
    title: { fontWeight: '500', marginLeft: 4 },
    typeContainer: {
        // padding: 6,
        paddingHorizontal: 9,
        flexDirection: 'row',
        borderWidth: 0.25,
        borderColor: 'gray',
        alignItems: 'center',
        borderRadius: 6,
    },
    typeContent: {
        fontWeight: '600',
        marginHorizontal: 5,
    }

})
