import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


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