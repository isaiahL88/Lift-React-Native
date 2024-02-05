import { useEffect, useState } from 'react'
import { Text, FlatList, View, StyleSheet } from 'react-native'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";


export default function MyRoutines() {
  const [user, setuser] = useState();
  getAuth().onAuthStateChanged(user => {
    if (user) {
      setuser(user);
      updateUserData();
    }
  })

  const updateUserData = () => {
    user.uid
  }
  return (
    <View style={style.container}>
      <Text>My Routines</Text>
      <Text>{user ? user.uid : ""}</Text>
      <FlatList />
    </View>
  )
};

const style = StyleSheet.create({
  container: {

  }
});