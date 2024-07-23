import { Text, TouchableOpacity, StyleSheet, View, Image, ImageBackground } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import MyRoutines from './MyRoutines.js';
import RoutineBrowse from './RoutineBrowse.js';
import HomePage from './HomePage.js';
import RoutineCreate from './RoutineCreate.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RoutineSetting from './RoutineSetting.js';


const Stack = createStackNavigator();

const Home = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerTintColor: '#5D4DE4',
                headerTitle: '',
            }}
        >
            <Stack.Screen name="MyRoutines" options={{
                headerTitle: "My Routines",
                headerTintColor: '#000000',
                headerTitleStyle: {
                    fontFamily: 'nunitoM',
                    fontSize: 30,
                    fontWeight: '100',
                    paddingBottom: 10
                }
            }
            } component={MyRoutines} />
            <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomePage} />
            <Stack.Screen name="RoutineBrowse" options={({ navigation, route }) => ({
                headerTitle: route.params.name, headerTintColor: '#000000',
                headerTitleStyle: {
                    fontFamily: 'nunitoM',
                    fontSize: 20,
                    fontWeight: '100',
                }, headerStyle: {
                    height: 110,
                },
                headerRight: () => (
                    <TouchableOpacity onPress={() => {
                        // Note we assume the routine should be set before the user presses the settings cog
                        // this might need some validation before navigating
                        navigation.navigate("RoutineSettings", { routine: route.params.routine });
                    }}>
                        <Icon style={{ marginRight: 10 }} name={"cog"} size={30} color="#5D4DE4" />
                    </TouchableOpacity>
                ),
                headerShadowVisible: false
            })} component={RoutineBrowse} />
            <Stack.Screen name="RoutineSettings" component={RoutineSetting} />
            <Stack.Screen name="RoutineCreate" component={RoutineCreate} />
        </Stack.Navigator>


    )
}

export default Home