import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Screen from './Appointment';
import UserOfficer from './userofficer';
import UserProfile from './userprofile';
import { LanguageProvider } from './LanguageContext';
import { UserProvider } from './UserContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <LanguageProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Screen} options={{ headerShown: false }} />
            <Stack.Screen name="UserOfficer" component={UserOfficer} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
          </Stack.Navigator>
        </NavigationContainer>
      </LanguageProvider>
    </UserProvider>
  );
}
