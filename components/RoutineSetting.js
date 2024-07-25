import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from "@react-native-picker/picker";

const RoutineSetting = ({ navigation, route }) => {
    const privacyVal = route.params.privacy;
    const [privacyPickVal, setprivacyPickVal] = useState();

    return (
        <View style={style.page}>
            <Text>{route.params.privacy} test</Text>
            <View style={style.nameContainer}>

            </View>
            <View style={style.privacyContainer}>
                <Text style={style.medLText}>Routine Privacy: </Text>
                <Picker
                    style={style.pickerLong}
                    selectedValue={privacyPickVal}
                    onValueChange={(itemValue) => setprivacyPickVal(itemValue)}
                >
                    <Picker.Item label="private" value="private" />
                    <Picker.Item label="public" value="public" />
                    <Picker.Item label="friends" value="friends" />
                </Picker>
            </View>
            <View>
                <Text>Edit Name</Text>
            </View>
            <View>
                <Text>Edit Name</Text>
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    page: {
        alignItems: 'center',
        backgroundColor: '#F8F8FF',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        margin: 0,
        height: '100%'
    },
    privacyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -10
    },
    medLText: {
        fontSize: 25,
        fontFamily: 'nunito'
    },
    pickerLong: {
        height: 50,
        width: 150,
        marginBottom: 160,

    }
});

export default RoutineSetting