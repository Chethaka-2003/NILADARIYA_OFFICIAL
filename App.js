// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import Loading from './screens/Loading';
import SelectionPage from './screens/SelectionScreen1';
import AboutUs from './screens/AboutUs';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <AboutUs/>
  );
}

export default App;