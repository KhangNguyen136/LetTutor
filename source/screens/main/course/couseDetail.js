import React from 'react';
import { SafeAreaView, Text, View, FlatList, Image, TouchableOpacity, StyleSheet, LogBox } from 'react-native';

import { globalStyles } from '../../../styles/globalStyles';
import Card from '../../../components/card';
import { MyButton, GetIcon } from '../../../components/button';
import { ScrollView } from 'react-native-gesture-handler';
import Tag from '../../../components/tag';
import { getListTag } from '../../../bussiness/course';
import ListTag from '../../../components/list/listTag';
import { getLevelTitle } from '../../../bussiness/course';

export default function CourseDetail({ navigation, route }) {
    const { data } = route.params
    data.topics = sortTopicsByOrder(data.topics);
    const listTag = getListTag(data.categories);
    React.useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])
    const toSlide = (order) => {
        navigation.navigate('DiscoverCourse', { data: data.topics, order })
    }
    const Topic = ({ item }) => {
        return (
            <Text style={globalStyles.title2} onPress={() => toSlide(item.orderCourse)} > {item.orderCourse + 1}. {item.name}</Text>
        )
    }
    return (
        <SafeAreaView style={globalStyles.container} >
            <ScrollView>
                <Card>
                    <View style={{ flexDirection: 'row', padding: 1 }} >
                        <Image source={{ uri: data.imageUrl }} style={{ width: 150, height: 150 }} />
                        <View style={{ marginHorizontal: 5, flex: 1, justifyContent: 'space-between' }} >
                            <Text style={globalStyles.titleName} >{data.name}</Text>
                            <View style={styles.rowContainer} >
                                <Text style={globalStyles.title2} >Level: </Text>
                                <Tag item={getLevelTitle(data.level)} />
                            </View>
                            <View style={styles.rowContainer} >
                                <Text style={globalStyles.title2} >Couse length:  </Text>
                                <Text> {data.topics.length} topics</Text>
                            </View>
                            {/* <Rating readonly={true}
                                startingValue={data.rating}
                                style={{ marginVertical: 3, alignSelf: 'flex-start' }}
                                imageSize={20}
                            /> */}
                            <TouchableOpacity style={{ ...styles.rowContainer, alignSelf: 'flex-end', }} onPress={() => toSlide(0)} >
                                <Text style={{ color: '#3399ff', fontSize: 16 }} >Discover</Text>
                                <GetIcon iconName={'right'} source={'AntDesign'} size={14} color={'#3399ff'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.rowContainer} >
                        <Text style={globalStyles.title2} >Specialies: </Text>
                        <ListTag tags={listTag} />
                    </View>
                    <View style={globalStyles.verticalDivide} />
                    <Text style={globalStyles.title1}>Over view: </Text>
                    <View style={styles.rowContainer} >
                        <GetIcon iconName={'notification'} source={'AntDesign'} size={18} color={'#10ac84'} />
                        <Text style={globalStyles.title2}>Intro </Text>
                    </View>
                    <Text style={{ margin: 5 }} >{data.description}</Text>
                    <View style={globalStyles.verticalDivide} />
                    <View style={styles.rowContainer} >
                        <GetIcon iconName={'questioncircleo'} source={'AntDesign'} size={18} color={'#ff9f43'} />
                        <Text style={globalStyles.title2}>Why take this coures </Text>
                    </View>
                    <Text style={{ margin: 5 }} >{data.reason}</Text>
                    <View style={globalStyles.verticalDivide} />
                    <View style={styles.rowContainer} >
                        <GetIcon iconName={'questioncircleo'} source={'AntDesign'} size={18} color={'#ff9f43'} />
                        <Text style={globalStyles.title2}>What will you able to do </Text>
                    </View>
                    <Text style={{ margin: 5 }} >{data.purpose}</Text>
                    <View style={globalStyles.verticalDivide} />
                    <View style={styles.rowContainer} >
                        <GetIcon iconName={'format-list-bulleted'} source={'MaterialCommunityIcons'} size={20} color={'#00d2d3'} />
                        <Text style={globalStyles.title1}>List topic </Text>
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 10 }}>
                        <FlatList data={data.topics}
                            renderItem={Topic} keyExtractor={item => item.id} scrollEnabled={true} />
                    </View>
                </Card>
            </ScrollView>
        </SafeAreaView>
    )
}

function sortTopicsByOrder(topics) {
    return topics.sort((a, b) => a.orderCourse - b.orderCourse);
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row', alignItems: 'center', marginVertical: 1
    }
})

