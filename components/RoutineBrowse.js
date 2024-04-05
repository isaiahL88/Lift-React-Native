import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebaseConfig';


const Tab = createMaterialTopTabNavigator();


const RoutineBrowse = ({ routine }) => {

    //Each day in the routine
    //Note each day will be maped to a RoutineDay component
    const [user, setuser] = useState();
    const [days, setDays] = useState([]);

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

    async function updateRoutineData() {
        console.log(routine)
    }
    return (
        <Tab.Navigator>
            {days.map((day) => {
                <Tab.Screen name={day} component={RoutineDay} initialParams={day} />
            })}
        </Tab.Navigator>
    )
}


const style = StyleSheet.create({

});

export default RoutineBrowse