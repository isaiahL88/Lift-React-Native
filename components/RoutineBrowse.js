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
    const [days, setDays] = useState(["Empty Slot"]);
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
        console.log(routine["splitDays"]);
        setDays(routine["days"]);
        console.log(routine["days"])
        console.log("days updated");
    }


    if (days.length == 0) {
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
                {days.map((day) => (
                    // maps days to screens in the tab navigator
                    // day is just the title and dayData is an array of exercies taken from split days
                    <Tab.Screen name={day} key={day} component={DayScreen} initialParams={{ day: day }} />
                ))}
            </Tab.Navigator>
        )
    }


}

const DayScreen = ({ navigation, route }) => {
    const { day, dayData } = route.params;

    return (
        <Text>{day}</Text>


    )
}


const style = StyleSheet.create({

});

export default RoutineBrowse