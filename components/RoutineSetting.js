import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const RoutineSetting = () => {
    return (
        <View>
            <View style={style.nameContainer}>

            </View>
            <View style={style.privacyContainer}>
                <Text style={style.medLText}>Routine Privacy: </Text>
                <Picker
                    style={style.pickerLong}
                    selectedValue={privacyPickVal}
                    onValueChange={(itemValue) => setprivacyPickVal(itemValue)}
                >
                    <Picker.item label="private" value="private" />
                    <Picker.item label="public" value="public" />
                    <Picker.item label="friends" value="friends" />
                </Picker>
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    page: {
        alignItems: 'center',
        backgroundColor: '#F8F8FF',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        margin: 0
    },
    privacyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -10
    }
});

export default RoutineSetting