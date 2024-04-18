import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, Alert, Icon } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebaseConfig';
import { useEffect, useState } from 'react';
import DayScreen from './DayScreen';

const Tab = createMaterialTopTabNavigator();

/*
    todo: add the routine name somewhere, hopefully above the top navigation like android
*/
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
                            days.map((day) => (
                                // maps days to screens in the tab navigator
                                // day is just the title and dayData is an array of exercies taken from split days
                                <Tab.Screen name={day} key={day} component={DayScreen} initialParams={{ day: day, dayData: splitDays[day] }} />
                            ))
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