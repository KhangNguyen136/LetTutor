import React from 'react';
import { SafeAreaView, Text, View, FlatList, Image, TouchableOpacity, StyleSheet, LogBox } from 'react-native';

import { globalStyles } from '../../../styles/globalStyles';
import Card from '../../../components/card';
import { MyButton, GetIcon } from '../../../components/button';
import { ScrollView } from 'react-native-gesture-handler';
import Tag from '../../../components/tag';
import { Rating } from 'react-native-ratings';

export default function CourseDetail({ navigation, route }) {
    const { data } = route.params
    React.useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])
    const Topic = ({ item }) => {
        return (
            <Text style={globalStyles.title2} >{item.label}</Text>
        )
    }
    return (
        <SafeAreaView style={globalStyles.container} >
            <ScrollView>
                <Card>
                    <View style={{ flexDirection: 'row', padding: 1 }} >
                        <Image source={{ uri: data.img }} style={{ width: 150, height: 150 }} />
                        <View style={{ marginHorizontal: 5, flex: 1 }} >
                            <Text style={globalStyles.titleName} >{data.name}</Text>
                            <View style={styles.rowContainer} >
                                <Text style={globalStyles.title2} >Specialies: </Text>
                                <Tag item={data.tag[0]} />
                            </View>
                            <View style={styles.rowContainer} >
                                <Text style={globalStyles.title2} >Level: </Text>
                                <Tag item={data.level} />
                            </View>
                            <View style={styles.rowContainer} >
                                <Text style={globalStyles.title2} >Couse length:  </Text>
                                <Text> {data.nlesson} topics</Text>
                            </View>
                            <Rating readonly={true}
                                startingValue={data.rating}
                                style={{ marginVertical: 3, alignSelf: 'flex-start' }}
                                imageSize={20}
                            />
                            <TouchableOpacity style={{ ...styles.rowContainer, alignSelf: 'flex-end' }} onPress={() => navigation.navigate('DiscoverCourse', { data: listTopic })} >
                                <Text style={{ color: '#3399ff', fontSize: 16 }} >Discover</Text>
                                <GetIcon iconName={'right'} source={'AntDesign'} size={14} color={'#3399ff'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={globalStyles.verticalDivide} />
                    <Text style={globalStyles.title1}>Over view: </Text>
                    <View style={styles.rowContainer} >
                        <GetIcon iconName={'notification'} source={'AntDesign'} size={18} color={'#10ac84'} />
                        <Text style={globalStyles.title2}>Intro </Text>
                    </View>
                    <Text style={{ margin: 5 }} >{data.intro}</Text>
                    <View style={globalStyles.verticalDivide} />
                    <View style={styles.rowContainer} >
                        <GetIcon iconName={'questioncircleo'} source={'AntDesign'} size={18} color={'#ff9f43'} />
                        <Text style={globalStyles.title2}>Why take this coures </Text>
                    </View>
                    <Text style={{ margin: 5 }} >{why}</Text>
                    <View style={globalStyles.verticalDivide} />
                    <View style={styles.rowContainer} >
                        <GetIcon iconName={'questioncircleo'} source={'AntDesign'} size={18} color={'#ff9f43'} />
                        <Text style={globalStyles.title2}>What will you able to do </Text>
                    </View>
                    <Text style={{ margin: 5 }} >{able}</Text>
                    <View style={globalStyles.verticalDivide} />
                    <View style={styles.rowContainer} >
                        <GetIcon iconName={'format-list-bulleted'} source={'MaterialCommunityIcons'} size={20} color={'#00d2d3'} />
                        <Text style={globalStyles.title1}>List topic </Text>
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 10 }}>
                        <FlatList data={listTopic}
                            renderItem={Topic} keyExtractor={item => item.value} scrollEnabled={true} />
                    </View>
                </Card>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row', alignItems: 'center', marginVertical: 1
    }
})

const listTopic = [
    { label: '1. Cooking', value: '1. Cooking' },

    { label: '2. Your Dream Job', value: '2. Your Dream Job' },


    { label: '3. Sports Fitness', value: '3. Sports Fitness' },


    { label: '4. Service Animals', value: '4. Service Animals' },


    { label: '5. Social Activities', value: '5. Social Activities' },


    { label: '6. Your Ideal Day', value: '6. Your Ideal Day' },


    { label: '7. Childhood Friendships', value: '7. Childhood Friendships' },


    { label: '8. The Importance of Family', value: '8. The Importance of Family' },


    { label: '9. City Life', value: '9. City Life' },


    { label: '10. Online Shopping', value: '10. Online Shopping' }

]
const why = 'Looking for some variety in your lesson topics? Immerse yourself in English discussion with this set of engaging topics.'
const able = 'This course covers vocabulary at the CEFR B1-B2 levels. You will work on improving fluency and comprehension by discussing a variety of topics. In addition, you will receive corrections from a native English speaker to help improve your grammatical accuracy.'