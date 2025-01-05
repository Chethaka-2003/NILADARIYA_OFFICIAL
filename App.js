// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import Loading from './screens/Loading';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <SignupScreen/>
  );
}

export default App;