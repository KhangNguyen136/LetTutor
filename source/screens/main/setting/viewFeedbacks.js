import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import ListFeedback from '../../../components/list/listFeedback';
import FilterReview from '../../../components/filterRating';
import { globalStyles } from '../../../styles/globalStyles';
import Card from '../../../components/card';

export default function ViewFeedback() {
    const [filter, setFilter] = React.useState('All')

    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                <FilterReview choosen={filter} setFilter={setFilter} />
            </Card>
            <ListFeedback filter={filter} />
        </SafeAreaView>
    )
}