import React from 'react';
import { Text, SafeAreaView, View } from 'react-native';
// import { SearchBar } from 'react-native-elements';
import SearchBox from '../../../components/searchBar';
import ListTutor from '../../../components/list/listTutor';
import { globalStyles } from '../../../styles/globalStyles';
import FilterReview from '../../../components/filterRating';
import Card from '../../../components/card';
import CountryPicker from '../../../components/countryPicker';
import Picker from '../../../components/picker';

export default function TutorScreen() {
    const [searchKey, setSearchKey] = React.useState('');
    const [filterRating, setFilterRating] = React.useState('All')
    const [filterCountry, setFilterCountry] = React.useState('All')
    const [tag, setTag] = React.useState('All')

    const updateSearch = (key) => setSearchKey(key)
    const updateCountry = (country) => setFilterCountry(country)
    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <View style={{ flex: 1 }} >
                        <SearchBox placeholder={"Search by tutor's name"} value={searchKey} textChange={updateSearch} />
                    </View>
                    <CountryPicker value={filterCountry} didSelect={updateCountry} showIcon={false} />
                    {/* <View style={globalStyles.horizontalDivide} /> */}
                </View>
                <Picker didSelect={setTag} data={specialies} title={'Specialies: '} />
                <FilterReview title={'Rating:'} setFilter={setFilterRating} choosen={filterRating} />
            </Card>
            <ListTutor searchKey={searchKey} filter={{
                rating: filterRating, tag, country: filterCountry
            }} />
        </SafeAreaView>
    )
}

const specialies =
    ['All', 'English for kid', 'English for business', 'Conversational', 'STARTER', 'MOVERS', 'FLYERS', 'KET', 'PET', 'IELTS', 'TOEFL', 'TOEIC']