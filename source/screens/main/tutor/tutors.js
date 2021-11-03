import React from 'react';
import { Text, SafeAreaView, View } from 'react-native';
// import { SearchBar } from 'react-native-elements';
import SearchBox from '../../../components/searchBar';
import ListTutor from '../../../components/list/listTutor';
import { globalStyles } from '../../../styles/globalStyles';
import FilterReview from '../../../components/filterRating';
import Card from '../../../components/card';
import CountryFilter from '../../../components/countryFilter';
import Picker from '../../../components/filter';

export default function TutorScreen() {
    const [searchKey, setSearchKey] = React.useState('');
    const [filterRating, setFilterRating] = React.useState('All')
    const [filterCountry, setFilterCountry] = React.useState('Country')
    const [tag, setTag] = React.useState('Specialies')

    const updateSearch = (key) => setSearchKey(key)
    const updateCountry = (country) => setFilterCountry(country)
    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                <SearchBox placeholder={"Search by tutor's name"} value={searchKey} textChange={updateSearch} />

                <View style={{ flexDirection: 'row', margin: 3, marginEnd: 10 }} >

                    <CountryFilter value={filterCountry} didSelect={updateCountry} title={'Country'} />
                    <Picker didSelect={setTag} value={tag} data={specialies} title={'Specialies'} />
                    {/* <View style={globalStyles.horizontalDivide} /> */}
                </View>
                <FilterReview title={'Rating:'} setFilter={setFilterRating} choosen={filterRating} />
            </Card>
            <ListTutor searchKey={searchKey} filter={{
                rating: filterRating, tag, country: filterCountry
            }} />
        </SafeAreaView>
    )
}

export const specialies =
    ['English for kid', 'English for business', 'Conversational', 'STARTER', 'MOVERS', 'FLYERS', 'KET', 'PET', 'IELTS', 'TOEFL', 'TOEIC']