import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Ani } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import userPic from '../assets/profile.png';

const data = [
    { label: 'Profile', value: '1' },
    { label: 'Settings', value: '2' },
    { label: 'Logout', value: '3' }
];

const FadeInFlatList = props => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 10000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <Animated.FlatList // Special animatable View
            style={{
                ...props.style,
                opacity: fadeAnim, // Bind opacity to animated value
            }}>
            {props.children}
        </Animated.FlatList>
    );
};

const Tab = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [dropdown, setdrpodown] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.imageBox} onPress={() => {
                setdrpodown(!dropdown);
            }}>
                <View style={styles.imageCircle}>
                    <Image source={userPic} style={styles.imageStyle} width={50} height={50} />

                </View>
            </TouchableOpacity>
            {
                dropdown ?
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <TouchableOpacity stlye={styles.dropitem} onPress={() => {

                            }}>
                                <Text style={styles.medText}>item.label</Text>
                            </TouchableOpacity>
                        )
                        }
                    />
                    :
                    <>
                    </>
            }
        </View>
    );
};

export default Tab;

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        position: 'absolute',
        backgroundColor: "#CBCBEF",
        zIndex: 10,
        width: '93%',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    imageCircle: {
        borderRadius: 45,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "grey",
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F8F8FF"
    },
    imageStyle: {
        marginTop: -5,
        width: 35,
        height: 35,
    },
    imageBox: {
        right: 0,
        position: 'absolute',
    },
    dropdownContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    dropitem: {
        widht: 150,
        height: 100,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        color: '#5D4DE4',
    },
    placeholderStyle: {
        fontSize: 18,
    },
    selectedTextStyle: {
        fontSize: 18,
        color: '#5D4DE4'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    // ------------ Text-------------
    medText: {
        fontSize: 25,
        fontFamily: 'nunito'
    }
});