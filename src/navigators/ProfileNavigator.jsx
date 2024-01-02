import React from "react";

import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Profile from "../screens/Profile";
import FavoriteNavigator from "./FavoriteNavigator";
import WatchlistNavigator from "./WatchlistNavigator";

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      }}
      initialRouteName="Profile"
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="FavoriteNavigator" component={FavoriteNavigator} />
      <Stack.Screen name="WatchlistNavigator" component={WatchlistNavigator} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;