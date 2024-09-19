import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'

const PlayScreen = ({ route, navigation }) => {
    //Each Play Screen Represents one Exercise and creates one exerciseLog, each log has exercise Log entries held
    //in the exerciseLogs array
    const [exerciseLogs, setexerciseLogs] = useState([])


    return (
        <View style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: '#F8F8FF', height: 800 }}>
            <Text style={style.medLText}>{route.params.exercise["name"]}</Text>
            {/* Action View, Main area that the user is looking, will change ui based on the type of exercise being performed: 
                    Regualr Exercise in standard format: only reps x sets for now
                    Timed Exercise: big timer with progress bar 
                    Note: just expands the note the user created in the center
            */}
            <View></View>
            <View style={{ width: '80%', borderColor: 'grey', borderWidth: 1, height: 1, borderStyle: 'solid' }}></View>
            <FlatList
                data={exerciseLogs}
                style={style.logList}
                renderItem={(item) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{item.values}</Text>
                        <Text>{item.reps}</Text>
                    </View>
                )}
            />
        </View>
    )
}
const style = StyleSheet.create({
    logList: {
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 20,
        height: 10,
        width: '85%'
    },
    //--------------------- Text STUFF ---------------------
    mediumText: {
        fontSize: 20,
        fontFamily: 'nunito'
    },
    medLText: {
        fontSize: 25,
        fontFamily: 'nunito'
    },
    largeText: {
        fontSize: 30,
        fontFamily: 'nunito'
    },
    buttonSmallText: {
        fontSize: 13,
        fontFamily: 'nunito'
    },
    textItalic: {
        fontSize: 20,
        fontFamily: 'nunitoItalic'
    }
    //------------------------------------------
})
export default PlayScreen