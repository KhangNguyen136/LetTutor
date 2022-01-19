import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Card from '../card';
import StarRating from 'react-native-star-rating';

export default function ListFeedback({ data, search, filter = 'All' }) {
    const filterData = (item) => {
        if (filter == 'All')
            return true
        return item.rating == filter
    }
    const navigation = useNavigation()
    const Feedback = ({ item }) => {
        const date = new Date(item.updatedAt);
        return (
            <View style={{ marginHorizontal: 2 }}  >
                <Card>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Image source={{ uri: item.firstInfo.avatar }} style={styles.img}  ></Image>
                        <View style={{ flex: 1, margin: 5 }} >
                            <Text style={{ fontSize: 15, fontWeight: '500', margin: 3 }} >{item.firstInfo.name}</Text>
                            <Text style={{ margin: 4 }} >{date.toUTCString().substring(0, 22)}</Text>
                            <StarRating disabled={true} maxStars={5} rating={item.rating} fullStarColor='#f9ca24'
                                starSize={18} containerStyle={{ marginVertical: 3, alignSelf: 'flex-start' }} />
                        </View>
                    </View>
                    <Card>
                        <Text style={{ fontSize: 15 }} numberOfLines={3} >{item.content}</Text>
                    </Card>
                </Card >
            </View >
        )
    }
    return (
        <FlatList
            data={data.filter(filterData)}
            renderItem={Feedback}
            keyExtractor={item => item.id.toString()}
        />
    )
}

const styles = StyleSheet.create({
    img: {
        width: 60,
        height: 60,
        borderRadius: 10,
        margin: 5
    },
    rowItem:
    {
        flexDirection: 'row', alignItems: 'center',
        margin: 3
    }

})
