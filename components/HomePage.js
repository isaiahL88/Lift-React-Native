import { View, Text, Image, StyleSheet } from 'react-native'
import Friends from './Friends';
import Search from './Search';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import home from '../assets/home.png'
import friends from '../assets/friends.png';
import search from '../assets/search.png';
import HomeScreen from './HomeScreen';



const Tab = createBottomTabNavigator();


const HomePage = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
            tabBarOptions={{
                activeTintColor: '#5D4DE4',
            }}>
            <Tab.Screen name="Friends" component={Friends}
                options={{
                    tabBarIcon: ({ Colors, size }) => (
                        <Image style={st.friends} source={friends} />
                    )
                }}
            />
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarIcon: ({ Colors, size }) => (
                        <Image source={home} />
                    )
                }}
            />
            <Tab.Screen name="Search" component={Search}
                options={{
                    tabBarIcon: ({ Colors, size }) => (
                        <Image style={st.search} source={search} />
                    )
                }}
            />
        </Tab.Navigator>

    )
}

const st = StyleSheet.create({
    search: {
        height: 20,
        width: 20
    },
    friends: {
        height: 20,
        width: 20
    }
});


export default HomePage

