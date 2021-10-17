import React from 'react';
import { Text, SafeAreaView, View } from 'react-native';
// import { SearchBar } from 'react-native-elements';
import SearchBox from '../../../components/searchBar';
import ListTutor from '../../../components/list/listTutor';
import { globalStyles } from '../../../styles/globalStyles';
import FilterReview from '../../../components/filterRating';
import Card from '../../../components/card';

export default function TutorScreen() {
    const [searchKey, setSearchKey] = React.useState('');
    const [filterRating, setFilterRating] = React.useState('All')

    const updateSearch = (key) => setSearchKey(key)

    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                {/* <View style={{ flexDirection: 'row', width: '100%', backgroundColor: 'red' }} > */}
                <SearchBox placeholder={"Search by tutor's name"} value={searchKey} textChange={updateSearch} />
                {/* </View> */}
                <FilterReview setFilter={setFilterRating} choosen={filterRating} />
            </Card>
            <ListTutor searchKey={searchKey} filter={{
                rating: filterRating
            }} />
        </SafeAreaView>
    )
}
