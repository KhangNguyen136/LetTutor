import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { GetIcon } from './button';
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu';
import IsSelectedView from './selectedView';

export default function SettingPicker({ setLanguage, title }) {
    const [value, setValue] = React.useState(languages[0])
    const [items, setItems] = React.useState(languages)
    const [visible, setVisible] = React.useState(false)
    const [icon, setIcon] = React.useState({ iconName: 'language', source: 'FontAwesome' })
    React.useEffect(() => {
        console.log('Set up data')
        if (title == 'Language: ') {
            setValue(languages[0])
            setItems(languages)
        }
        else {
            setValue(screens[0])
            setItems(screens)
            setIcon({ iconName: 'screen-smartphone', source: 'SimpleLineIcons' })
        }

    }, [])
    const didSelectType = (newValue) => {
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
    const PickerBtn = ({ onPress, value }) => {
        return (
            <TouchableOpacity style={styles.typeContainer} onPress={onPress} >
                <Text style={styles.typeContent} >{value}</Text>
                <GetIcon iconName={'down'} source={'AntDesign'} size={18} />
            </TouchableOpacity>
        )
    }
    const ScreenItem = ({ item, onPress }) => {
        return (
            <View  >
                <MenuDivider color={'black'} />
                <TouchableOpacity style={
                    {
                        flexDirection: 'row', alignItems: 'center', padding: 5, justifyContent: 'space-between'
                    }} onPress={onPress} >
                    <View style={{ flexDirection: 'row' }}>
                        <GetIcon iconName={item.iconName} source={item.source} size={18} />
                        <Text style={{ fontSize: 17, marginHorizontal: 5 }} >{item.value}</Text>
                    </View>
                    <IsSelectedView isChoosen={item.value == value.value} paddingRight={18} iconSize={18} />
                </TouchableOpacity>
            </View>
        )
    }

    const LanguageItem = ({ item, onPress }) => {
        return (
            <View>
                <MenuDivider color={'black'} />
                <TouchableOpacity style={
                    {
                        flexDirection: 'row', alignItems: 'center', padding: 5, justifyContent: 'space-between'
                    }} onPress={onPress}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Image style={{ width: 30, height: 30, borderRadius: 6, marginRight: 5 }} source={item.img} />
                        <Text style={{ fontSize: 17, marginRight: 5, alignItems: 'center' }} >{item.value}</Text>
                    </View>
                    <IsSelectedView isChoosen={item.value == value.value} paddingRight={18} iconSize={18} />
                </TouchableOpacity>
            </View>
        )
    }
    const Item = ({ item }) => {
        if (title == 'Language: ') {
            return (
                <LanguageItem item={item} onPress={() => didSelectType(item)} />
            )
        }
        return (
            <ScreenItem item={item} onPress={() => didSelectType(item)} />
        )
    }
    return (
        <View>
            <View style={styles.container} >
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <GetIcon iconName={icon.iconName} source={icon.source} />
                    <Text style={{ marginLeft: 10, fontSize: 17 }} >{title} </Text>
                </View>
                <Menu
                    visible={visible}
                    onRequestClose={hideMenu}
                    anchor={<PickerBtn onPress={showMenu} value={value.value} />}
                >
                    <FlatList data={items}
                        renderItem={Item}
                        keyExtractor={item => item.value} />
                </Menu>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
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

const languages = [{
    value: 'Vietnamese',
    img: require('../../assets/Vietnamese.png')
},
{
    value: 'English',
    img: require('../../assets/English.png')
}]

const screens = [{
    value: 'Home',
    iconName: 'home-outline',
    source: ''
},
{
    value: 'Message',
    iconName: 'chatbubbles-outline',
    source: 'Ionicons'
},
{
    value: 'Upcoming',
    iconName: 'md-time-outline',
    source: 'Ionicons'
},
{
    value: 'Tutor',
    iconName: 'md-people-outline',
    source: 'Ionicons'
},
{
    value: 'Setting',
    iconName: 'settings',
    source: 'Ionicons'
},
]