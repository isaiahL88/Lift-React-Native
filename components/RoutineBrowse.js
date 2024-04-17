import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, Alert, Icon } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebaseConfig';
import { useEffect, useState } from 'react';


const Tab = createMaterialTopTabNavigator();


const RoutineBrowse = ({ route, navigation }) => {
    const { routine } = route.params;
    //Each day in the routine
    //Note each day will be maped to a RoutineDay component
    const [user, setuser] = useState();
    const [days, setDays] = useState();
    const [splitDays, setSplitDays] = useState(); //map

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

    function updateRoutineData() {
        setSplitDays(routine["splitDays"]);
        setDays(routine["days"]);
    }


    if (days == null || splitDays == null) {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Empty"
                    component={Text} />
            </Tab.Navigator>
        )
    } else {
        return (
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: '#5D4DE4',
                    indicatorStyle: {
                        backgroundColor: '#5D4DE4',
                    }
                }}>
                {
                    days != null && splitDays != null ?
                        days.map((day) => (
                            // maps days to screens in the tab navigator
                            // day is just the title and dayData is an array of exercies taken from split days
                            <Tab.Screen name={day} key={day} component={DayScreen} initialParams={{ day: day, dayData: splitDays[day] }} />
                        ))
                        :
                        <Text>Loading</Text>
                }
            </Tab.Navigator>
        )
    }


}

const DayScreen = ({ navigation, route }) => {
    const { day, dayData } = route.params;
    const [exercises, setexercises] = useState();
    const [modalVis, setmodalVis] = useState(false);
    const [modalDisplay, setmodalDisplay] = useState("");

    useEffect(() => {
        setexercises(dayData);
    }, [dayData]);

    return (
        <View>
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
                        <TouchableOpacity style={style.closeButton} onPress={() => { setmodalVis(!modalVis) }}>
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


        </View>

    )
}


const style = StyleSheet.create({
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