import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const MainChat = ({ navigation }) => {
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
        backgroundColor: "black",
        height: "100%",
        padding: 8,
      }}
    >
      <View
        style={{
          borderBottomColor: "#505050",
          borderBottomWidth: 2,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "HeroBd",
            fontSize: 35,
            padding: 5,
          }}
        >
          CHAT
        </Text>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <TouchableOpacity onPress={()=>navigation.navigate('ProfileSearchNavigator')}>
            <Ionicons name="person-add" size={28} color="#d24dff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="bell" size={28} color="#d24dff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MainChat;
