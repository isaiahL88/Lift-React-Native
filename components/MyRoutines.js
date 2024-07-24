import { useEffect, useState } from 'react'
import { Text, FlatList, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebaseConfig';

import RoutineBrowse from './RoutineBrowse';


const Stack = createStackNavigator();

export default function MyRoutines({ navigation }) {
  const [user, setuser] = useState();
  const [routines, setRoutines] = useState([]);
  const [deleteMod, setdeleteMod] = useState(false);
  const [routineSel, setroutineSel] = useState();


  useEffect(() => {
    FIREBASE_AUTH.onAuthStateChanged(user => {
      if (user) {
        setuser(user);
      }

    })
  }, []);

  useEffect(() => {
    if (user) {
      updateUserData();
    }
  }, [user]);


  //Navigates to the selected routine in a browsing context
  function handleRoutinePress(routine) {
    navigation.navigate("RoutineBrowse", { routine: routine, context: "browse", name: routine.name });
    console.log("start routine browse?");
  }

  async function handleRoutineDelete() {
    try {
      await deleteDoc(doc(FIRESTORE_DB, "users/" + user.uid + "/user-routines/", routineSel.id));

    } catch (error) {
      console.log("issue deleting routine: " + error);
    } finally {
      Alert.alert("Routine: " + routine.name + " has been deleted");

    }
  }

  async function updateUserData() {
    const userRoutinesRef = collection(FIRESTORE_DB, "users/" + user.uid + "/user-routines");
    const querySnapshot = getDocs(userRoutinesRef);
    (await querySnapshot).forEach(doc => {
      const data = doc.data();

      setRoutines(prevState => {
        return [...prevState, data];
      });

    })

  }
  return (
    <View style={style.page}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={deleteMod}
      >
        <View style={style.modalSytle}>
          <View stlye={style.deleteModal}>
            <Text>Are you sure you want to delete routine? </Text>
            <Text>{routineSel?.name}</Text>
            <View style={style.buttonBox}>
              <TouchableOpacity style={style.regButton} onPress={() => {
                setdeleteMod(false);
              }}>
                <Text style={style.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.regButton} onPress={() => { handleRoutineDelete(); }}>
                <Text style={style.buttonText}>Delete</Text>
              </TouchableOpacity>

            </View>
          </View>

        </View>
      </Modal >
      <FlatList
        data={routines}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { handleRoutinePress(item) }} onLongPress={() => { setroutineSel(item); setdeleteMod(true); }}>
            <View style={style.routineBox}>
              <Text style={style.routineText}>{item.name}</Text>
              <Text style={style.detailText}>Days: {Object.keys(item.splitDays).length}</Text>
            </View>
          </TouchableOpacity>
        )
        }
        // needs to be reaplaced TODO: 
        keyExtractor={item => routines.indexOf(item)}
      />
    </View >
  )
}

const style = StyleSheet.create({
  modalSytle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteModal: {
    margin: 20,
    width: "90%",
    backgroundColor: '#000',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  routineBox: {
    width: 370,
    borderWidth: 1,
    backgroundColor: '#F9F9FB',
    borderRadius: 20,
    margin: 3,
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#5D4DE488',
    opacity: 1,
    zIndex: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  page: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8FF',
    paddingTop: 10,
    height: '100%'
  }
  ,
  bigHeader: {
    fontSize: 40,
    margin: 10
  },
  regButton: {
    marginTop: 20,
    borderRadius: 30,
    padding: 10,
    width: 100,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#5D4DE4"
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'nunito'
  },
  routineText: {
    fontFamily: 'nunitoSB',
    fontWeight: 900,
    fontSize: 23,
    padding: 7,
    marginBottom: 10
  },
  detailText: {
    fontFamily: 'nunito',
    fontWeight: 500,
    fontSize: 20,
    padding: 7,
    marginBottom: 10
  }
});             