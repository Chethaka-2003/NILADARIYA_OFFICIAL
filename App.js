import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Screen from './Screen';
import UserOfficer from './userofficer';
import UserProfile from './ChatApp/chat';
import { UserProvider } from './UserContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Screen} options={{ headerShown: false }} />
          <Stack.Screen name="UserOfficer" component={UserOfficer} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="Chat" component={Screen} />  
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
