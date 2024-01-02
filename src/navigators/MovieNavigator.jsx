import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import Home from "../screens/Home";
import MovieDetails from "../screens/MovieDetails";
import Recommendation from "../screens/Recommendation"
const Stack = createStackNavigator();

const MovieNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen component={Home} name="Home" />
      <Stack.Screen component={MovieDetails} name="MovieDetails" />
      <Stack.Screen component={Recommendation} name="Recommendation" />
    </Stack.Navigator>
  );
};

export default MovieNavigator;
