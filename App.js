import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

import SplashScreen from './Required/SplashScreen';
import Screen from './StartUP/Screen';
import SignupScreen from './StartUP/SignupScreen';
import LoginScreen from './StartUP/LoginScreen';
import SettingsPg from './Required/SettingsPg';
import NavigationBar from './Required/NavigationBar';
import Language from './SettingsPages/Language';
import Security from './SettingsPages/Security';
import AboutUs from './SettingsPages/AboutUs';
import Rate from './SettingsPages/Rate';
import CustomAlert from './Alerts/CustomAlert';
import FeedbackSubmitted from './SettingsPages/FeedbackSubmitted';
import DeathCertificateForm from './OtherPages/DeathCertificateForm';
import AboutApp from './SettingsPages/AboutApp';
import OfficerPage from './Profiles/Officer(User)';
import Lock from './Required/Lock';
import Lockins from './lockins';




const Stack = createStackNavigator();
LogBox.ignoreLogs([
  'Warning: Text strings must be rendered within a <Text> component.'
]);

export default function App() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userType, setUserType] = useState(null);

  // useEffect(() => {
  //   // Check if JWT token exists
  //   AsyncStorage.getItem('jwtToken')
  //     .then(token => {
  //       if (token) {
  //         const decoded = jwt_decode(token);
  //         const currentTime = Date.now() / 1000;
  //         if (decoded.exp > currentTime) {
  //           setIsLoggedIn(true);
  //           setUserType(decoded.userType);
  //         } else {
  //           AsyncStorage.removeItem('jwtToken');
  //         }
  //       }
  //     })
  //     .catch(err => console.log(err));
  // }, []);

  // const handleLoginSuccess = (userType) => {
  //   setIsLoggedIn(true);
  //   setUserType(userType);

  //   // Reset the navigation stack and navigate to the appropriate screen
  //   if (userType === 'government') {
  //     navigation.dispatch(
  //       CommonActions.reset({
  //         index: 0,
  //         routes: [{ name: 'OfficerPage' }],
  //       })
  //     );
  //   } else {
  //     navigation.dispatch(
  //       CommonActions.reset({
  //         index: 0,
  //         routes: [{ name: 'NavigationBar' }],
  //       })
  //     );
  //   }
  // };

  // if (!isLoggedIn) {
  //   return (
  //     <NavigationContainer>
  //       <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
  //         <Stack.Screen name="SplashScreen" component={SplashScreen} />
  //         <Stack.Screen name="Screen" component={Screen} />
  //         <Stack.Screen name="SignupScreen" component={SignupScreen} />
  //         <Stack.Screen name="LoginScreen" component={LoginScreen} />
  //         <Stack.Screen name='NavigationBar' component={NavigationBar} />
  //         <Stack.Screen name='SettingsPg' component={SettingsPg} />
  //         <Stack.Screen name='Language' component={Language} />
  //         <Stack.Screen name="Security" component={Security} />
  //         <Stack.Screen name="AboutUs" component={AboutUs} />
  //         <Stack.Screen name="Rate" component={Rate} />
  //         <Stack.Screen name="CustomAlert" component={CustomAlert} />
  //         <Stack.Screen name="FeedbackSubmitted" component={FeedbackSubmitted} />
  //         <Stack.Screen name="DeathCertificateForm" component={DeathCertificateForm} />
  //         <Stack.Screen name="AboutApp" component={AboutApp} />
  //         <Stack.Screen name="OfficerPage" component={OfficerPage} />

  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   );
  // }

  //  // If logged in, navigate to either OfficerPage or NavigationBar
  //  return (
  //   <NavigationContainer>
  //     <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
  //       {userType === 'government' ? (
  //         <Stack.Screen name="OfficerPage" component={OfficerPage} />
  //       ) : (
  //         <Stack.Screen name="NavigationBar" component={NavigationBar} />
  //       )}
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lockins" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Lockins" component={Lockins} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}




