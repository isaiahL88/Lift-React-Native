import HomePage from "./components/HomePage";
import { useState, useEffect } from "react";
import { TextInput, Text, View, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from "react-native"
import { NavigationContainer } from '@react-navigation/native'

import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from './firebaseConfig.js'


export default function App() {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("pass11");

  onAuthStateChanged(FIREBASE_AUTH, (user) => {
    if (user) {
      const uid = user.uid;
      if (initializing) setInitializing(false);
      setUser(user);
    } else {
      if (initializing) setInitializing(false);
    }
  });


  const handleLogin = () => {
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        Alert.alert('Alert', 'Signed In! Hello ' + user.displayName);

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage);

      });
  }


  // React build in spinner to show we are loading
  if (initializing) {
    return <ActivityIndicator size="large" />;
  }
  if (!user) {
    return (
      <NavigationContainer>
        <View style={styles.inputBox}>
          <TextInput
            value="test@gmail.com"
            style={styles.inputStyle}
            placeholder="Enter Email"
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            vaule="pass11"
            style={styles.inputStyle}
            placeholder="Enter Password"
            onChangeText={text => setPassword(text)}
          />
          <View style={styles.buttonBox}>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}> Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

        </View>

      </NavigationContainer>
    )
  }


  return (
    <NavigationContainer>
      <HomePage />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  NavigationContainer: {
    marginTop: '100px'
  },
  mainInput: {
    height: '200px',
    width: '300px'
  },
  buttonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  buttonText: {
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
  },
  inputStyle: {
    width: 300,
    height: 50,
    backgroundColor: "#a084db",
    margin: 10,
    borderRadius: 45,
    padding: 10
  }
});

