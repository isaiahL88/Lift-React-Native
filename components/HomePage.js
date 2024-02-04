import { View, Text } from 'react-native'
import Home from './Home';
import Friends from './Friends';
import Search from './Search';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


const HomePage = () => {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Friends" component={Friends} />
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Search} />
        </Tab.Navigator>

    )
}

export default HomePage