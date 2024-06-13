import { Text, TouchableOpacity, StyleSheet, View, Image, ImageBackground } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import MyRoutines from './MyRoutines.js';
import RoutineBrowse from './RoutineBrowse.js';
import HomePage from './HomePage.js';
import RoutineCreate from './RoutineCreate.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


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
            <Stack.Screen name="MyRoutines" component={MyRoutines} />
            <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomePage} />
            <Stack.Screen name="RoutineBrowse" options={({ navigation, route }) => ({
                headerTitle: route.params.name, headerTintColor: '#5D4DE4',
                headerTitleStyle: {
                    fontFamily: 'nunito',
                    fontSize: 20,
                    fontWeight: 'bold'
                }, headerStyle: {
                    height: 110,
                },
                headerRight: () => (
                    <TouchableOpacity onPress={() => {

                    }}>
                        <Icon style={{ marginRight: 10 }} name={"cog"} size={35} color="#5D4DE4" />
                    </TouchableOpacity>
                )
            })} component={RoutineBrowse} />
            <Stack.Screen name="RoutineCreate" component={RoutineCreate} />
        </Stack.Navigator>


    )
}

export default Home