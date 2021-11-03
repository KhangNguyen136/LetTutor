import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput } from 'react-native';
import { MyButton } from '../../components/button';
import Card from '../../components/card';
import { globalStyles } from '../../styles/globalStyles';
import { GetIcon } from '../../components/button';
import { Rating } from 'react-native-ratings';

export default function Booking({ navigation, route }) {
    const { data } = route.params
    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                <Image source={require('../../../assets/botAvt.jpg')} style={{ width: 120, height: 120, alignSelf: 'center' }}  ></Image>
                <View style={{ margin: 5 }} >
                    {/* <Text style={globalStyles.title1}>Booking information: </Text> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <GetIcon iconName={'chalkboard-teacher'} source={'FontAwesome5'} size={18} />
                        <Text style={globalStyles.title2} > Tutor: </Text>
                        <Text style={globalStyles.titleName} >{data.name}</Text>
                    </View>
                    <View style={globalStyles.verticalDivide} />
                    <View style={styles.rowItem} >
                        <GetIcon iconName={'calendar'} source={'AntDesign'} size={18} />
                        <Text style={globalStyles.title2}>Booking date:</Text>
                        <Text style={{ marginLeft: 4, fontSize: 16 }} >{data.date.toString().substr(0, 16)}</Text>
                    </View>
                    <View style={globalStyles.verticalDivide} />
                    <View style={styles.rowItem} >
                        <GetIcon iconName={'clockcircleo'} source={'AntDesign'} size={18} />
                        <Text style={globalStyles.title2}>Booking time:</Text>
                        <Text style={{ marginLeft: 4, fontSize: 16 }} >{data.time}</Text>
                    </View>
                    <View style={globalStyles.verticalDivide} />
                    <View style={styles.rowItem} >
                        <GetIcon iconName={'price-tag'} source={'Entypo'} size={18} />
                        <Text style={globalStyles.title2}>Price: </Text>
                        <Text style={{ marginLeft: 4, fontSize: 16 }} > 1 lesson</Text>
                    </View>
                    <View style={globalStyles.verticalDivide} />

                    <View style={styles.rowItem} >
                        <GetIcon iconName={'wallet'} source={'Entypo'} size={18} />
                        <Text style={globalStyles.title2} > Your balance: </Text>
                        <Text style={{ fontSize: 16 }} > 3 lessons left</Text>
                    </View>
                    <View style={globalStyles.verticalDivide} />
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', margin: 3, marginTop: 10 }} >
                        <Text style={globalStyles.title2} >Note </Text>
                        <View style={{ flex: 1 }} >
                            <Card>
                                <TextInput placeholder={'What you want the tutor know?'} multiline={true} style={{ minHeight: 80 }} />
                            </Card>
                        </View>
                    </View>
                </View>
            </Card>
            <MyButton title={'Book'} moreStyle={globalStyles.authBtnContainer} moreTitleStyle={{ color: 'white' }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    rowItem: {
        flexDirection: 'row', alignItems: 'center',
        margin: 5
    }

})