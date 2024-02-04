import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'

const Home = () => {
    return (
        <View style={style.homeContainer}>
            <TouchableOpacity><Text>My Routines</Text></TouchableOpacity>
            <TouchableOpacity><Text>Create Routines</Text></TouchableOpacity>
            <TouchableOpacity><Text>My Lifts</Text></TouchableOpacity>

        </View>
    )
}

const style = StyleSheet.create({
    homeContainer: {
        flex: 1
    }
});

export default Home