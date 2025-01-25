import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import SettingsPg from "./SettingsPg";
import WelcomePg from "./WelcomePg";
import SplashScreen from "./SplashScreen";
import { Feather } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
       
        screenOptions={({ route }) => ({
            headerShown: false, // hide the header

            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

            if (route.name === 'Settings') {  //apply icons to the tabs
              iconName = 'settings';
            } else if (route.name === 'Home') {
              iconName = 'home';
            }else if (route.name === 'Profile') {
              iconName = 'user';
            }

            const iconSize = focused ? size + 15 : size

            // You can return any component that you like here!
            return( 
                <View style={focused ? styles.focusedIconContainer : null}>
                    <Feather name={iconName} size={iconSize} color={color} />
                </View>
                );
          },

          tabBarLabel:() => null, //hide the lable

          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'black',
          tabBarStyle: {
            backgroundColor: '#f8f8f8',
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
        <Tab.Screen name="Profile" component={SplashScreen} /> 
        <Tab.Screen name="Home" component={WelcomePg} />
        <Tab.Screen name="Settings" component={SettingsPg} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
    focusedIconContainer: {
    marginBottom: 25,
    width: 65,
    height: 65,
    borderRadius: 100,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',

  },
});