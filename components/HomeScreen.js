import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import backgroundImg from '../assets/login_fitness_image.jpeg';



const HomeScreen = ({ navigation }) => {

    return (
        <ImageBackground source={backgroundImg} style={style.background}>
            <View style={style.homeContainer}>
                <TouchableOpacity style={style.button} onPress={() => {
                    console.log("CLicked");
                    navigation.navigate("MyRoutines")
                }}>
                    <Text style={style.buttonText} >My Routines</Text></TouchableOpacity>
                <TouchableOpacity style={style.button}><Text style={style.buttonText}>Create Routines</Text></TouchableOpacity>
                <TouchableOpacity style={style.button}><Text style={style.buttonText}>My Lifts</Text></TouchableOpacity>

            </View>
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    homeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 70,
        opacity: 1
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        opacity: .5

    },
    button: {
        width: 250,
        height: 60,
        backgroundColor: 'transparent',
        borderRadius: 45,
        borderStyle: 'solid',
        borderWidth: 2,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 160,
        borderColor: '#5D4DE4',
        opacity: 1,
        zIndex: 20
    },

    buttonText: {
        color: "#5D4DE4",
        fontSize: 30,
        fontWeight: 900,
        fontFamily: 'nunito',
        opacity: 1
    }
});

export default HomeScreen