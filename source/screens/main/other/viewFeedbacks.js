import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import ListFeedback from '../../../components/list/listFeedback';
import FilterReview from '../../../components/filterRating';
import { globalStyles } from '../../../styles/globalStyles';
import Card from '../../../components/card';
import SearchBox from '../../../components/searchBar';

export default function ViewFeedback() {
    const [filter, setFilter] = React.useState('All')
    const [searchKey, setSearchKey] = React.useState('')

    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                <SearchBox value={searchKey} textChange={setSearchKey} placeholder={'Search by name or comment'} />
                <FilterReview choosen={filter} setFilter={setFilter} />
            </Card>
            <ListFeedback filter={filter} />
        </SafeAreaView>
    )
}