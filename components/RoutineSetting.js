import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebaseConfig';
import { collection, updateDoc, doc } from "firebase/firestore";
const [user, setuser] = useState();



const RoutineSetting = ({ navigation, route }) => {
    const privacyVal = route.params.privacy;
    const [routineName, setroutineName] = useState(route.params.routine.name);
    const [editName, seteditName] = useState(false);
    const [privacyPickVal, setprivacyPickVal] = useState();

    //AUTH
    useEffect(() => {
        FIREBASE_AUTH.onAuthStateChanged(user => {
            if (user) { setuser(user); }
        });

    }, []);

    async function uploadName() {
        try {
            const userRoutineRef = doc(collection(FIRESTORE_DB, "users/" + user.uid + "/user-routines/"), routine.id);
            await updateDoc(userRoutineRef, {
                name: routineName
            })
        } catch (error) {
            console.log(error);
            Alert.alert("Failed to update routine name.");
        } finally {
            Alert.alert("Updated Routine Name");
        }

    }

    return (
        <View style={style.page}>

            <Text>{route.params.privacy} test</Text>
            <View style={style.nameContainer}>
                <Text style={style.medText}>Routine Name</Text>
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
                                <Icon name={"check"} size={10} color="#5D4DE4" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setroutineName(route.params.routine.name); seteditName(false); }}>
                                <Icon name={"cancel"} size={10} color="#5D4DE4" />
                            </TouchableOpacity>
                        </View>
                        :
                        <TouchableOpacity onPress={() => { seteditName(true); }}>
                            <Icon name={"square-edit-outline"} size={10} color="#5D4DE4" />
                        </TouchableOpacity>
                }

            </View>
            <View style={style.privacyContainer}>
                <Text style={style.medLText}>Routine Privacy: </Text>
                <Picker
                    style={style.pickerLong}
                    selectedValue={privacyPickVal}
                    onValueChange={(itemValue) => setprivacyPickVal(itemValue)}
                >
                    <Picker.Item label="private" value="private" />
                    <Picker.Item label="public" value="public" />
                    <Picker.Item label="friends" value="friends" />
                </Picker>
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
        width: '100%',
        height: 400,
        flexDirection: 'row',
        justifyContent: 'center'
    }
            //--------------------- Text STUFF ---------------------
            mediumText: {
        fontSize: 20,
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