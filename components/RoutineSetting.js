import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { FlatList } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const RoutineSetting = ({ navigation, route }) => {
    const privacyVal = route.params.privacy;
    const [routineName, setroutineName] = useState(rout.params.routine.name);
    const [editName, seteditName] = useState(false);
    const [privacyPickVal, setprivacyPickVal] = useState();

    return (
        <View style={style.page}>

            <Text>{route.params.privacy} test</Text>
            <View style={style.nameContainer}>
                <Text style={style.medText}>Routine Name</Text>
                <TextInput
                    value={routineName}
                    style={style.textInput}
                    editable={false} selectTextOnFocus={false}
                />
                {
                    editName ?
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity >
                                <Icon name={"check"} size={10} color="#5D4DE4" />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Icon name={"cancel"} size={10} color="#5D4DE4" />
                            </TouchableOpacity>
                        </View>
                        :
                        <TouchableOpacity >
                            <Icon name={"square-edit-outline"} size={10} color="#5D4DE4" />
                        </TouchableOpacity>
                }

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
    pickerLong: {
        height: 50,
        width: 150,
        marginBottom: 160,

    },
    nameContainer: {
        width: '100%',
        height: 400,
        flexDirection: 'row',
        justifyContent: 'center'
    }
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
});

export default RoutineSetting