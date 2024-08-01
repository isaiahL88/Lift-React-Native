import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebaseConfig';
import { collection, updateDoc, doc } from "firebase/firestore";



const RoutineSetting = ({ navigation, route }) => {
    const [routineName, setroutineName] = useState(route.params.routine.name);
    const [editName, seteditName] = useState(false);
    const [editPrivacy, seteditPrivacy] = useState(false);
    const [privacyPickVal, setprivacyPickVal] = useState(route.params.privacy);
    const [user, setuser] = useState();

    //AUTH
    useEffect(() => {
        FIREBASE_AUTH.onAuthStateChanged(user => {
            if (user) { setuser(user); }
        });

    }, []);

    async function uploadName() {
        try {
            const userRoutineRef = doc(collection(FIRESTORE_DB, "users/" + user.uid + "/user-routines/"), route.params.routine.id);
            await updateDoc(userRoutineRef, {
                name: routineName
            })
        } catch (error) {
            console.log(error);
            Alert.alert("Failed to update routine name.");
        } finally {
            Alert.alert("Updated Routine Name");

            //Change the routine name of the routine and replace it in the route params
            const newRoutine = { ...route.params.routine, 'name': routineName };
            navigation.setParams({ routine: newRoutine });
        }

    }

    async function uploadPrivacy() {
        try {
            const userRoutineRef = doc(collection(FIRESTORE_DB, "users/" + user.uid + "/user-routines/"), route.params.routine.id);
            await updateDoc(userRoutineRef, {
                privacy: privacyPickVal
            })
        } catch (error) {
            console.log(error);
            Alert.alert("Failed to update routine name.");
        } finally {
            Alert.alert("Updated Routine Privacy");
            navigation.setParams({ privacy: privacyPickVal });
        }
    }

    return (
        <View style={style.page}>
            {/* EDIT ROUTINE NAME */}
            <View style={style.nameContainer}>
                <Text style={style.mediumMLText}>Routine Name: </Text>
                <TextInput
                    value={routineName}
                    style={style.textInput}
                    editable={editName} selectTextOnFocus={false}
                    onChangeText={text => setroutineName(text)}
                />
                {
                    editName ?
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                uploadName();
                                seteditName(false);
                            }}>
                                <Icon name={"check"} size={30} color="#5D4DE4" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setroutineName(route.params.routine.name); seteditName(false); }}>
                                <Icon name={"cancel"} size={30} color="#5D4DE4" />
                            </TouchableOpacity>
                        </View>
                        :
                        <TouchableOpacity onPress={() => { seteditName(true); }}>
                            <Icon name={"square-edit-outline"} size={30} color="#5D4DE4" />
                        </TouchableOpacity>
                }

            </View>

            {/* EDIT PRIVACY */}
            <View style={style.privacyContainer}>
                <Text style={style.mediumMLText}>Routine Privacy: </Text>
                <Picker
                    style={style.pickerLong}
                    selectedValue={privacyPickVal}
                    onValueChange={(itemValue) => { setprivacyPickVal(itemValue); seteditPrivacy(true); }}
                >
                    <Picker.Item label="private" value="private" />
                    <Picker.Item label="public" value="public" />
                    <Picker.Item label="friends" value="friends" />
                </Picker>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {editPrivacy ?
                    <>
                        <Text style={style.mediumText}>Change privacy to {privacyPickVal}?</Text>
                        <TouchableOpacity onPress={() => {
                            uploadPrivacy();
                            seteditPrivacy(false);
                        }}>
                            <Icon name={"check"} size={40} color="#5D4DE4" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setprivacyPickVal(route.params.privacy); seteditName(false); }}>
                            <Icon name={"cancel"} size={40} color="#5D4DE4" />
                        </TouchableOpacity>
                    </>
                    :
                    <></>
                }
            </View>

        </View>
    )
}
const style = StyleSheet.create({
    page: {
        alignItems: 'center',
        backgroundColor: '#F8F8FF',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        margin: 0,
        height: '100%'
    },
    privacyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -10
    },
    pickerLong: {
        height: 50,
        width: 150,
        marginBottom: 160,

    },
    nameContainer: {
        marginTop: 100,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 30,
        textAlign: 'center',
        maxWidth: 200,
    },
    //--------------------- Text STUFF ---------------------
    mediumText: {
        fontSize: 20,
        fontFamily: 'nunito'
    },
    mediumMLText: {
        fontSize: 22,
        fontFamily: 'nunito'
    },
    medLText: {
        fontSize: 25,
        fontFamily: 'nunito'
    },
    largeText: {
        fontSize: 30,
        fontFamily: 'nunito'
    },
    buttonSmallText: {
        fontSize: 13,
        fontFamily: 'nunito'
    },
    textItalic: {
        fontSize: 20,
        fontFamily: 'nunitoItalic'
    }
});

export default RoutineSetting