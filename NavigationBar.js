import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import SettingsPg from "./SettingsPg";
import Profile from '../Profiles/Officer(User)';
import HomePg from './UpdatedMenuOptions';


const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  return (

    <Tab.Navigator

      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false, // hide the header

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Settings') {  //apply icons to the tabs
            iconName = 'settings';
          } else if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          const iconSize = focused ? size + 15 : size

          // You can return any component that you like here!
          return (
            <View style={focused ? styles.focusedIconContainer : null}>
              <Feather name={iconName} size={iconSize} color={color} />
            </View>
          );
        },

        tabBarLabel: () => null, //hide the lable

        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#2c3e50',
          borderTopWidth: 0,
          elevation: 5,
          height: 50,
          borderRadius: 100,
          position: 'absolute',
          marginBottom: 20,
          marginLeft: 70,
          marginRight: 70,
          paddingTop: 5,
        },

      })}
    >
      {/* add the screens to the navigation bar */}
      <Tab.Screen name="Home" component={HomePg} />
      <Tab.Screen name="Profile" component={Profile} />
      
      <Tab.Screen name="Settings" component={SettingsPg} />
    </Tab.Navigator>

  );
}

const styles = StyleSheet.create({

  focusedIconContainer: {
    marginBottom: 25,
    width: 65,
    height: 65,
    borderRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',

  },
});