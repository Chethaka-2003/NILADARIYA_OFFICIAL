import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Officer from "./Officer";  // Ensure correct path
import LiveChatScreen from "./LiveChatScreen";    // Ensure correct path

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Officer" component={Officer} />
        <Stack.Screen name="LiveChatScreen" component={LiveChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent: 'center',
  },
});




