import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, Alert, TextInput, createContext } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useState } from 'react';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebaseConfig';
import { collection, getDoc, doc } from "firebase/firestore";

const Tab = createMaterialTopTabNavigator();
export const Context = React.createContext();



const RoutinePlay = ({ route, navigation }) => {
    const notes = [
        {
            data: "215lbs",
            expandedData: "Personal Record: "
        },
        {
            data: "25x",
            expandedData: "Sets this week: "
        },
        {
            data: "135lbs",
            expandedData: "Previous top set: "
        },
        {
            data: "4x",
            expandedData: "Average sets: "
        },

    ];
    const [selectedNote, setselectedNote] = useState(0);


    const routine = route.params.routine;
    const [exercises, setexercises] = useState([]);
    /*Each exercise has a respective array of exercisePerformed objects which hold 
    *routineLog -
    * [
    *     exerciseLog  - {
    *          exercise: ...exerciseObject,
    *          exerciseLogs: [
    *                           type: // the type of log this is ( weight, time, completed)
    *                       ],
    *          unit: //(either lbs, time, or completion)
    *          sets: //number of exercisLogs( number of sets done of this exercise)
    *      }
    * ]
    */
    const [routineLog, setroutineLog] = useState([]);

    //This function will load in randomized notes one by one
    //Note: this simply comsumes statistics from the database, 
    // and the statistics should be updated on recent login by cloud functions
    async function getNotes() {

    }

    useEffect(() => {

    }, [routine])
    return (
        //This Context provider allows all the PlayScreens to update the routine log as exercises are performed
        <Context.Provider valye={{ rL: [routineLog, setroutineLog] }}>
            {/* <Text></Text>
                <View style={style.linebreak}></View>
                <View style={style.descBox}></View>
                {/* Note Box 
                <FlatList
                    data={notes}
                    horizontal
                    renderItem={({ item }) => (
                        <TouchableOpacity style={selectedNote === notes.indexOf(item) ? selectedNote : note} onPress={() => { setselectedNote(notes.indexOf(item)) }}>
                            <Text>{selectedNote === notes.indexOf(item) ? item.expandedData : item.data}</Text>
                        </TouchableOpacity>
                    )}
                /> */}
            <Tab.Navigator
                style={style.topTabStyle}
                tabBarOptions={{
                    activeTintColor: '#000000',
                    indicatorStyle: {
                        backgroundColor: '#5D4DE4',
                    },
                    tabBarLabelStyle: {
                        fontFamily: 'nunito'
                    },

                }}
                screenOptions={{
                    tabBarScrollEnabled: true,

                }}
            >
                {
                    exercises.length === 0 ?
                        <>
                            <Tab.Screen name="empty" key="default" component={Text} />
                        </> :

                        exercises.map((exercise) => (
                            <Tab.Screen name={exercise} key={exercise} component={Text} initialParams={{ exercise: exercise }} />
                        ))
                }
            </Tab.Navigator>


        </Context.Provider >
    )
}

const style = StyleSheet.create({
    descBox: {
        width: '70%',
        maxHeight: 500
    },
    noteBox: {
        flex: 1,
    },
    note: {
        width: 40,
        height: 40
    },
    noteSelected: {
        widht: '40%'
    },
    linebreak: {
        borderWidth: 1,
        heigh: 1,
        width: '70%'
    },
    page: {
        alignItems: 'center'
    },
    buttonBox: {
        flexDirection: 'row',
        backgroundColor: '#F8F8FF',
        justifyContent: 'space-between',
        width: '100%'
    },
    button: {
        marginTop: 5,
        borderRadius: 30,
        padding: 10,
        width: 250,
        borderWidth: 1,
        borderColor: "#5D4DE4",
        alignItems: 'center'
    },
    buttonSmall: {
        borderRadius: 30,
        width: 60,
        height: 30,
        margin: 10,
        borderWidth: 1,
        borderColor: "#5D4DE4",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
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
    //------------------------------------------
})

export default RoutinePlay