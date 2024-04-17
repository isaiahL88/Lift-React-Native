import { Text, TouchableOpacity, StyleSheet, View, Image, ImageBackground } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import MyRoutines from './MyRoutines.js';
import RoutineBrowse from './RoutineBrowse.js';
import HomePage from './HomePage.js'

const Stack = createStackNavigator();

const Home = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerTintColor: '#5D4DE4',
            }}
        >
            <Stack.Screen name="MyRoutines" component={MyRoutines} />
            <Stack.Screen name="HomeScreen" component={HomePage} />
            <Stack.Screen name="RoutineBrowse" component={RoutineBrowse} />
        </Stack.Navigator>


    )
}

export default Home