import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";

import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import AddNoteScreen from "./screens/AddNoteScreen";

const mainNavigator = createStackNavigator(
  {
    Splash: { screen: SplashScreen },
    Add: { screen: AddNoteScreen },
    Home: { screen: HomeScreen }
  },
  {
    initialScreen: "Splash",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#01CBC6"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const app = createAppContainer(mainNavigator);

export default app;
