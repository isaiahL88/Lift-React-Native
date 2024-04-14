import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Text, View } from 'react-native';
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
            <Tab.Navigator>
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

    useEffect(() => {
        console.log("day upadated: " + day);
    }, [day]);
    useEffect(() => {
        console.log("day data upadated: " + dayData);
        setexercises(dayData);
    }, [dayData]);

    return (
        <View>
            <Text>{day}</Text>
            {
                exercises != null ?
                    exercises.map(exercise => (
                        <Text>{exercise.name}</Text>
                    ))

                    :
                    <Text>No Exercises</Text>
            }

        </View>

    )
}


const style = StyleSheet.create({

});

export default RoutineBrowse