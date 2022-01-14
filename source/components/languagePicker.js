import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons } from '@expo/vector-icons';
import { languages } from '../constant';

export default function LanguagePicker({ value, onChangeValue }) {
    const items = getListLanguage();
    const onSelected = (result) => {
        console.log(result);
        onChangeValue(result);
    }
    return (
        <View style={styles.container} >
            {/* <Text style={{ marginHorizontal: 5, fontSize: 16, fontWeight: '600' }} >
                Want to learn: </Text> */}
            <SectionedMultiSelect IconRenderer={MaterialIcons}
                // readOnlyHeadings={true}
                onSelectedItemsChange={onSelected}
                selectedItems={value}
                // subKey='children'
                items={items} uniqueKey='id'
                selectText={"Language I speak"}
                showRemoveAll
                modalWithSafeAreaView={true}
                styles={{
                    selectToggle: {
                        padding: 5, marginBottom: 10,
                        justifyContent: 'space-evenly',
                    },
                    selectToggleText: {
                        fontWeight: '600'
                    },
                    chipContainer: {
                        backgroundColor: '#dfe6e9',
                    },
                    chipText: {
                        fontWeight: '500', color: 'black'
                    }
                }}
                showCancelButton
                // hideSearch
                showDropDowns={false} />

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        marginHorizontal: 3,
        // alignItems: 'center',
        // justifyContent: 'space-between'
    },
    title: { fontWeight: '500', marginLeft: 4 },
    typeContainer: {
        // padding: 6,
        paddingHorizontal: 9,
        flexDirection: 'row',
        borderWidth: 0.25,
        borderColor: 'gray',
        alignItems: 'center',
        borderRadius: 6,
    },
    typeContent: {
        fontWeight: '600',
        marginHorizontal: 5,
    }
})

function getListLanguage() {
    const result = [];
    for (var key in languages) {
        result.push({
            id: key,
            name: languages[key]
        })
    }
    return result;
}