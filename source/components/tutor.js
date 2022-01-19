import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { IconButton } from './button';
import StarRating from 'react-native-star-rating';
import ListTag from './list/listTag';
import Card from './card';
import { getListLabel } from './../bussiness/specialies';
import { FlagButton } from 'react-native-country-picker-modal';
import { favorAction } from '../services/tutor';

export function Tutor({ item, navigation, token }) {
    const [isFavour, setIsFavour] = React.useState(item.isFavor)
    const listSpecialies = getListLabel(item.specialties.split(","));
    const icon = isFavour ? 'heart' : 'hearto';
    const pressLike = async () => {
        const res = await favorAction(item.userId, token);
        if (res)
            setIsFavour(!isFavour)
    }
    function toDetail() {
        navigation.navigate('TutorInfo', { id: item.userId });
    }
    return (
        <View style={{ marginHorizontal: 1 }}   >
            <Card>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={toDetail} >
                    <Image source={{ uri: item.avatar }} style={styles.img}  ></Image>
                    <View style={{ flex: 1, margin: 4, justifyContent: 'space-between' }} >
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}  >{item.name}</Text>
                        <FlagButton {...{ countryCode: item.country, onOpen: toDetail }} containerButtonStyle={{ margin: 0, padding: 0 }} withCountryNameButton />
                        {item.rating != undefined ?
                            <StarRating disabled={true} maxStars={5} rating={item.rating} fullStarColor='#f9ca24'
                                starSize={18} containerStyle={{ marginBottom: 3, alignSelf: 'flex-start' }} />
                            :
                            <Text style={{ fontWeight: '600', fontSize: 14 }} >No review yet</Text>
                        }
                    </View>
                    <View style={{ justifyContent: 'flex-start' }}>
                        <IconButton iconName={icon} color={'pink'} source={'AntDesign'} onPress={pressLike} />

                    </View>
                </TouchableOpacity>
                <ListTag tags={listSpecialies} />
                <Text style={{ maxHeight: 60, fontSize: 13, margin: 5 }} onPress={toDetail} >{item.bio}</Text>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        width: 70,
        height: 70,
        borderRadius: 10,
        margin: 5
    },
})