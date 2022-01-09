import React from 'react';
import {
    SafeAreaView,
} from 'react-native';
import ListFeedback from '../../../components/list/listFeedback';
import { globalStyles } from '../../../styles/globalStyles';
import FilterReview from '../../../components/filterRating';
import Card from '../../../components/card';

export default function Reviews({ navigation, route }) {
    const { data } = route.params
    const [filter, setFilter] = React.useState('All')
    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                <FilterReview choosen={filter} setFilter={setFilter} />
            </Card>
            <ListFeedback data={data} filter={filter} />
        </SafeAreaView  >
    )
}
