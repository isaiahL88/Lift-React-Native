import { View, FlatList, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebaseConfig';
import DayScreen from './DayScreen';


const Tab = createMaterialTopTabNavigator();
const data = [
    { label: 'FullBody / Custom', value: '1' },
    { label: 'Push Pull', value: '2' },
    { label: 'Isolation', value: '3' },
    { label: 'Arnold', value: '4' },
    { label: 'Upper / Lower Body', value: '5' }
];

const RoutineCreate = ({ route, navigtion }) => {
    const [days, setDays] = useState(["Day 1"]);
    const user = FIREBASE_AUTH.currentUser;

    //Routine Split Spinner
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [modalVisible, setmodalVisible] = useState(true);


    //We wait for user to select a template from the modal
    useEffect(() => {
        // FullBody / Custom
        if (value === 1) {
            //nothing to add here
        } else if (value === 2) {
            setDays(["Push Day", "Pull Day", "Leg Day"])
        } else {

        }

    }, [value]);

    const addDay = () => {

    }

    const onSave = () => {

    }

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setmodalVisible(!modalVisible);
                }}>
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <Dropdown
                            style={style.dropdown}
                            placeholderStyle={style.placeholderStyle}
                            selectedTextStyle={style.selectedTextStyle}
                            inputSearchStyle={style.inputSearchStyle}
                            data={data}
                            labelField="label"
                            valueField="value"
                            value={value}
                            maxHeight={300}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(true)}
                            placeholder={!isFocus ? 'Routine Style' : ' ...'}
                            onChange={item => {
                                setValue(item.value);
                                setIsFocus(false);
                            }}
                        />
                        <TouchableOpacity style={style.closeButton} onPress={() => { setmodalVisible(!modalVisible) }}>
                            <Text style={style.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Tab.Navigator>
                {days.map(day => (
                    //For each day creates a new DayScreen with empty list of exercises
                    <Tab.Screen name={day} component={DayScreen} initialParams={{ day: day, dayData: [] }} />
                ))}
            </Tab.Navigator>
            <View style={style.buttonContainer}>
                <TouchableOpacity style={style.button} onPress={() => { addDay() }}>
                    <Text style={style.buttonText}>Add Day</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.button} onPress={() => { onSave() }}>
                    <Text style={style.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    bigHeader: {
        fontSize: 30,
        fontFamily: 'nunito',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, modalView: {
        width: "80%",
        padding: 50,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    dropdown: {
        height: 50,
        width: 200,
        borderColor: '#5D4DE4',
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingLeft: 20
    },
    closeButton: {
        marginTop: 40,
        borderRadius: 30,
        padding: 10,
        borderWidth: 1,
        borderColor: "#5D4DE4"
    },
    button: {
        marginTop: 20,
        borderRadius: 30,
        padding: 10,
        borderWidth: 1,
        borderColor: "#5D4DE4"
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'nunito'
    },
    placeholderStyle: {
        fontSize: 18,
        fontFamily: 'nunito'
    },
    selectedTextStyle: {
        fontSize: 18,
        fontFamily: 'nunito',
        color: '#5D4DE4'
    },
    inputSearchStyle: {
        height: 40,
        fontFamily: 'nunito',
        fontSize: 16,
    },
});

export default RoutineCreate