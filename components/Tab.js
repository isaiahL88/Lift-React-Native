import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Animated } from 'react-native';

import userPic from '../assets/profile.png';

const data = [
    { label: 'Profile', value: '1' },
    { label: 'Settings', value: '2' },
    { label: 'Logout', value: '3' }
];

const Tab = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [dropdown, setdrpodown] = useState(false);
    //Fade variable for tab container
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

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
        <View style={dropdown ? styles.container : styles.containerTiny}>
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
                                <Text style={styles.medText}>{item.label}</Text>
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
    containerTiny: {
        marginTop: 40,
        position: 'absolute',
        zIndex: 10,
        flexDirection: 'column',
        right: 0,
        alignItems: 'flex-end',
        marginRight: 10,
        backgroundColor: "#F8F8FF",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 45,
    },
    container: {
        marginTop: 40,
        position: 'absolute',
        zIndex: 10,
        width: '30%',
        flexDirection: 'column',
        right: 0,
        alignItems: 'flex-end',
        marginRight: 10,
        backgroundColor: "#F8F8FF",
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        padding: 10
    },
    imageCircle: {
        borderRadius: 45,
        overflow: "hidden",

        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F8F8FF",
        zIndex: 20
    },
    imageStyle: {
        marginTop: -5,
        width: 35,
        height: 35,
    },
    imageBox: {

    },
    dropdownContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    dropitem: {
        width: 150,
        height: 100,
        backgroundColor: "#CBCBEF",
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