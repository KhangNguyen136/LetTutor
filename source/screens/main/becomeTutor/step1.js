import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { globalStyles } from '../../../styles/globalStyles';
import TextInputCard from '../../../components/TextInputCard';
import CountryPicker from '../../../components/countryPicker';
import DatePicker from '../../../components/datePicker';
import Card from '../../../components/card';
import { CheckBox } from 'react-native-elements';
import { MyButton } from '../../../components/button';

export default function BecomeTutor1({ navigation }) {
    const [img, setImg] = React.useState(null)
    return (
        <SafeAreaView style={globalStyles.container} >
            <ScrollView style={{ padding: 0 }} >
                <Card>
                    <Text style={{
                        textAlign: 'center', fontSize: 18, color: '#0984e3',
                        fontWeight: '600', margin: 3
                    }} >Step 1: Set up your tutor profile</Text>
                    <Text>Your tutor profile is your chance to market yourself to students on Tutoring. You can make edits later on your profile settings page.</Text>
                    <Text>New students may browse tutor profiles to find a tutor that fits their learning goals and personality. Returning students may use the tutor profiles to find tutors they've had great experiences with already.</Text>
                    <View style={globalStyles.verticalDivide} />
                    <Text style={globalStyles.title1} >Basic information: </Text>
                    <View style={{ flexDirection: 'row' }} >
                        <View style={{ borderEndWidth: 0.5, borderEndColor: 'gray', padding: 3, paddingEnd: 5 }} >
                            <Text style={globalStyles.title2} > Your avatar: </Text>
                            {img != null ?
                                <Image style={styles.avt} />
                                :
                                <View style={styles.noAvt} >
                                    <Text style={{ fontSize: 13, textAlign: 'center', padding: 3 }} >Upload your avatar here </Text>
                                </View>
                            }
                            <Text style={{ alignSelf: 'center' }} >Click to edit</Text>
                            <Text style={{ ...globalStyles.guideLine, maxWidth: 120 }} >Please upload a professional photo.</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'space-between' }} >
                            <TextInputCard title={'Full name: '} placeholder={'Enter your name'} />
                            <View style={globalStyles.verticalDivide} />
                            <CountryPicker />
                            <View style={globalStyles.verticalDivide} />
                            <DatePicker title={'Birthday:'} />
                        </View>
                    </View>
                    <View style={globalStyles.verticalDivide} />
                    <Text style={globalStyles.title1} >CV: </Text>
                    <Text>Students will view this information on your profile to decide if you're a good fit for them.</Text>
                    <Text style={globalStyles.guideLine} >In order to protect your privacy, please do not share your personal information (email, phone number, social email, skype, etc) in your profile.</Text>
                    <TextInputCard title={'Education: '} placeholder={"Example: 'Bachelor of Arts in English from Cambly Unisersity.' "} />
                    <TextInputCard title={'Interests: '} placeholder={"Interests, hobbies, memorable life experiencies or anything else you'd like to share."} />
                    <TextInputCard title={'Experence: '} />
                    <TextInputCard title={'Current or previous profession: '} />
                    <View style={globalStyles.verticalDivide} />
                    <Text style={globalStyles.title1} >Who I teach: </Text>
                    <Text style={globalStyles.guideLine} >This is the first thing students will see when looking for tutors.</Text>
                    <TextInputCard title={'Introduction: '} placeholder={"Example: 'I was a doctor for 35 years and can help you practice business for medical English. I also enjoy teaching beginners as i am very patient, always speak slowly and clearly."} />
                    <Text style={globalStyles.title2} > I am best at teaching students who are</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <CheckBox
                            size={15}
                            title='Beginner'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            containerStyle={{ padding: 3, height: 30, width: 100, margin: 0 }}

                        // checked={this.state.checked}
                        />
                        <CheckBox
                            size={15}
                            title='Imtermediate'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            containerStyle={{ padding: 3, height: 30, width: 125, margin: 0 }}

                        // checked={this.state.checked}
                        />
                        <CheckBox
                            size={15}
                            style={{ width: 100, }}
                            title='Advanced'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            textStyle={{ fontSize: 13 }}
                            containerStyle={{ padding: 3, height: 30, width: 100, margin: 0 }}
                        // checked={this.state.checked}
                        />
                    </View>
                    <Text style={globalStyles.title2}>My specialties are: </Text>
                    <CheckBoxSquare title={'English for kids'} />
                    <CheckBoxSquare title={'English for Business'} />
                    <CheckBoxSquare title={'Conversational'} />
                    <CheckBoxSquare title={'TOEIC'} />
                    <CheckBoxSquare title={'IELTS'} />
                    <CheckBoxSquare title={'TOEFL'} />
                    <MyButton title={'Next step'} onPress={() => navigation.navigate('BecomeTutor2')} moreStyle={{ width: '50%' }} />
                </Card>
            </ScrollView>
        </SafeAreaView>
    )
}

const CheckBoxSquare = ({ title }) => {
    return (
        <CheckBox
            title={title}
        // checked={this.state.checked}
        />
    )
}

const styles = StyleSheet.create({
    avt: {
        width: 120,
        height: 120,
        borderRadius: 5
    },
    noAvt: {
        height: 120, width: 120,
        borderRadius: 5, borderWidth: 0.5, borderStyle: 'dashed',
        borderColor: 'gray', justifyContent: 'center', alignItems: 'center'
    },

})