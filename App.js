import HomePage from "./components/HomePage";
import { useState, useEffect } from "react";
import { TextInput, Text, Image, View, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from "react-native"
import { NavigationContainer } from '@react-navigation/native'

import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from './firebaseConfig.js'
import { useFonts } from 'expo-font';
import logo from './assets/logo-transparent.png';


export default function App() {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("pass11");

  let [fontsLoaded] = useFonts({
    'nunito': require('./assets/fonts/nunitoSans.ttf')
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;

  }


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
        // Alert.alert('Alert', 'Signed In! Hello ' + user.displayName);

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
        <Image
          style={styles.imageStyle}
          source={logo}
        />
        <View style={styles.inputBox}>
          <TextInput
            value="test@gmail.com"
            style={styles.inputStyle}
            placeholder="Enter Email"
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            vaule="pass11"
            secureTextEntry={true}
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
    flex: 1
  },
  NavigationContainer: {
    marginTop: '100px'
  },
  imageStyle: {
    width: 400,
    height: 500,
    marginBottom: -45,
  },
  mainInput: {
    height: '200px',
    width: '300px'
  },
  buttonBox: {
    flexDirection: 'row',
    width: 300,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  button: {
    elevation: 8,
    width: 120,
    height: 50,
    backgroundColor: "#D7D6E710",
    borderWidth: 1,
    borderColor: "#5D4DE4",
    borderRadius: 45,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'nunito'
  },
  inputStyle: {
    width: 320,
    height: 60,
    backgroundColor: "#FFFFFF00",
    borderWidth: 1,
    borderColor: "#6F7285",
    margin: 10,
    borderRadius: 45,
    padding: 15,
    fontSize: 20,
  }
});

