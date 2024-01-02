import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import MainChat from "../screens/MainChat";
import ProfileSearchNavigator from "./ProfileSearchNavigator";
const Stack = createStackNavigator();

const ChatNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
      }}
      initialRouteName="MainChat"
    >
      <Stack.Screen name="MainChat" component={MainChat} />
      <Stack.Screen name="ProfileSearchNavigator" component={ProfileSearchNavigator} />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
