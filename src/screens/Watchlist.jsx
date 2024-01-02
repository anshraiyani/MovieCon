import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectStateUser } from "../features/slices/userSlice";
import MovieCard from "../components/MovieCard";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Watchlist = ({ navigation }) => {
  const watchlist = useSelector(selectStateUser).watchlist;

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
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: "black",
        padding: 8,
      }}
    >
      <Text
        style={{
          color: "white",
          margin: 8,
          fontFamily: "HeroBd",
          fontSize: 30,
        }}
      >
        WATCHLIST
      </Text>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 50 }}
          data={watchlist}
          renderItem={({ item }) => (
            <MovieCard id={item} navigation={navigation} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Watchlist;
