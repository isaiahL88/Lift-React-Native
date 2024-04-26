import { StyleSheet, Modal, View, Text, TouchableOpacity, FlatList } from "react-native";
import { useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import exerciseJson from '../assets/raw/exercise_data.json';


/*
    Currently: Screen representing one day in a routine, lists out exercises

    - Should be able to cutomize this day when user switches into edit mode ( this is an important efficiency funtionality)

    - Difference from android here is that this screen is used both for routine creation and for regular browsing out
      of simplicity
*/
const DayScreen = ({ navigation, route }) => {
    //Used to see if the dayScreen is in edit mode or in view mode
    const [editMode, seteditMode] = useState();
    const { day, dayData } = route.params;
    const [exercises, setexercises] = useState();

    //Exercise Detail modal
    const [modalVis, setmodalVis] = useState(false);
    const [modalDisplay, setmodalDisplay] = useState();

    //ADd Exercise Modal
    const [exModalVisible, setexModalVisible] = useState(false);

    //Add Execise Detail modal
    const [exDetailVisible, setexDetailVisisble] = useState(false);

    //For Add Exercise Search Query
    const [searchQuery, setsearchQuery] = useState("");
    let exerciseList = exerciseJson.exercises;

    //Displayed exercises under search
    const [displayedExercises, setdisplayedExercises] = useState(exerciseList);

    //Used in check to indicate exercise is timed and needs a timed input
    const [isTimed, setisTimed] = useState(false);
    //Used in check to indicate exercise has a note and needs a note input
    const [hasNote, sethasNote] = useState(false)
    //Currently selected exercise, in basic form (name, type)
    const [selectedExercise, setselectedExercise] = useState();


    useEffect(() => {
        if (dayData != null) {
            setexercises(dayData);
        }
    }, [dayData]);


    // //Update the displayed exercises under the search bar
    useEffect(() => {
        const updateData = exerciseList.filter((item) => {
            const nameString = item.name.toLowerCase();
            return nameString.includes(searchQuery.toLowerCase());
        });

        console.log("NEW DATA");
        updateData.forEach(item => {
            console.log(item.name);
        })

        setdisplayedExercises(updateData);
    }, [searchQuery]);

    const onAddExercise = () => {

    };

    const updateSearch = (search) => {
        setsearchQuery(search);
    }
    const renderItem = ({ item }) => <Item title={item.title} />;
    return (
        <View>
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
                        <Text style={style.mediumText}>{modalDisplay}</Text>
                        <View style={style.buttonBox}>
                            <TouchableOpacity style={style.closeButton} onPress={() => { setmodalVis(!modalVis) }}>
                                <Text style={style.buttonText}>Close</Text>
                            </TouchableOpacity>
                        </View>

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
                            placeholder="Search for an Exercise"
                            onChangeText={updateSearch}
                            value={searchQuery}
                        />
                        {/* Display filtered exercises */}
                        <FlatList
                            data={displayedExercises}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={style.searchItemBox} onPress={() => {
                                    console.log("DEBUG: " + item.name);
                                }}>
                                    <Text style={style.searchItem} >{item.name}</Text>
                                    {/* TODO:  some sort of image rendered to difffer compound / isolation / cardio exercises */}
                                </TouchableOpacity>
                            )}
                        />

                        <TouchableOpacity style={style.closeButton} onPress={() => { setexModalVisible(!exModalVisible) }}>
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
                    <View style={style.modalViewSearch}>

                        <TouchableOpacity style={style.closeButton} onPress={() => { setexDetailVisisble(!exDetailVisible); }}>
                            <Text style={style.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


            <FlatList
                data={exercises}
                renderItem={({ item }) => {
                    if (item.hasNote) {
                        return (
                            <TouchableOpacity style={style.exercise} onPress={() => { setmodalDisplay(item.note); setmodalVis(!modalVis); }}>
                                <Text style={style.exerciseText}>{item.name}</Text>
                                <Text numberOfLines={1} style={style.exerciseDescrNote}>{item.note}</Text>
                            </TouchableOpacity>
                        )
                    } else if (item.timed) {
                        return (
                            <TouchableOpacity style={style.exercise} onPress={() => { setmodalDisplay(item.time + " " + item.timeUnit); setmodalVis(!modalVis) }}>
                                <Text style={style.exerciseText}>{item.name}</Text>
                                <Text numberOfLines={1} style={style.exerciseDescr}>{item.time} {item.timeUnit}</Text>
                            </TouchableOpacity>
                        )
                    } else {
                        return (
                            <TouchableOpacity style={style.exercise} onPress={() => { setmodalDisplay(item.sets + " x " + item.reps); setmodalVis(!modalVis) }}>
                                <Text style={style.exerciseText}>{item.name}</Text>
                                <Text numberOfLines={1} style={style.exerciseDescr}>{item.sets} sets x {item.reps} reps</Text>
                            </TouchableOpacity>
                        )
                    }
                }}
                style={style.exerciseList}

            />
            <TouchableOpacity style={style.button} onPress={() => { setexModalVisible(true); }}>
                <Text style={style.buttonText}>Add Exercises</Text>
            </TouchableOpacity>


        </View>

    )
}


const style = StyleSheet.create({
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
    button: {
        marginTop: 20,
        borderRadius: 30,
        padding: 10,
        borderWidth: 1,
        borderColor: "#5D4DE4"
    },
    mediumText: {
        fontSize: 20,
        fontFamily: 'nunito'
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