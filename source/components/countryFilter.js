import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
import { GetIcon, IconButton } from './button';
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu';
import { listCountry } from './countryPicker';
import IsSelectedView from './selectedView';

export default function CountryFilter({ value, didSelect, title }) {
    // const [value, setValue] = React.useState(listCountry[0])
    const [visible, setVisible] = React.useState(false)
    const [key, setKey] = React.useState('')
    const [items, setItems] = React.useState(listCountry)

    const isTitle = value == title
    const didSelectItem = (newValue) => {
        hideMenu()
        if (newValue.value != value) {
            didSelect(newValue)
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
        setItems(listItem.filter((item) => item.value.toLowerCase().includes(text.toLowerCase())))
    }
    const Item = ({ item }) => {
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                    <MenuItem onPress={() => didSelectItem(item.value)} >{item.value}</MenuItem>
                    <IsSelectedView isChoosen={item.value == value} />
                </View>
                <MenuDivider color={'black'} />
            </View>
        )
    }
    const PickerBtn = ({ onPress, value }) => {
        return (
            <TouchableOpacity style={styles.typeContainer} onPress={onPress} >
                <Text style={{ ...styles.typeContent, color: isTitle == true ? 'gray' : 'black' }} >{value}</Text>
                {
                    isTitle ?

                        <GetIcon iconName={'down'} source={'AntDesign'} size={18} color={'gray'} />
                        :
                        <IconButton iconName={'closecircleo'} source={'AntDesign'} size={18} onPress={() => didSelectItem(title)} />
                }
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container} >
            <Menu
                visible={visible}
                style={{ maxHeight: 300 }}
                onRequestClose={hideMenu}
                anchor={<PickerBtn onPress={showMenu} value={value} />}
            >
                <View style={{
                    borderWidth: 1, borderColor: 'gray', flex: 1,
                }} >
                    <TextInput style={{ fontSize: 14, padding: 5 }} placeholder={'Search'} value={key} onChangeText={searchUpdate} />
                    <MenuDivider color={'black'} />
                    <FlatList data={items}
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
        margin: 3,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: { fontWeight: '500', marginLeft: 4 },
    typeContainer: {
        padding: 3,
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

