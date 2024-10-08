import { StyleSheet, Modal, View, Text, TouchableOpacity, FlatList, Switch, TextInput, Image } from "react-native";
import React, { useContext, useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import exerciseJson from '../assets/raw/exercise_data.json';
import { Picker } from "@react-native-picker/picker";
import dismissKeyb from 'react-native-dismiss-keyboard';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Context } from './RoutineBrowse';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';



/*
    Currently: Screen representing one day in a routine, lists out exercises

    - Should be able to cutomize this day when user switches into edit mode ( this is an important efficiency funtionality)

    - Difference from android here is that this screen is used both for routine creation and for regular browsing out
      of simplicity
*/
const DayScreen = ({ navigation, route }) => {
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const numItems = 50; // Number of items you want to create
    const pickerItems = [];
    for (let i = 0; i < numItems; i++) {
        pickerItems.push(<Picker.Item label={i} value={i} />);
    }

    //Using context from the routine browser to permute editmode and split days between all Day Screens
    //First we deconstruct the two sets for editMode and split Days
    const { em, sd, at } = useContext(Context);
    const [editMode, seteditMode] = em;
    const [splitDays, setSplitDays] = sd;
    const [activeTab, setActiveTab] = at;
    const isFocused = useIsFocused();
    const { day, context, setstaged } = route.params;


    //Exercise Detail modal
    const [modalVis, setmodalVis] = useState(false);
    const [detailItem, setDetailItem] = useState(false);
    const [modalDisplay, setmodalDisplay] = useState();

    //ADd Exercise Modal
    const [exModalVisible, setexModalVisible] = useState(false);

    //Add Execise Detail modal
    const [exDetailVisible, setexDetailVisisble] = useState(false);
    const [editExerciseMode, seteditExerciseMode] = useState(false)
    //For Add Exercise Search Query
    const [searchQuery, setsearchQuery] = useState("");
    let exerciseList = exerciseJson.exercises;

    //Displayed exercises under search
    const [displayedExercises, setdisplayedExercises] = useState(exerciseList);

    //Used in check to indicate exercise is timed and needs a timed input
    const [isTimed, setisTimed] = useState(false);

    //Used in check to indicate exercise has a note and needs a note input
    const [hasNote, sethasNote] = useState(false)
    //Note state
    const [note, setnote] = useState();

    //Currently selected exercise, in basic form (name, type)
    const [selectedExercise, setselectedExercise] = useState({ name: "exercise", type: "none" });

    //Picker state
    const [pickerVal1, setpickerVal1] = useState();
    const [pickerVal2, setpickerVal2] = useState();
    const [pickerVal3, setpickerVal3] = useState();

    //Maintains accurate 'activeTab' var in Routine Browse
    useEffect(() => {
        if (isFocused) {
            setActiveTab(day);
        }
    }, [isFocused])

    useEffect(() => {
        console.log("EDITMODE IS: " + editMode);
    }, [editMode]);

    // //Update the displayed exercises under the search bar
    useEffect(() => {
        const updateData = exerciseList.filter((item) => {
            const nameString = item.name.toLowerCase();
            return nameString.includes(searchQuery.toLowerCase());
        });

        setdisplayedExercises(updateData);
    }, [searchQuery]);

    useEffect(() => {
        if (hasNote) {
            setisTimed(false);
        }
    }, [hasNote])

    useEffect(() => {
        if (isTimed) {
            sethasNote(false);
        }
    }, [isTimed])

    const updateSearch = (search) => {
        setsearchQuery(search);
    }

    const dismissKeyboard = () => {
        dismissKeyb();
        console.log("keybaord");
    }
    return (
        <View style={style.page}>
            {/* Exercise Detail Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVis}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setmodalVis(!modalVis);
                }}>
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <Text style={style.largeText}>{detailItem.name}</Text>
                        <Text style={style.mediumText}>{modalDisplay}</Text>
                        <TouchableOpacity style={style.closeButton} onPress={() => { setmodalVis(!modalVis) }}>
                            <Text style={style.buttonText}>Close</Text>
                        </TouchableOpacity>
                        {editMode ?
                            <TouchableOpacity style={style.deleteButton} onPress={() => {
                                //Removes the item from splitData (Which is from Context API) so no need to permute this change
                                //First use spread operator as to not modify a reference to a state variable in an incorrect way
                                //(must use setState.....)
                                let exercises = JSON.parse(JSON.stringify(splitDays[day]));
                                //Filter through this array
                                exercises = exercises.filter((item) => {
                                    console.log("index of item:" + exercises.indexOf(item));
                                    console.log("index of detailItem:" + splitDays[day].indexOf(detailItem));

                                    return exercises.indexOf(item) != splitDays[day].indexOf(detailItem);
                                })
                                //Then pass the array back into the splitData state variable object
                                //Using a spread op to get all other days and just replacing the day operated on by this DayScreen
                                setSplitDays({ ...splitDays, [day]: exercises });
                                setmodalVis(false);
                                setstaged(true);
                            }}>
                                <Icon name={"delete"} size={40} color="#5D4DE4"></Icon>
                            </TouchableOpacity>
                            :
                            <></>}
                    </View>
                </View>
            </Modal>

            {/* Add Exercise Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={exModalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setexModalVisible(!exModalVisible);
                }}>
                <View style={style.centeredView}>
                    <View style={style.modalViewSearch}>
                        <Searchbar
                            style={style.searchBar}
                            placeholder={"Search for an Exercise"}
                            onChangeText={updateSearch}
                            value={searchQuery}
                        />
                        {/* Display filtered exercises */}
                        <FlatList
                            data={displayedExercises}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={style.searchItemBox} onPress={() => {
                                    setselectedExercise(item);
                                    setexModalVisible(false);
                                    setexDetailVisisble(true);
                                }}>
                                    <Text style={style.searchItem} >{item.name}</Text>
                                    {/* TODO:  some sort of image rendered to difffer compound / isolation / cardio exercises */}
                                </TouchableOpacity>
                            )}
                        />

                        <TouchableOpacity style={style.closeButton} onPress={() => { setexModalVisible(!exModalVisible); setsearchQuery(""); }}>
                            <Text style={style.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* New Exercise Detail Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={exDetailVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setexDetailVisisble(!exDetailVisible);
                }}
            >
                <View style={style.centeredView}>
                    <View style={style.modalViewAddDetails}>
                        <Text style={style.largeText}>{selectedExercise.name}</Text>
                        <Text style={style.detailText}>{selectedExercise.type}</Text>
                        <View style={style.switchesBox}>
                            <View style={style.switchBox} >
                                <Text style={style.switchTitle}>Set Note</Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#767577' }}
                                    thumbColor={hasNote ? '#5D4DE4' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => {
                                        if (!hasNote) {
                                            setisTimed(false);
                                        }
                                        sethasNote(!hasNote);
                                    }}
                                    value={hasNote}
                                />
                            </View>
                            <View style={style.switchBox} >
                                <Text style={style.switchTitle}>Set Time</Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#767577' }}
                                    thumbColor={isTimed ? '#5D4DE4' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => {
                                        if (!isTimed) {
                                            sethasNote(false);
                                        }
                                        setisTimed(!isTimed);
                                    }}
                                    value={isTimed}
                                />
                            </View>
                        </View>

                        {isTimed ?
                            <View style={style.pickerBox}>
                                <Text style={style.largeText}>Time:</Text>
                                <Picker
                                    style={style.picker}
                                    selectedValue={pickerVal1}
                                    onValueChange={(itemValue) => setpickerVal1(itemValue)}
                                >
                                    {pickerItems}
                                </Picker>
                                <Picker
                                    style={style.pickerLong}
                                    selectedValue={pickerVal2}
                                    onValueChange={(itemValue) => setpickerVal2(itemValue)}
                                >
                                    <Picker.item label="s" value="s" />
                                    <Picker.item label="mins" value="m" />
                                    <Picker.item label="hours" value="h" />
                                </Picker>
                                {/* <Picker style={style.picker} /> */}
                                {/* <Picker style={style.picker} /> */}
                            </View>
                            :
                            hasNote ?
                                <View>
                                    <TextInput
                                        value={note}
                                        style={style.inputStyle}
                                        placeholder="Enter Note"
                                        onChangeText={text => setnote(text)}
                                        multiline={true}
                                        blurOnSubmit={true}
                                    />
                                </View>
                                :
                                <View style={style.pickerBox}>
                                    <Text style={style.largeText}>Reps:</Text>
                                    <Picker
                                        style={style.picker}
                                        selectedValue={pickerVal1}
                                        onValueChange={(itemValue) => setpickerVal1(itemValue)}
                                    >
                                        {pickerItems}
                                    </Picker>
                                    <Text style={style.largeText}>Sets:</Text>
                                    <Picker
                                        style={style.picker}
                                        selectedValue={pickerVal2}
                                        onValueChange={(itemValue) => setpickerVal2(itemValue)}
                                    >
                                        {pickerItems}
                                    </Picker>
                                    {/* <Picker style={style.picker} /> */}
                                    {/* <Picker style={style.picker} /> */}
                                </View>
                        }
                        <View style={style.buttonBox}>


                            <TouchableOpacity style={style.closeButton} onPress={() => {
                                setexDetailVisisble(!exDetailVisible);
                                setisTimed(false);
                                sethasNote(false);
                                setnote();
                            }}>
                                <Text style={style.buttonText}>Close</Text>
                            </TouchableOpacity>
                            {/* Here is where we create the new exercise object and add it to the current exercises */}
                            {/* User still has to save the routine to cemete these changes in the db */}
                            <TouchableOpacity style={style.closeButton} onPress={() => {

                                const newExercises = [...splitDays[day],
                                {
                                    name: selectedExercise.name,
                                    note: note ? note : null,
                                    muscleTarget: selectedExercise.type,
                                    hasNote: hasNote,
                                    isTimed: isTimed ? isTimed : null,
                                    reps: pickerVal1 ? pickerVal1 : null,
                                    sets: pickerVal2 ? pickerVal2 : null,
                                    time: pickerVal1 ? pickerVal1 : null,
                                    timeUnit: pickerVal2 ? pickerVal2 : null
                                }];
                                console.log("New Exercies: " + JSON.stringify(newExercises));
                                const newObj = { ...splitDays, [day]: newExercises }
                                console.log("newObj" + JSON.stringify(newObj));
                                setSplitDays(newObj);
                                //reset modal
                                setexDetailVisisble(!exDetailVisible);
                                sethasNote(false);
                                setisTimed(false);

                                //set staged for save button
                                setstaged(true);
                            }}>
                                <Text style={style.buttonText}>Add</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal >
            <FlatList
                style={style.exerciseList}
                data={editMode ? [...splitDays[day], { addMark: true }] : splitDays[day]}
                renderItem={({ item }) => {
                    if (item.addMark == true) {
                        <TouchableOpacity style={style.button} onPress={() => { setexModalVisible(true); }}>
                            <Text style={style.buttonText}>Add Exercises</Text>
                        </TouchableOpacity>
                    } else if (item.hasNote) {
                        return (
                            <TouchableOpacity style={style.exercise} onPress={() => { setmodalDisplay(item.note); setDetailItem(item); setmodalVis(!modalVis); }}>
                                <Text style={style.exerciseText}>{item.name}</Text>
                                <Text numberOfLines={1} style={style.exerciseDescrNote}>{item.note}</Text>
                            </TouchableOpacity>
                        )
                    } else if (item.timed) {
                        return (
                            <TouchableOpacity style={style.exercise} onPress={() => { setmodalDisplay(item.time + " " + item.timeUnit); setDetailItem(item); setmodalVis(!modalVis) }}>
                                <Text style={style.exerciseText}>{item.name}</Text>
                                <Text numberOfLines={1} style={style.exerciseDescr}>{item.time} {item.timeUnit}</Text>
                            </TouchableOpacity>
                        )
                    } else {
                        return (
                            <TouchableOpacity style={style.exercise} onPress={() => { setmodalDisplay(item.sets + " x " + item.reps); setDetailItem(item); setmodalVis(!modalVis) }}>
                                <Text style={style.exerciseText}>{item.name}</Text>
                                <Text numberOfLines={1} style={style.exerciseDescr}>{item.sets} sets x {item.reps} reps</Text>
                            </TouchableOpacity>
                        )
                    }
                }}

            />
            {
                editMode ?
                    <TouchableOpacity style={style.button} onPress={() => { setexModalVisible(true); }}>
                        <Text style={style.buttonText}>Add Exercises</Text>
                    </TouchableOpacity>
                    :
                    <>
                    </>
            }
        </View>


    )
}


