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
    navigation.navigate("RoutineBrowse", { routine: routine, context: "browse" });
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
    <View style={style.container}>
      <Text style={style.bigHeader}>My Routines</Text>
      <FlatList
        data={routines}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { handleRoutinePress(item) }}>
            <Text style={style.routineContainer}>{item.name}</Text>
          </TouchableOpacity>
        )}
        // needs to be reaplaced TODO: 
        keyExtractor={item => routines.indexOf(item)}
      />

    </View>
  )
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  }
  ,
  bigHeader: {
    fontSize: 40,
    margin: 10
  },
  routineContainer: {
    fontFamily: 'nunito',
    fontWeight: 900,
    fontSize: 25,
    padding: 7,
    marginBottom: 10
  }
});             