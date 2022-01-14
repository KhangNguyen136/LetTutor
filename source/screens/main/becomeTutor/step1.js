import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../../styles/globalStyles';
import TextInputCard from '../../../components/TextInputCard';
import CountryPicker from '../../../components/countryPicker';
import DatePicker from '../../../components/datePicker';
import Card from '../../../components/card';
import { RadioButton } from 'react-native-paper';
import { MyButton } from '../../../components/button';
import Step from '../../../components/stepProcess';
import PickWantToLearn from '../../../components/pickWantToLearn';
import { wrapScrollView, useScrollIntoView } from 'react-native-scroll-into-view'
import { showMessage } from 'react-native-flash-message';
import { launchImageLibrary } from 'react-native-image-picker';
import LanguagePicker from '../../../components/languagePicker';

const CustomScrollView = wrapScrollView(ScrollView)


export default function BecomeTutor1({ navigation }) {
    return (
        <CustomScrollView>
            <MyScreenContent navigation={navigation} />
        </CustomScrollView>
    )
}
function MyScreenContent({ navigation }) {
    const scrollIntoView = useScrollIntoView();
    const [name, setName] = React.useState('');
    const [nameErr, setNameErr] = React.useState('');

    const [avatar, setAvatar] = React.useState(null);
    const [avatarErr, setAvatarErr] = React.useState('');

    const [birthday, setBirthday] = React.useState(new Date());
    const [interests, setInterests] = React.useState('');
    const [interestsErr, setInterestsErr] = React.useState('');
    const [education, setEducation] = React.useState('');
    const [educationErr, setEducationErr] = React.useState('');
    const [experience, setExperience] = React.useState('');
    const [experienceErr, setExperienceErr] = React.useState('');
    const [profession, setProfession] = React.useState('');
    const [professionErr, setProfessionErr] = React.useState('');
    const [languages, setLanguages] = React.useState([]);
    const [languagesErr, setLanguagesErr] = React.useState('');

    const [bio, setBio] = React.useState('');
    const [bioErr, setBioErr] = React.useState('');

    const [targetStudent, setTargetStudent] = React.useState(null);
    const [targetStudentErr, setTargetStudentErr] = React.useState('');

    const [specialties, setSpecialties] = React.useState([]);
    const [specialtiesErr, setSpecialtiesErr] = React.useState('');

    const [country, setCountry] = React.useState('');
    const [countryErr, setCountryErr] = React.useState('');

    const section1Ref = React.useRef(null);
    const section2Ref = React.useRef(null);
    const section3Ref = React.useRef(null);
    const checkInput = () => {
        console.log({ languages, specialties });
        if (avatar == null) {
            setAvatarErr(true);
            scrollIntoView(section1Ref.current, { animated: true })
            return false;
        }
        if (name == '') {
            setNameErr('Please enter your full name');
            scrollIntoView(section1Ref.current, { animated: true })
            return false;
        }
        if (country == '') {
            setCountryErr('Please choose your country');
            scrollIntoView(section1Ref.current, { animated: true })
            return false;
        }
        if (education == '') {
            setEducationErr('Please enter your education');
            scrollIntoView(section2Ref.current, { animated: true })
            return false;
        }
        if (interests == '') {
            setInterestsErr('Please enter your interests');
            scrollIntoView(section2Ref.current, { animated: true })
            return false;
        }
        if (experience == '') {
            setExperienceErr('Please enter your experience')
            scrollIntoView(section2Ref.current, { animated: true })
            return false;
        }
        if (profession == '') {
            setProfessionErr('Please enter your profession')
            scrollIntoView(section2Ref.current, { animated: true })
            return false;
        }
        if (languages.length == 0) {
            setLanguagesErr('Please choose your language')
            scrollIntoView(section3Ref.current, { animated: true })
            return false;
        }
        if (bio == '') {
            setBioErr('Please enter your introduction')
            scrollIntoView(section3Ref.current, { animated: true })
            return false;
        }
        if (targetStudent == null) {
            setTargetStudentErr('Please select your target student')
            scrollIntoView(section3Ref.current, { animated: true })
            return false;
        }
        if (specialties.length == 0) {
            setSpecialtiesErr('Please select your specialies')
            scrollIntoView(section3Ref.current, { animated: true })
            return false;
        }
        return true;
    }

    const pressNext = () => {
        // console.log(checkInput);
        if (!checkInput())
            return
        navigation.navigate('BecomeTutor2', {
            data: {
                avatar, name, country, birthday: birthday.toLocaleDateString(), education, interests, experience, profession, bio, targetStudent, specialties, languages
            }
        })
    }

    const chooseTargetStudent = (value) => {
        setTargetStudentErr('');
        setTargetStudent(value);
    }
    const chooseAvatar = () => {
        launchImageLibrary(options, Response => {
            if (Response.didCancel) {
                return
            }
            else if (Response.errorCode) {
                showMessage({
                    message: 'Action failed', description: Response.errorMessage, type: 'danger'
                })
            }
            else {
                console.log(Response.assets)
                const result = Response.assets[0]
                setAvatar(result);
                setAvatarErr(false);
            }

        })
    }
    return (
        // <SafeAreaView style={globalStyles.container} >
        // {/* <Step step={0} /> */ }
        // < CustomScrollView  >
        <View>
            <Card>
                <Text style={{
                    textAlign: 'center', fontSize: 18, color: '#0984e3',
                    fontWeight: '600', margin: 3
                }} >Step 1: Set up your tutor profile</Text>
                <Text>Your tutor profile is your chance to market yourself to students on Tutoring. You can make edits later on your profile settings page.</Text>
                <Text>New students may browse tutor profiles to find a tutor that fits their learning goals and personality. Returning students may use the tutor profiles to find tutors they've had great experiences with already.</Text>
                <View style={globalStyles.verticalDivide} />
                <Text style={globalStyles.title1} >Basic information: </Text>
                <View style={{ flexDirection: 'row' }} ref={section1Ref} >
                    <View style={{ borderEndWidth: 0.5, borderEndColor: 'gray', padding: 3, paddingEnd: 5 }} >
                        <Text style={globalStyles.title2} > Your avatar: </Text>
                        <TouchableOpacity onPress={chooseAvatar} >
                            {avatar != null ?
                                <Image source={{ uri: avatar.uri }} style={styles.avt} />
                                :
                                <View style={styles.noAvt} >
                                    <Text style={{ fontSize: 13, textAlign: 'center', padding: 3, color: avatarErr ? 'red' : 'black' }} >Upload your avatar here </Text>
                                </View>
                            }

                            <Text style={{ alignSelf: 'center', marginBottom: 4 }} >Click to edit</Text>

                        </TouchableOpacity>
                        <Text style={{ ...globalStyles.guideLine, maxWidth: 120 }} >Please upload a professional photo.</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'space-between' }} >
                        <View>
                            <TextInputCard title={'Full name: '} placeholder={'Enter your name'}
                                value={name} onChangeValue={setName} />
                            {
                                (nameErr != '' && name == '') &&
                                <Text style={globalStyles.error} >{nameErr}</Text>
                            }
                        </View>
                        <View style={globalStyles.verticalDivide} />
                        <View>
                            <CountryPicker value={country} didSelect={setCountry} />
                            {
                                (countryErr != '' && country == '') &&
                                <Text style={globalStyles.error} >{countryErr}</Text>
                            }
                        </View>
                        <View style={globalStyles.verticalDivide} />
                        <DatePicker title={'Birthday:'} value={birthday} onChageValue={setBirthday} />
                    </View>
                </View>
                <View style={globalStyles.verticalDivide} />
                <View ref={section2Ref}>
                    <Text style={globalStyles.title1} >CV: </Text>
                    <Text>Students will view this information on your profile to decide if you're a good fit for them.</Text>
                    <Text style={globalStyles.guideLine} >In order to protect your privacy, please do not share your personal information (email, phone number, social email, skype, etc) in your profile.</Text>
                    <View>
                        <TextInputCard title={'Education: '} value={education} onChangeValue={setEducation}
                            placeholder={"Example: 'Bachelor of Arts in English from Cambly Unisersity.' "} />
                        {
                            (educationErr != '' && education == '') &&
                            <Text style={globalStyles.error} >{educationErr}</Text>
                        }
                    </View>
                    <TextInputCard title={'Interests: '} value={interests} onChangeValue={setInterests}
                        placeholder={"Interests, hobbies, memorable life experiencies or anything else you'd like to share."} />
                    {
                        (interestsErr != '' && interests == '') &&
                        <Text style={globalStyles.error} >{interestsErr}</Text>
                    }
                    <TextInputCard title={'Experence: '} value={experience}
                        placeholder={'Your experence about English'} onChangeValue={setExperience} />
                    {
                        (experienceErr != '' && experience == '') &&
                        <Text style={globalStyles.error} >{experienceErr}</Text>
                    }
                    <TextInputCard title={'Profession'} placeholder={'Your current or previous profession: '} value={profession}
                        onChangeValue={setProfession} />
                    {
                        (professionErr != '' && profession == '') &&
                        <Text style={globalStyles.error} >{professionErr}</Text>
                    }
                </View>
                <View style={globalStyles.verticalDivide} />
                <View ref={section3Ref}>
                    <LanguagePicker value={languages} onChangeValue={setLanguages} />
                    {
                        (languagesErr != '' && languages.length == 0) &&
                        <Text style={globalStyles.error} >{languagesErr}</Text>
                    }
                    <Text style={globalStyles.title1} >Who I teach: </Text>
                    <Text style={globalStyles.guideLine} >This is the first thing students will see when looking for tutors.</Text>
                    <TextInputCard title={'Introduction: '} placeholder={"Example: 'I was a doctor for 35 years and can help you practice business for medical English. I also enjoy teaching beginners as i am very patient, always speak slowly and clearly."}
                        value={bio} onChangeValue={setBio} />
                    {
                        (bioErr != '' && bio == '') &&
                        <Text style={globalStyles.error} >{bioErr}</Text>
                    }
                    <Text style={globalStyles.title2} > I am best at teaching students who are</Text>
                    <View style={{ marginVertical: 5 }}>
                        <TouchableOpacity style={styles.row} onPress={() => chooseTargetStudent('Beginner')}>
                            <RadioButton
                                status={targetStudent == 'Beginner' ? 'checked' : 'unchecked'}
                                onPress={() => chooseTargetStudent('Beginner')}
                                value='Beginner'
                            />
                            <Text style={styles.targetStudent}>Beginner</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.row} onPress={() => chooseTargetStudent('Imtermediate')}>
                            <RadioButton
                                status={targetStudent == 'Imtermediate' ? 'checked' : 'unchecked'}
                                onPress={() => chooseTargetStudent('Imtermediate')}
                                value='Imtermediate'
                            />
                            <Text style={styles.targetStudent}>Imtermediate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.row} onPress={() => chooseTargetStudent('Advanced')}>
                            <RadioButton
                                status={targetStudent == 'Advanced' ? 'checked' : 'unchecked'}
                                onPress={() => chooseTargetStudent('Advanced')}
                                value='Advanced'
                            />
                            <Text style={styles.targetStudent}>Advanced</Text>
                        </TouchableOpacity>
                        {
                            (targetStudentErr != '' && targetStudent == null) &&
                            <Text style={globalStyles.error} >{targetStudentErr}</Text>
                        }
                    </View>
                    <PickWantToLearn title='My specialties are' onChangeValue={setSpecialties} value={specialties} />
                    {
                        (specialtiesErr != '' && specialties.length == 0) &&
                        <Text style={globalStyles.error} >{specialtiesErr}</Text>
                    }
                </View>
                <MyButton title={'Next step'} onPress={pressNext} moreStyle={{ width: '50%' }} />
            </Card>
        </View>
        // </CustomScrollView >
        // {/* </SafeAreaView> */ }
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
    levelChoice: { padding: 5, height: 30, margin: 4 },
    row: {
        flexDirection: 'row', alignItems: 'center',
    },
    targetStudent: {
        fontSize: 15, fontWeight: '600'
    }
})

const options = {
    title: 'Select Image',
    customButtons: [
        {
            name: 'customOptionKey',
            title: 'Choose Photo from Custom Option'
        },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};