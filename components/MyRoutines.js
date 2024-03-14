import { useEffect, useState } from 'react'
import { Text, FlatList, View, StyleSheet, TouchableOpacity } from 'react-native'
import { collection, query, where, onSnapshot, getDoc, getDocs, doc } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebaseConfig';


export default function MyRoutines() {
  const [user, setuser] = useState();
  const [routines, setRoutines] = useState([]);
  FIREBASE_AUTH.onAuthStateChanged(user => {
    if (user) {
      setuser(user);

    }
  })

  async function updateUserData() {
    const userRoutinesRef = collection(FIRESTORE_DB, "users/" + user.uid + "/user-routines");
    const querySnapshot = getDocs(userRoutinesRef);
    (await querySnapshot).forEach(doc => {
      const data = doc.data();
      console.log("adding routine: " + data?.name);
      console.log("\n\nroutines: " + routines);

      setRoutines(prevState => {
        return [...prevState, data];
      });
      console.log(routines);

    })

  }
  return (
    <View style={style.container}>
      <Text>My Routines</Text>
      <Text>{user ? user.uid : ""}</Text>
      <FlatList
        data={routines}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
        // needs to be reaplaced TODO: 
        keyExtractor={item => routines.indexOf(item)}
      />
      <TouchableOpacity onPress={updateUserData}>
        <Text>Click Here</Text>
      </TouchableOpacity>
    </View>
  )
};

const style = StyleSheet.create({
  container: {

  }
});             