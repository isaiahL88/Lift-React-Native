import HomePage from "./components/HomePage";
import { useState, useEffect } from "react";
import { TextInput, Text, View, TouchableOpacity, ActivityIndicator } from "react-native"
import { NavigationContainer } from '@react-navigation/native'

import { getAuth, onAuthStateChanged } from "firebase/auth";
import config from './firebaseConfig.js'


export default function App() {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState()

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      if (initializing) setInitializing(false);
      setUser(user);
    } else {
      if (initializing) setInitializing(false);

    }
  });

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, [])



  // React build in spinner to show we are loading
  if (initializing) {
    return <ActivityIndicator size="large" />;
  }
  if (!user) {
    return (
      <NavigationContainer>
        <TextInput placeholder="Enter Email" />
        <TextInput placeholder="Enter Password" />
        <View>
          <TouchableOpacity />
          <TouchableOpacity />
        </View>
      </NavigationContainer>
    )
  }


  return (
    <HomePage />
  );
}