const style = StyleSheet.create({
    page: {
        alignItems: 'center',
        backgroundColor: '#F8F8FF',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        margin: 0
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
    buttonBox: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    picker: {
        height: 50,
        width: 100,
        marginBottom: 150,
    },
    pickerLong: {
        height: 50,
        width: 150,
        marginBottom: 150
    },
    pickerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50
    },
    switchTitle: {
        marginRight: 10
    },
    switchesBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    switchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    searchItem: {
        fontSize: 20,
        fontFamily: 'nunito',
        padding: 5
    },
    searchItemBox: {
        backgroundColor: '#e3e1fa',
        borderWidth: 1,
        borderRadius: 10,
        margin: 5,
        opacity: .8
    },
    searchBar: {
        width: 300
    },
    bigHeader: {
        fontSize: 30,
        fontFamily: 'nunito',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    exercise: {
        width: "97%",
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
        flexGrow: 0,
        marginTop: 10
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
    }
    , modalViewSearch: {
        margin: 20,
        marginTop: 70,
        marginBottom: 70,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        paddingRight: 20,
        paddingLeft: 20,
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
    modalViewAddDetails: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        width: '85%',
        paddingBottom: 30,
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
        width: 100,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#5D4DE4"
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'nunito'
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
    buttonSmallText: {
        fontSize: 13,
        fontFamily: 'nunito'
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
    editButton: {
        position: 'absolute',
        right: 20,
        top: 20
    },
    deleteButton: {
        position: 'absolute',
        left: 20,
        bottom: 35
    },
    largeText: {
        fontSize: 30,
        fontFamily: 'nunito'
    },
    mediumText: {
        fontSize: 20,
        fontFamily: 'nunito'
    },
    detailText: {
        fontSize: 15,
        fontFamily: 'nunito',
        opacity: 0.8
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
    }, placeholderStyle: {
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
    }
});

export default DayScreen