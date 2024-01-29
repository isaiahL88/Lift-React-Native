import { TextInput, Text, View, TouchableOpacity } from "react-native"
import auth from '@react-native-firebase/auth';



const Login = () => {
    const [initializing, setinitializing] = useState(true);
    const [user, setuser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    })


    if (initializing) return;
    if (!user) {
        return (
            <View>
                <TextInput placeholder="Enter Email" />
                <TextInput placeholder="Enter Password" />
                <View>
                    <TouchableOpacity
                    >Login</TouchableOpacity>
                    <TouchableOpacity>SignUp</TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View>
            <Text> Welcome {user.email}</Text>
        </View>
    )

}

export default Login