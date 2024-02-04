import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const Home = () => {
    return (
        <View style={style.homeContainer}>
            <TouchableOpacity>My Routines</TouchableOpacity>
            <TouchableOpacity>Create Routines</TouchableOpacity>
            <TouchableOpacity>My Lifts</TouchableOpacity>

        </View>
    )
}

const style = StyleSheet.create({
    homeContainer: {
        flex: 1
    }
});

export default Home