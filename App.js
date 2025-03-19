import 'react-native-gesture-handler';
import * as React from 'react';
import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuOptions from './UpdatedMenuOptions';
import DivisionalCouncil from './DivisionalCouncil';
import BirthCertificate from './BirthCertificate';
 
const Stack = createStackNavigator();
export default function App() {
return (
    <>
      <StatusBar style='auto'/>
      <NavigationContainer>
 
        <Stack.Navigator initialRouteName="DivisionalCouncil"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MenuOptions" component={MenuOptions} />
          <Stack.Screen name="DivisionalCouncil" component={DivisionalCouncil} />
          <Stack.Screen name="BirthCertificate" component={BirthCertificate} /> 
          
        </Stack.Navigator>
      </NavigationContainer>;
    </>
 
  );
}