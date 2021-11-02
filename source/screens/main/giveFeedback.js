import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput } from 'react-native';
import { MyButton } from '../../components/button';
import Card from '../../components/card';
import { globalStyles } from '../../styles/globalStyles';
import { GetIcon } from '../../components/button';
import { Rating } from 'react-native-ratings';

export default function GiveFeedback({ navigation, route }) {
    const { data } = route.params
    console.log(data)
    const isEdit = data.rating != -1
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
                        <Text style={globalStyles.title2}>Booking time:</Text>
                        <Text style={{ marginLeft: 4, fontSize: 16 }} >{data.date.toString().substr(0, 24)}</Text>
                    </View>
                    <View style={globalStyles.verticalDivide} />

                    <View style={styles.rowItem} >
                        <GetIcon iconName={'md-time-outline'} source={'Ionicons'} size={18} />
                        <Text style={globalStyles.title2}>Lesson time:</Text>
                        <Text style={{ marginLeft: 4, fontSize: 16 }} > {data.time}</Text>
                    </View>
                    <View style={globalStyles.verticalDivide} />

                    <View style={styles.rowItem} >
                        <GetIcon iconName={'notes'} source={'MaterialIcons'} size={18} />
                        <Text style={globalStyles.title2} > Booking note: </Text>
                        <Text style={{ fontSize: 16 }} > first lesson</Text>
                    </View>
                    <View style={globalStyles.verticalDivide} />
                    <View style={styles.rowItem} >
                        <Text style={globalStyles.title2} >Rate: </Text>
                        <Rating
                            startingValue={isEdit ? data.rating : 0}
                            style={{ margin: 3, alignSelf: 'flex-start' }}
                            imageSize={20}
                        />
                    </View>
                    <View style={globalStyles.verticalDivide} />
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', margin: 3, marginTop: 10 }} >
                        <Text style={globalStyles.title2} >Comment: </Text>
                        <View style={{ flex: 1 }} >
                            <Card>
                                <TextInput placeholder={'Say something about the lesson or tutor'} multiline={true} style={{ minHeight: 80 }} />
                            </Card>
                        </View>
                    </View>
                </View>
            </Card>
            <MyButton title={isEdit ? "Save" : "Done"} moreStyle={globalStyles.authBtnContainer} moreTitleStyle={{ color: 'white' }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    rowItem: {
        flexDirection: 'row', alignItems: 'center',
        margin: 5
    }

})