import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, FlatList } from 'react-native';
import Tab from './Tab.js'
import backgroundImg from '../assets/login_fitness_image.jpeg';
import liftLogo from '../assets/lift-logo.png'
import { useEffect } from 'react';



const HomeScreen = ({ navigation }) => {
    // Hardcoded featured routines
    const featuredIds = [

    ];

    useEffect(() => {

    }, []);

    const loadLifts = () => {

    }
    const loadFeatured = () => {

    }
    return (
        <>
            <Tab />
            <View style={style.homeContainer}>
                <Image style={style.imageStyle} source={liftLogo} />

                <View style={style.routineContainer}>
                    <TouchableOpacity style={style.routineButtons} onPress={() => {
                        navigation.navigate("RoutineBrowse", { context: "creation" });
                    }}>
                        <Text style={style.buttonText}>Create Routines</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.routineButtons} onPress={() => {
                        console.log("Clicked");
                        navigation.navigate("MyRoutines")
                    }}>
                        <Text style={style.buttonText} >My Routines</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.headerContainer}>
                    <Text style={style.largeText}>My Lifts</Text>
                </View>
                <View style={style.liftPrevContainer}></View>
                <View style={style.headerContainer}>
                    <Text style={style.largeText}>Featured</Text>
                </View>
                {/* LineBreak */}
                <View style={style.linebreak}></View>
                <FlatList

                />
            </View >
        </>
    )
}

const style = StyleSheet.create({
    imageStyle: {
        marginTop: 30,
        height: 120,
        width: 155,
        resizeMode: 'contain'
    },
    homeContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F8F8FF',
        textAlign: 'left'
    },
    routineContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-evenly'
    },
    liftPrevContainer: {
        width: '90%',
        height: 200,
        borderRadius: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#00000088',
    },
    headerContainer: {
        marginTop: 20,
        width: '80%'
    },
    linebreak: {
        width: '90%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#00000088',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        opacity: .5

    },
    routineButtons: {
        width: 170,
        height: 170,
        backgroundColor: 'transparent',
        borderRadius: 45,
        borderStyle: 'solid',
        borderWidth: 2,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#5D4DE488',
        opacity: 1,
        zIndex: 20
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
        borderColor: '#5D4DE4',
        opacity: 1,
        zIndex: 20
    },

    buttonText: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 900,
        fontFamily: 'nunito',
        opacity: 1
    },
    largeText: {
        textAlign: 'left',
        fontSize: 30,
        fontWeight: 900,
        fontFamily: 'nunito',
        opacity: 1
    }
});

export default HomeScreen