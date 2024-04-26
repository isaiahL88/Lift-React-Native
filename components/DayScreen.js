import { StyleSheet, Modal, View, Text, TouchableOpacity, FlatList } from "react-native";
import { useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import csv from 'csvtojson';


/*
    Currently: Screen representing one day in a routine, lists out exercises

    - Should be able to cutomize this day when user switches into edit mode ( this is an important efficiency funtionality)

    - Difference from android here is that this screen is used both for routine creation and for regular browsing out
      of simplicity
*/
const DayScreen = ({ navigation, route }) => {
    const { day, dayData } = route.params;
    const [exercises, setexercises] = useState();
    const [modalVis, setmodalVis] = useState(false);
    const [modalDisplay, setmodalDisplay] = useState();
    const [exModalVisible, setexModalVisible] = useState(false);

    //For Exercise Search;
    const [searchQuery, setsearchQuery] = useState('');
    const exerciseList = [{
        name: 'Squat',
        type: 'Compound Lift'
    },
    {
        name: 'Bench',
        type: 'Compound Lift'
    }];

    const [displayedExercises, setdisplayedExercises] = useState();
    //Exercise Detail State
    const [exDetailVisible, setexDetailVisisble] = useState(false);
    //Used in check to indicate exercise is timed and needs a timed input
    const [isTimed, setisTimed] = useState(false);
    //Used in check to indicate exercise has a note and needs a note input
    const [hasNote, sethasNote] = useState(false)
    //Currently selected exercise, in basic form (name, type)
    const [selectedExercise, setselectedExercise] = useState();


    // useEffect(() => {
    //     csv()
    //         .fromFile('../assets/raw/exercise_data.csv')
    //         .on('json', jsonObj => {

    //         })
    //         .on('done', (error) => {
    //             console.log('end');
    //         })
    // }, []);

    useEffect(() => {
        if (dayData != null) {
            setexercises(dayData);
        } ``
    }, []);


    // //Update the displayed exercises under the search bar
    useEffect(() => {
        let newExercises = [];
        exerciseList.forEach((exercise) => {
            if (exercise.name.includes(searchQuery)) {
                newExercises.push(exercise);
            }
        });

        setdisplayedExercises(newExercises);

    }, [searchQuery]);

    const onAddExercise = () => {

    };

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
                            onChangeText={() => { setsearchQuery() }}
                            value={searchQuery}
                        />
                        {/* Display filtered exercises */}
                        <FlatList
                            data={displayedExercises}
                            renderItem={(exercise) => (
                                <TouchableOpacity onPress={() => {
                                    setselectedExercise(exercise);
                                    setexModalVisible(false);
                                    setexDetailVisisble(true);
                                }}>
                                    <Text>{exercise.name}</Text>
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
            <TouchableOpacity style={style.button} onPress={() => { setexModalVisible(true) }}>
                <Text style={style.buttonText}>Add Exercises</Text>
            </TouchableOpacity>


        </View>

    )
}


const style = StyleSheet.create({
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