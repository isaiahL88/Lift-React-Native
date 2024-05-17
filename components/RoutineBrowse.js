import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, Alert, Icon } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebaseConfig';
import { useEffect, useState, useRef, createRef } from 'react';
import DayScreen from './DayScreen';

const Tab = createMaterialTopTabNavigator();

/*
    todo: add the routine name somewhere, hopefully above the top navigation like android
*/
const RoutineBrowse = ({ route, navigation }) => {
    const { routine, context } = route.params;
    //Each day in the routine
    //Note each day will be maped to a RoutineDay component
    const [user, setuser] = useState();
    const [days, setDays] = useState();
    const [splitDays, setSplitDays] = useState(); //map
    const [refs, setrefs] = useState(); //map

    useEffect(() => {
        FIREBASE_AUTH.onAuthStateChanged(user => {
            if (user) { setuser(user); }
        });



    }, []);

    useEffect(() => {
        if (user) {
            updateRoutineData();
        }
    }, [user]);

    useEffect(() => {
        console.log(splitDays);
    }, [splitDays])

    const updateSplitData = (day, exercises) => {
        const newMap = new Map();
        newMap.set(day, exercises);
        if (splitDays != null) {
            for (var i in splitDays) {
                newMap.set(i, splitDays[i]);
            }
            setSplitDays(newMap);
        }


    }

    function updateRoutineData() {

        if (context === "browse") {
            let refs = [];

            setSplitDays(routine["splitDays"]);
            setDays(routine["days"]);
        }
    }


    /*  
        This function will get the exercises from each DayScreen and upload the routine into the db

        NOte: the routine may be called from a creation context or even an update context
    */
    async function uploadRoutine() {

        let newRoutine = {
            days: days,
            splitDays: splitDays
        }
        if (context === "browse") {
            // in this case we can just pull up the saved id in the routine
            const userRoutinesRef = doc(collection(FIRESTORE_DB, "users/" + user.uid + "/user-routines/" + routine.id));

        } else if (context === "creation") {
            const userRoutineRef = doc(collection(FIRESTORE_DB, "users/" + user.uid + "/user-routines/"));
        }

    }

    /*
        On press for save button

        This function will collect the 'exercises' array from each Day screen and put it into one splitDays
        map to be uploaded to the datavase
    */
    function saveOnPress() {

    }


    if (days == null || splitDays == null) {
        return (
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: '#5D4DE4',
                    indicatorStyle: {
                        backgroundColor: '#5D4DE4',
                    }
                }}>
                <Tab.Screen
                    name="Empty"
                    component={Text} />
            </Tab.Navigator >
        )
    } else {
        return (
            <>
                <Text style={style.bigHeader}>{routine.name}</Text>
                <Tab.Navigator
                    tabBarOptions={{
                        activeTintColor: '#5D4DE4',
                        indicatorStyle: {
                            backgroundColor: '#5D4DE4',
                        }
                    }}>
                    {
                        days != null && splitDays != null ?
                            <>
                                {
                                    days.map((day) => (
                                        // maps days to screens in the tab navigator
                                        // day is just the title and dayData is an array of exercies taken from split days
                                        <Tab.Screen name={day} key={day} component={DayScreen} initialParams={{ day: day, dayData: splitDays[day], context: "browse", updateSplit: updateSplitData }} />
                                    ))
                                }
                            </>
                            :
                            <Text>Loading</Text>
                    }
                </Tab.Navigator>

            </>

        )
    }


}


const style = StyleSheet.create({
    bigHeader: {
        fontSize: 30,
        fontFamily: 'nunito',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    exercise: {
        width: "100%",
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 45,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    exerciseText: {
        fontSize: 25,
        fontFamily: 'nunito'
    },
    exerciseList: {
        marginTop: 15
    },
    exerciseDescr: {
        width: 120,
        textAlign: 'right'
    },
    exerciseDescrNote: {
        width: 200,
        textAlign: 'right'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        paddingRight: 100,
        paddingLeft: 100,
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeButton: {
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
    mediumText: {
        fontSize: 20,
        fontFamily: 'nunito'
    }
});

export default RoutineBrowse