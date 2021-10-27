import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import ListBooking from '../../components/list/listBooking';
import Card from '../../components/card';
import SearchBox from '../../components/searchBar';

export default function BookingHistory() {
    const [searchKey, setSearchKey] = React.useState('')
    return (
        <SafeAreaView>
            <Card>
                <SearchBox value={searchKey} textChange={setSearchKey} placeholder={'Search by tutor name'} />
            </Card>
            <ListBooking />
        </SafeAreaView>
    )
}