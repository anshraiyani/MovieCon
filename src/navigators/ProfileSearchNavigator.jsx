import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import SearchProfile from "../screens/SearchProfile";
import OtherProfile from "../screens/OtherPofile";
const Stack = createStackNavigator();

const ProfileSearchNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
      }}
      initialRouteName="SearchProfile"
    >
      <Stack.Screen name="SearchProfile" component={SearchProfile} />
      <Stack.Screen name="OtherProfile" component={OtherProfile} />
    </Stack.Navigator>
  );
};

export default ProfileSearchNavigator;
