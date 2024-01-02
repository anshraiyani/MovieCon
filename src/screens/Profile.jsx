import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { clearStates, selectStateUser } from "../features/slices/userSlice";
import * as Clipboard from "expo-clipboard";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const userSelector = useSelector(selectStateUser);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(userSelector.profile.uid);
  };

  const handleSignout = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      dispatch(clearStates());
    } catch (error) {
      console.log(error);
    }
  };

  const [fontsLoaded] = useFonts({
    HeroLg: require("../assets/fonts/Hero-Light.ttf"),
    HeroRg: require("../assets/fonts/Hero-Regular.ttf"),
    HeroBd: require("../assets/fonts/Hero-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={{
        marginTop: StatusBar.currentHeight,
        height: "100%",
        flex: 1,
        backgroundColor: "black",
        padding: 8,
      }}
    >
      <View
        style={{
          borderBottomColor: "#505050",
          borderBottomWidth: 2,
          marginBottom: 10,
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "HeroBd",
            color: "white",
            fontSize: 35,
          }}
        >
          PROFILE
        </Text>
      </View>
      <View style={{ gap: 15 }}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#202020",
            gap: 10,
            borderRadius: 50,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#d24dff",
              fontFamily: "HeroBd",
              backgroundColor: "#303030",
              fontSize: 20,
              padding: 10,
              borderRadius: 50,
            }}
          >
            NAME
          </Text>
          <Text
            style={{
              color: "white",
              fontFamily: "HeroRg",
              fontSize: 20,
              padding: 10,
            }}
          >
            {userSelector.profile.displayName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#202020",
            gap: 10,
            borderRadius: 50,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#d24dff",
              fontFamily: "HeroBd",
              backgroundColor: "#303030",
              fontSize: 20,
              padding: 10,
              borderRadius: 50,
            }}
          >
            EMAIL
          </Text>
          <Text
            style={{
              color: "white",
              fontFamily: "HeroRg",
              fontSize: 20,
              padding: 10,
            }}
          >
            {userSelector.profile.email}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#202020",
            gap: 10,
            borderRadius: 50,
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Text
            style={{
              color: "#d24dff",
              fontFamily: "HeroBd",
              backgroundColor: "#303030",
              fontSize: 20,
              padding: 10,
              borderRadius: 50,
            }}
          >
            UID
          </Text>
          <Text
            style={{
              color: "white",
              fontFamily: "HeroRg",
              fontSize: 20,
              padding: 10,
            }}
          >
            {userSelector.profile.uid.slice(0, 17)} . . .
          </Text>
          <View style={{ marginLeft: "auto", padding: 10 }}>
            <TouchableOpacity onPress={copyToClipboard}>
              <AntDesign name="copy1" size={24} color="#d24dff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 20, gap: 15 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            alignItems: "center",
            backgroundColor: "#202020",
            borderRadius: 20,
          }}
          onPress={() => navigation.navigate("FavoriteNavigator")}
        >
          <Text style={{ color: "white", fontFamily: "HeroBd", fontSize: 25 }}>
            OPEN FAVORITES
          </Text>
          <Feather name="arrow-right-circle" size={30} color="#d24dff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            alignItems: "center",
            backgroundColor: "#202020",
            borderRadius: 20,
          }}
          onPress={() => navigation.navigate("WatchlistNavigator")}
        >
          <Text style={{ color: "white", fontFamily: "HeroBd", fontSize: 25 }}>
            OPEN WATCHLIST
          </Text>
          <Feather name="arrow-right-circle" size={30} color="#d24dff" />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            gap: 10,
            backgroundColor: "#202020",
            padding: 10,
            borderRadius: 20,
          }}
          onPress={handleSignout}
        >
          <Text style={{ color: "white", fontFamily: "HeroBd", fontSize: 25 }}>
            SIGN OUT
          </Text>
          <FontAwesome name="sign-out" size={24} color="#d24dff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
