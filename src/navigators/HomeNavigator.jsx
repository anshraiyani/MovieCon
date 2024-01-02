import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import ChatNavigator from "./ChatNavigator";
import SearchNavigator from "./SearchNavigator";
import MovieNavigator from "./MovieNavigator";
import ProfileNavigator from "./ProfileNavigator";

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconname;
          if (route.name === "MovieNavigator") {
            iconname = focused ? "film-sharp" : "film-outline";
          } else if (route.name === "ProfileNavigator") {
            iconname = focused
              ? "person-circle-sharp"
              : "person-circle-outline";
          } else if (route.name === "ChatNavigator") {
            iconname = focused ? "chatbox-sharp" : "chatbox-outline";
          } else if (route.name === "SearchNavigator") {
            iconname = focused ? "search-sharp" : "search-outline";
          }
          return <Ionicons name={iconname} size={24} color={color} />;
        },
        tabBarActiveTintColor: "#d24dff",
        tabBarStyle: {
          backgroundColor: "black",
          paddingBottom: 5,
        },
      })}
      initialRouteName="MovieNavigator"
    >
      <Tab.Screen
        name="MovieNavigator"
        component={MovieNavigator}
        options={{ title: "HOME" }}
      />
      <Tab.Screen
        name="ChatNavigator"
        component={ChatNavigator}
        options={{ title: "CHAT" }}
      />
      <Tab.Screen
        name="SearchNavigator"
        component={SearchNavigator}
        options={{ title: "SEARCH" }}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{ title: "PROFILE" }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
