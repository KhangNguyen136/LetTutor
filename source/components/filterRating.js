import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Card from './card';
import { GetIcon } from './button';
export default function FilterReview({ choosen, setFilter, title = 'Filter:' }) {
    const FilterBtn = ({ item }) => {
        return (
            <TouchableOpacity style={item == choosen ? styles.filterBtnOnFocus : styles.filterBtn} onPress={() => setFilter(item)} >
                <Text>{item}</Text>
                <GetIcon iconName={'star'} source={'AntDesign'} color={'#f9ca24'} />
            </TouchableOpacity>
        )
    }

    return (
        // <Card>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}  >
            <Text >{title}</Text>
            <FilterBtn item={'All'} />
            <FilterBtn item={'5'} />
            <FilterBtn item={'4'} />
            <FilterBtn item={'3'} />
            <FilterBtn item={'2'} />
            <FilterBtn item={'1'} />
        </View>
        // </Card>
    )
}

const styles = StyleSheet.create({
    filterBtnOnFocus: {
        flex: 1,
        padding: 3,
        backgroundColor: '#dff9fb',
        borderRadius: 3,
        borderWidth: 0.5,
        borderColor: '#d63031',
        marginHorizontal: 3,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    filterBtn: {
        flex: 1,
        padding: 3,
        backgroundColor: '#dfe6e9',
        borderRadius: 3,
        marginHorizontal: 3,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    }
})