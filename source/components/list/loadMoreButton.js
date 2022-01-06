import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
export default function LoadMore({ onPress, loading }) {
    return (
        //Footer View with Load More button
        <View style={styles.footer}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={onPress}
                //On Click of button load more data
                style={styles.loadMoreBtn}>
                <Text style={styles.btnText}>Load More</Text>
                {loading ? (
                    <ActivityIndicator
                        color="white"
                        style={{ marginLeft: 8, height: 18 }} />
                ) : null}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        padding: 5,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 6,
        paddingHorizontal: 9,
        backgroundColor: '#0984e3',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
})