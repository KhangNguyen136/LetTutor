import React from 'react';
import { Text, SafeAreaView } from 'react-native';
// import { SearchBar } from 'react-native-elements';
import SearchBox from '../../components/searchBar';
import ListHistory from '../../components/list/listHistory';
import Card from '../../components/card';
import { globalStyles } from '../../styles/globalStyles';

export default function History() {
    const [searchKey, setSearchKey] = React.useState('');

    const updateSearch = (key) => setSearchKey(key)
    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                <SearchBox placeholder={"Search by tutor's name"} value={searchKey} textChange={updateSearch} />
            </Card>
            <ListHistory search={searchKey} />
        </SafeAreaView>
    )
}