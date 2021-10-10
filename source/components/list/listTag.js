import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default function ListTag({ tags }) {
    const Tag = ({ item }) => {
        return (
            <View style={styles.container} >
                <Text style={styles.content} >{item}</Text>
            </View>
        )
    }
    return (
        <FlatList data={tags}
            horizontal={true}
            renderItem={Tag}
            keyExtractor={item => item}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        backgroundColor: '#81ecec',
        paddingHorizontal: 4,
        paddingVertical: 2,
        marginHorizontal: 4,
        marginVertical: 2,
        borderWidth: 0.5,
        borderColor: 'gray'
    },
    content: {
        fontWeight: '600',
        color: '#0984e3'
    }
})