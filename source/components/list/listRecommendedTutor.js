import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import { handleListTutor } from '../../bussiness/tutorHandle';
import { getListTutor } from '../../services/tutor';
import { Tutor } from './listTutor';
// import { formatFavoriteTutor } from '../../bussiness/tutorHandle';

export default function ListRecommendedTutor() {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const navigation = useNavigation()
    const userInfo = useSelector(state => state.userInfoState);
    const token = userInfo.tokens.access.token;
    const getData = async () => {
        setLoading(true);
        try {
            const res = await getListTutor(1, 9, token);
            setData(handleListTutor(res.tutors.rows, res.favoriteTutor));
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }
    // const reload
    React.useEffect(() => {
        getData();
    }, [])
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <Tutor item={item} navigation={navigation} token={token} />}
            keyExtractor={item => item.id.toString()}
            // refreshControl={getData}
            refreshing={false}
            onRefresh={getData}
        />
    )
}

const styles = StyleSheet.create({
    img: {
        width: 80,
        height: 80,
        borderRadius: 10,
        margin: 5
    },
    rating: {
        alignSelf: 'flex-start'
    },

})
