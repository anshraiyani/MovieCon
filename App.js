import "react-native-gesture-handler";
import AuthNavigator from "./src/navigators/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { app } from "./firebase";
import { Text } from "react-native";
import { getAuth } from "firebase/auth";
import { Provider } from "react-redux";
import { store } from "./src/features/store";
import HomeNavigator from "./src/navigators/HomeNavigator";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>

    <NavigationContainer>
      {loading ? <Text>Loading</Text> : user ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
    </Provider>
  );
}
