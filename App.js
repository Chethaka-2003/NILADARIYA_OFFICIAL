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
import ProfilePage from './screens/profile_1';
import ProfilePage2 from './screens/profile_2';
import ProfilePage3 from './screens/profile_3';
import Language from './screens/Language';
import RateApp from './screens/Rate';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Language/>
  );
}

export default App;