import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebaseConfig';
import { collection, setDoc, doc } from "firebase/firestore";
import React, { useEffect, useState, useRef, createRef, useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DayScreen from './DayScreen';
import { TextInput } from 'react-native-paper';
import { Picker } from "@react-native-picker/picker";

export const Context = React.createContext();

const MODE_CREATION = "creation";


const Tab = createMaterialTopTabNavigator();

/*
    Pre Cond:
        context == creations? 
            Then there should first be 


*/
const RoutineBrowse = ({ route, navigation }) => {
    //Routines
    const routineStyles = [{
        name: "Custom Routine",
        target: "Build from Scratch!",
        days: 0,
        daysArr: [],
        splitDays: {},
    }
        ,
    {
        name: 'Push Pull Legs',
        target: 'PowerLifting / BodyBuilding',
        days: 3,
        daysArr: ["Push", "Pull", "Legs"],
        splitDays: { Push: [], Pull: [], Legs: [] },
    }
        ,
    {
        name: 'Arnold Split',
        target: 'Body Building',
        days: 3,
        daysArr: ["Chest Back", "Shoulders & Arms", "Legs"],
        splitDays: { 'Chest Back': [], 'Shoulders & Arms': [], 'Legs': [] }
    }
        ,
    {
        name: 'Bro Split',
        target: 'Body Building',
        days: 5,
        daysArr: ["Chest", "Back", "Arms", "Shoulders", "Legs"],
        splitDays: {
            "Chest": [], "Back": [], "Arms": [], "Shoulders": [], "Legs": []
        }
    }
        ,
    {
        name: 'Upper Lower',
        target: 'Body Building',
        days: 2,
        daysArr: ["Upper", "Lower"],
        splitDays: { Upper: [], Lower: [] }
    }
        ,
    {
        name: 'Leg Specialist',
        target: 'BodyBuilding',
        days: 5,
        daysArr: ["Leg Push", "Upper Push", "Legs Pull", "Upper Pull", "Leg Compounds"],
        splitDays: { "Leg Push": [], "Upper Push": [], "Legs Pull": [], "Upper Pull": [], "Leg Compounds": [] }
    }
    ];

    const routine = route.params.routine;
    const context = route.params.context;

    const [user, setuser] = useState();

    // ------------ Routine Data ----------------
    const [days, setDays] = useState([]);
    const [splitDays, setSplitDays] = useState(); //map
    const [routineName, setroutineName] = useState();
    const [routinePrivacy, setroutinePrivacy] = useState();
    //-------------------------------------------

    //Did the user stage any changes to this routine
    const [staged, setstaged] = useState(false)
    //Used to see if the dayScreen is in edit mode or in view mode
    const [editMode, seteditMode] = useState(false);
    //Add day modal display
    const [addDayModal, setaddDayModal] = useState(false);
    //Select Style Modal
    const [styleSelectModal, setstyleSelectModal] = useState(false);
    //Used for the day name in the add day modal
    const [dayName, setdayName] = useState("");

    //----- New Routine State -----
    const [newRoutineModal, setnewRoutineModal] = useState(context === "creation" ? true : false); //Risky code?
    const [nameInput, setnameInput] = useState();
    //----- Privacy Picker -----
    const [privacyPickVal, setprivacyPickVal] = useState();
    //----- BackUp Sate ----
    // This is used from a "browse" context when staged changes are cancelled

    useEffect(() => {
        FIREBASE_AUTH.onAuthStateChanged(user => {
            if (user) { setuser(user); }
        });


    }, []);

    useEffect(() => {
        console.log("UPDATED SPLIT DAYS: " + JSON.stringify(splitDays));
    }, [splitDays]);

    useEffect(() => {
        if (user) {
            updateRoutineData();
        }
    }, [user]);


    function updateRoutineData() {
        if (context === "browse") {
            setSplitDays(routine["splitDays"]);
            setDays(routine["days"]);
            setroutineName(routine["name"]);
            setroutinePrivacy(routine["privacy"]);

        } else if (context === MODE_CREATION) {
            setnewRoutineModal(true);
            seteditMode(true);
            setSplitDays([]);
            setroutineName("");
            setroutinePrivacy("");
        }
    }

    /*
        *New Function Todo* Which we reload this routine data from the server if the user
        Cancels it's staged changes
    
    */

    /*  
        This function will get the exercises from each DayScreen and upload the routine into the db
    
        NOte: the routine may be called from a creation context or even an update context
    */
    async function uploadRoutine() {
        console.log('Context: ' + context + ", uplaodingn..........");


        if (context === "browse") {
            // UPDATING ROUTINE
            let newRoutine = {
                name: routineName,
                id: routine.id,
                privacy: routine.privacy,
                style: routine.style,
                muscleGroups: routine.muscleGroups,
                days: days,
                splitDays: splitDays
            }
            console.log("NEW ROUTINE TO BE UPLOADED: " + JSON.stringify(newRoutine));
            // in this case we can just pull up the saved id in the routine
            const userRoutinesRef = doc(collection(FIRESTORE_DB, "users/" + user.uid + "/user-routines/"), routine.id);
            await setDoc(userRoutinesRef, newRoutine)
                .then((docRef) => {
                    Alert.alert('Routine Updated! with ID: ' + docRef.id);
                    console.log('Routine Updated! with ID: ' + docRef.id)
                });

        } else if (context === MODE_CREATION) {
            let newRoutine = {
                name: routineName,
                privacy: privacyPickVal,
                days: days,
                splitDays: splitDays
            };
            console.log("ABOUT TO UPLOAD HERE");
            try {
                const userRoutineRef = doc(collection(FIRESTORE_DB, "users/" + user.uid + "/user-routines/"));
                await setDoc(userRoutineRef, newRoutine);
                Alert.alert("Uploaded Routine!");
            } catch (error) {
                console.log(error);
            }


        }
        console.log('Context: ' + context);


    }

    return (
        <Context.Provider value={{ em: [editMode, seteditMode,], sd: [splitDays, setSplitDays] }}>

            {/* ROUTINE CREATION PROCESS :
                    NewRoutineModal -> styleSelectModal -> addDayModal? -> Routine Browse
                                                        -> Routine Browse (TODO)
                Also:                   press add day   -> addDayModal
            */}


            {/* New Routine Modal (ONLY USED WHEN CONTEXT IS CREATION)
                        - opens once when the routine browse is first opened*

                    Data Needed from this modal:
                        - name
                        - id?
                        - privacy
                */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={newRoutineModal}
                onRequestClose={() => {
                    Alert.alert('New Routine Modal Closed');
                    setnewRoutineModal(!newRoutineModal);
                }}
            >
                <View style={style.centeredView}>
                    <View style={style.createModalView}>
                        <TouchableOpacity style={style.closeButtonSmall} onPress={() => { setnewRoutineModal(false) }}>
                            <Icon name={"close"} size={40} color="#5D4DE4" />
                        </TouchableOpacity>
                        <Text style={[style.largeText, style.header]}>New Routine</Text>
                        <TextInput
                            style={style.inputStyleSmall}
                            value={nameInput}
                            placeholder="Enter Routine Name"
                            onChangeText={text => setnameInput(text)}
                        />
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

                        <TouchableOpacity style={[style.button, { marginBottom: 15 }]}
                            onPress={() => {
                                setroutineName(nameInput);
                                setroutinePrivacy(privacyPickVal);
                                navigation.setOptions({ headerTitle: nameInput });
                                setnewRoutineModal(false);
                                setstyleSelectModal(true);
                            }}
                        >
                            <Text style={style.mediumText}>Start Routine Creation!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* Style Selection Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={styleSelectModal}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setstyleSelectModal(!styleSelectModal);
                }}>
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <FlatList
                            style={style.styleList}
                            data={routineStyles}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={style.routineStyle} onPress={() => {
                                    //Update state according to the selected style
                                    setDays(item.daysArr);
                                    setSplitDays(item.splitDays);
                                    setstyleSelectModal(false);
                                    if (item.name === "Custom Routine") {
                                        setaddDayModal(true);
                                    }
                                    seteditMode(true);

                                }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={style.mediumText}>{item.name}</Text>
                                        <Text style={style.mediumText}>Days: {item.days}</Text>
                                    </View>
                                    <Text style={style.textItalic}>{item.target}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
            {/* Add Day Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={addDayModal}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setaddDayModal(!addDayModal);
                }}>
                <View style={style.centeredView}>
                    <View style={style.createModalView}>
                        <TouchableOpacity style={style.closeButtonSmall} onPress={() => { setaddDayModal(false) }}>
                            <Icon name={"close"} size={40} color="#5D4DE4" />
                        </TouchableOpacity>
                        <Text style={style.largeText}>Add Day</Text>
                        <TextInput
                            value={dayName}
                            style={style.inputStyleSmall}
                            placeholder="Enter Day Name"
                            onChangeText={text => setdayName(text)}
                        />
                        <TouchableOpacity style={style.closeButton} onPress={() => {
                            const newObj = { ...splitDays, [dayName]: [] }
                            setSplitDays(newObj);
                            seteditMode(true);
                            setDays([...days, dayName]);
                            setdayName("");
                            setaddDayModal(false);
                        }}>
                            <Text style={style.buttonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
                    days != 0 ?
                        <>
                            {
                                days.map((day) => (
                                    // maps days to screens in the tab navigator
                                    // day is just the title and dayData is an array of exercies taken from split days
                                    <Tab.Screen name={day} key={day} component={DayScreen} initialParams={{ day: day, dayData: splitDays[day], context: "browse", setstaged: setstaged }} />
                                ))
                            }
                        </>
                        :
                        <Tab.Screen
                            name="Empty"
                            component={Text} />
                }
            </Tab.Navigator>
            <View style={style.buttonBox}>
                {/* Edit Button  (ONLY VISIBLE IN BROWSE MODE)*/
                    context === "browse" ?
                        <TouchableOpacity style={style.editButton} onPress={() => {
                            if (editMode) {
                                //RESET: Essentially go back to back to non edit mode and remove all staged changed
                                setstaged(false); //UNstaged
                                //Changes reset to when the page was opened
                                setSplitDays(routine["splitDays"]);
                                setDays(routine["days"]);
                                seteditMode(!editMode);
                            } else {
                                seteditMode(!editMode);
                                setstaged(false);
                            }
                        }}>
                            <Icon name={editMode ? "close" : "square-edit-outline"} size={40} color="#5D4DE4"></Icon>
                        </TouchableOpacity>
                        :
                        <></>
                }
                {/* ----------- ADD DAY BUTTON -------------- */
                    // Only visible in edit mode*
                    editMode ?
                        <TouchableOpacity style={style.addDayButton} onPress={() => {
                            setaddDayModal(true);
                        }}>
                            <Icon name="plus-box-multiple" size={40} color="#5D4DE4" />
                        </TouchableOpacity>
                        :
                        <></>
                }
                {staged ?
                    /* ------- SAVE BUTTON -------- */
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

        </Context.Provider >

    )


}


const style = StyleSheet.create({

    header: {
        marginBottom: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, modalView: {
        width: '90%',
        margin: 0,
        backgroundColor: 'white',
        borderRadius: 20,
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
    // ---- creation modal ------
    createModalView: {
        margin: 20,
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 30,
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
    routineStyle: {
        width: '%90',
        padding: 20,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 45,
        margin: 5,
    },
    bigHeader: {
        fontSize: 30,
        fontFamily: 'nunito',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    inputStyleSmall: {
        marginTop: 20,
        width: 300,
        height: 50,
        textAlign: 'left',
        backgroundColor: "#FFFFFF00",
        borderWidth: 1,
        borderColor: "#6F7285",
        margin: 10,
        borderRadius: 10,
        padding: 5,
        fontSize: 20,
        fontFamily: 'nunito',
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
    styleList: {
        marginTop: 15,
        marginBottom: 15,
        width: 300,

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
    },

    //--------------------- BUTTON STUFF ---------------------
    closeButton: {
        marginTop: 20,
        borderRadius: 30,
        padding: 10,
        borderWidth: 1,
        borderColor: "#5D4DE4"
    },
    closeButtonSmall: {
        position: 'absolute',
        top: 15,
        left: 15
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
    addDayButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        margin: 20
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
});

export default RoutineBrowse