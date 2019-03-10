import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../assets/icons/TabBarIcon";
import HomeScreen from "../screens/Home/HomeScreen";
import LinksScreen from "../screens/Links/LinksScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import WeightScreen from "../screens/Weight/WeightScreen";
import WeightIcon from "../assets/icons/WeightIcon";
import WeightChart from "../screens/Links/Weightchart/WeightChart";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const LinksStack = createStackNavigator({
  Links: LinksScreen
});

LinksStack.navigationOptions = {
  tabBarLabel: "Links",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

const WeightStack = createStackNavigator({
  Weight: WeightScreen,
  Weightchart: WeightChart
});

WeightStack.navigationOptions = {
  tabBarLabel: "Weight",
  tabBarIcon: ({ focused }) => <WeightIcon focused={focused} />
};

export default createBottomTabNavigator({
  WeightStack,
  HomeStack,
  LinksStack,
  SettingsStack
});
