import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Officer from "./Officer"; 
//import LiveChatScreen from "./LiveChatScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Officer" component={Officer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




