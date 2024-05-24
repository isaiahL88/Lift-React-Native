import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebaseConfig';
import React, { useEffect, useState, useRef, createRef, useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DayScreen from './DayScreen';
import { TextInput } from 'react-native-paper';

export const Context = React.createContext();

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
    //Did the user stage any changes to this routine
    const [staged, setstaged] = useState(false)
    //Used to see if the dayScreen is in edit mode or in view mode
    const [editMode, seteditMode] = useState(false);
    //Add day modal display
    const [addDayModal, setaddDayModal] = useState(false);
    //Used for the day name in the add day modal
    const [dayName, setdayName] = useState("");


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

    const updateSplitData = (day, exercises) => {
        const newMap = new Map();
        // if (splitDays != null) {
        //     for (var i in splitDays) {
        //         newMap.set(i, splitDays[i]);
        //     }
        //     newMap.set(day, exercises);
        //     setSplitDays(newMap);
        // }
        if (staged === false) {
            setstaged(true);
        }
    }

    function updateRoutineData() {
        if (context === "browse") {
            setSplitDays(routine["splitDays"]);
            setDays(routine["days"]);

        } else if (context === "creation") {
            seteditMode(true);
            setSplitDays([]);
            setDays([]);
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
            <Context.Provider value={[editMode, seteditMode]}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={addDayModal}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setaddDayModal(!addDayModal);
                    }}>
                    <View style={style.centeredView}>
                        <View style={style.modalView}>
                            <Text style={style.largeText}>Add Day</Text>
                            <TextInput
                                value={dayName}
                                style={style.inputStyle}
                                placeholder="Enter Day Name"
                                onChangeText={text => setdayName(text)}
                            />
                        </View>
                    </View>
                </Modal>
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
                                        <Tab.Screen name={day} key={day} component={DayScreen} initialParams={{ day: day, dayData: splitDays[day], context: "browse", updateSplit: updateSplitData, setstaged: setstaged }} />
                                    ))
                                }
                            </>
                            :
                            <Text>Loading</Text>
                    }
                </Tab.Navigator>
                <View style={style.buttonBox}>



                    {/* Edit Button  */
                        context === "browse" ?
                            <TouchableOpacity style={style.editButton} onPress={() => {
                                seteditMode(!editMode);
                                setstaged(false);
                            }}>
                                <Icon name={editMode ? "close" : "square-edit-outline"} size={60} color="#5D4DE4"></Icon>
                            </TouchableOpacity>
                            :
                            <></>
                    }

                    {staged ?
                        /* Save Button  */
                        <TouchableOpacity style={style.saveButton} onPress={() => {
                            uploadRoutine();
                            //after routine is uploaded restore to un-staged and editMode off
                            setstaged(false);
                            seteditMode(false);
                        }}>
                            <Text style={style.mediumText}>Save</Text>
                        </TouchableOpacity>
                        :
                        <>
                        </>
                    }
                </View>

            </Context.Provider>

        )
    }


}


const style = StyleSheet.create({
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
    bigHeader: {
        fontSize: 30,
        fontFamily: 'nunito',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    inputStyle: {
        marginTop: 20,
        width: 320,
        height: 200,
        textAlign: 'left',
        backgroundColor: "#FFFFFF00",
        borderWidth: 1,
        borderColor: "#6F7285",
        margin: 10,
        borderRadius: 10,
        padding: 5,
        fontSize: 25,
        fontFamily: 'nunito',
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

    //--------------------- BUTTON STUFF ---------------------
    closeButton: {
        marginTop: 20,
        borderRadius: 30,
        padding: 10,
        borderWidth: 1,
        borderColor: "#5D4DE4"
    },
    saveButton: {
        borderRadius: 30,
        width: 100,
        height: 50,
        margin: 20,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: "#5D4DE4",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'nunito'
    },
    editButton: {
        margin: 20,
    },
    buttonBox: {
        flexDirection: 'row',
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
    largeText: {
        fontSize: 30,
        fontFamily: 'nunito'
    },
    buttonSmallText: {
        fontSize: 13,
        fontFamily: 'nunito'
    }
    //------------------------------------------
});

export default RoutineBrowse