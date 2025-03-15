import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationBar from './NavigationBar';
import MenuOptions from './UpdatedMenuOptions';
import BirthCertificate from './BirthCertificate'

const Stack = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MenuOptions">
        <Stack.Screen name="MenuOptions" component={MenuOptions} />
        <Stack.Screen name="Municipal Council" component={MunicipalCouncil} />
        <Stack.Screen name="Birth Certificate" component={BirthCertificate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
