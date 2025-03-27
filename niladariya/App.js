import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Officer from "./Officer"; 
//import PublicProfile from "./Public/PublicProfile";
//import App from "./DeathCertificate";
//import AppointmentScreen from "./AppointmentScreen";
import ChatScreen from "./ChatScreen";
//import InterOfficerChatScreen from "./InterOfficerChatScreen"; 
//import LiveChatScreen from "./LiveChatScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Officer">
        <Stack.Screen name="Officer" component={Officer} options={{ headerShown: false }} />
        {/* <Stack.Screen name="PublicProfile" component={PublicProfile} options={{ headerShown: false }} /> */}
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}




