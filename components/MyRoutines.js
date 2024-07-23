import { useEffect, useState } from 'react'
import { Text, FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { collection, query, where, onSnapshot, getDoc, getDocs, doc } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebaseConfig';
import RoutineBrowse from './RoutineBrowse';


const Stack = createStackNavigator();

export default function MyRoutines({ navigation }) {
  const [user, setuser] = useState();
  const [routines, setRoutines] = useState([]);

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

  function handleRoutinePress(routine) {
    //todo
    navigation.navigate("RoutineBrowse", { routine: routine, context: "browse", name: routine.name });
    console.log("start routine browse?");
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
      <FlatList
        data={routines}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { handleRoutinePress(item) }}>
            <View style={style.routineBox}>
              <Text style={style.routineText}>{item.name}</Text>
              <Text style={style.detailText}>Days: {Object.keys(item.splitDays).length}</Text>
            </View>
          </TouchableOpacity>
        )}
        // needs to be reaplaced TODO: 
        keyExtractor={item => routines.indexOf(item)}
      />
    </View>
  )
}

const style = StyleSheet.create({
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