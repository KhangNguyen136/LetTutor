import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
import { GetIcon } from './button';
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu';
import IsSelectedView from './selectedView';
export default function CountryPicker() {
    const [value, setValue] = React.useState(listCountry[0])
    const [visible, setVisible] = React.useState(false)
    const [key, setKey] = React.useState('')
    const [items, setItems] = React.useState(listCountry)

    const didSelectItem = (newValue) => {
        hideMenu()
        if (newValue.value != value.value) {
            setValue(newValue)
            // setType(newValue.typeID)
        }
    };
    const hideMenu = () => {
        setVisible(false)
    };
    const showMenu = () => {
        setVisible(true)
    };
    const searchUpdate = (text) => {
        setKey(text)
        setItems(listCountry.filter((item) => item.value.toLowerCase().includes(text.toLowerCase())))
    }
    const Item = ({ item }) => {
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                    <MenuItem onPress={() => didSelectItem(item)} >{item.value}</MenuItem>
                    <IsSelectedView isChoosen={item.value == value.value} />
                </View>
                <MenuDivider color={'black'} />
            </View>
        )
    }
    const PickerBtn = ({ onPress, value }) => {
        return (
            <TouchableOpacity style={styles.typeContainer} onPress={onPress} >
                <Text style={styles.typeContent} >{value}</Text>
                <GetIcon iconName={'down'} source={'AntDesign'} size={18} />
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                <GetIcon iconName={'flag'} source={'Feather'} />
                <Text style={{ marginLeft: 10, fontSize: 17 }} >Country: </Text>
            </View>
            <Menu
                visible={visible}
                style={{ maxHeight: 300 }}
                onRequestClose={hideMenu}
                anchor={<PickerBtn onPress={showMenu} value={value.value} />}
            >
                <View>
                    <TextInput style={{ fontSize: 14, padding: 5 }} placeholder={'Search'} value={key} onChangeText={searchUpdate} />
                    <MenuDivider color={'black'} />
                    <FlatList data={items} style={{}}
                        renderItem={Item}
                        keyExtractor={item => item.value} />
                </View>
            </Menu>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: { fontSize: 16, fontWeight: '500', marginLeft: 4 },
    typeContainer: {
        padding: 5,
        flexDirection: 'row',
        borderWidth: 0.25,
        borderColor: 'gray',
        alignItems: 'center',
        borderRadius: 10,
    },
    typeContent: {
        fontSize: 17, fontWeight: '600',
        marginHorizontal: 5,
    }

})

const listCountry = [
    { label: 'Vietnam', value: 'Vietnam' },
    { label: 'USA', value: 'USA' },
    { label: 'England', value: 'England' },
    { label: 'China', value: 'China' },
    { label: 'Japan', value: 'Japan' },
    { label: 'Korea', value: 'Korea' },
    { label: 'French', value: 'French' },
    { label: 'Germany', value: 'Germany' },
    { label: 'Indonesia', value: 'Indonesia' },
    { label: 'Switzerland', value: 'Switzerland' },
    { label: 'Canada', value: 'Canada' },
    { label: 'Australia', value: 'Australia' },
    { label: 'Finland', value: 'Finland' },
    { label: 'Russia', value: 'Russia' },
    { label: 'Singapore', value: 'Singapore' },
    { label: 'Thailand', value: 'Thailand' },
    { label: 'India', value: 'India' },
    { label: 'Iran', value: 'Iran' },
    { label: 'Iraq', value: 'Iraq' },
    { label: 'Italy', value: 'Italy' },
    { label: 'Malaysia', value: 'Malaysia' },

]