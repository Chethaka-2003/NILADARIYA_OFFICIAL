import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

import SplashScreen from './Required/SplashScreen';
import Screen from './StartUP/Screen';
import SignupScreen from './StartUP/SignupScreen';
import LoginScreen from './StartUP/LoginScreen';
import SettingsPg from './Required/SettingsPg';
import NavigationBar from './Required/NavigationBar';
import Language from './SettingsPages/Language';
import Security from './SettingsPages/Security';
import Rate from './SettingsPages/Rate';
import CustomAlert from './Alerts/CustomAlert';
import DeathCertificateForm from './OtherPages/DeathCertificateForm';
import AboutApp from './SettingsPages/AboutApp';
import LogOut from './SettingsPages/LogOut';
import Lock from './Required/Lock';
import DivisionalCouncil from './OtherPages/DivisionalCouncil';
import MenuOptions from './Required/UpdatedMenuOptions';
import BirthCertificate from './DocumentsPages/BirthCertificate';
import UnderConstruction from './OtherPages/UnderConstruction';
import ChatScreen from './Profiles/ChatScreen';
import OfficerPage from './Profiles/OfficerPage';
import SettingsPgOfficer from './Required/SettingsPgOfficer';
import OfficerPreview from './Profiles/OfficerPreview';
import OfficerSelecting from './Profiles/OfficerSelecting';
import SetPasscode from './StartUP/SetPasscode';
import UpdatePasscode from './Required/UpdatePasscode';















const Stack = createStackNavigator();
LogBox.ignoreLogs([
  'Warning: Text strings must be rendered within a <Text> component.'
]);

export default function App(navigation) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [pushToken, setPushToken] = useState(null);


  useEffect(() => {
    const timer = setTimeout(() => {
      AsyncStorage.getItem('jwtToken')
        .then(token => {
          if (token) {
            setIsLoggedIn(true);
            // Also load the user type
            AsyncStorage.getItem('userType').then(type => {
              if (type) setUserType(type);
            });
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch(err => console.log(err));
    }, 4000); // 4-second delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  useEffect(() => {
    const checkPinOnAppStart = async () => {
      const isLoggedIn = await AsyncStorage.getItem('jwtToken');
      if (isLoggedIn) {
        navigation.navigate('Lock'); // Navigate to Lock screen
      }
    };

    checkPinOnAppStart();
  }, []);


  useEffect(() => {
    // Request permission and get the push token
    const getPushToken = async () => {
      const { status } = await Notifications.requestPermissionsAsync();

      if (status === 'granted') {
        const token = await Notifications.getExpoPushTokenAsync();
        setPushToken(token.data);
        // Optionally, save the token to AsyncStorage or send it to your backend
        await AsyncStorage.setItem('pushToken', token.data);
        console.log("Expo Push Token:", token.data);

        // Send the token to your backend
        await axios.post('https://niladariya-official-backend.onrender.com/FeedBack/save-push-token', {
          pushToken: token.data,
        });
      } else {
        console.log("Push notification permission not granted.");
      }
    };

    getPushToken();
  }, []); // Run once when the component mounts

  // Example handler for login success or switching accounts
  const handleLoginSuccess = (newUserType) => {
    setIsLoggedIn(true);
    setUserType(newUserType);
    AsyncStorage.setItem('userType', newUserType);
    // Reset the navigation stack to the appropriate screen
    if (navRef.current) {
      const routeName = newUserType === 'government' ? 'OfficerPage' : 'NavigationBar';
      navRef.current.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: routeName }],
        })
      );
    }
  };

  if (!isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Screen" component={Screen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name='NavigationBar' component={NavigationBar} />
          <Stack.Screen name='SettingsPg' component={SettingsPg} />
          <Stack.Screen name='Language' component={Language} />
          <Stack.Screen name="Security" component={Security} />
          <Stack.Screen name="Rate" component={Rate} />
          <Stack.Screen name="CustomAlert" component={CustomAlert} />
          <Stack.Screen name="DeathCertificateForm" component={DeathCertificateForm} />
          <Stack.Screen name="AboutApp" component={AboutApp} />
          <Stack.Screen name="LogOut" component={LogOut} />
          <Stack.Screen name="Lock" component={Lock} />
          <Stack.Screen name="MenuOptions" component={MenuOptions} />
          <Stack.Screen name="DivisionalCouncil" component={DivisionalCouncil} />
          <Stack.Screen name="BirthCertificate" component={BirthCertificate} />
          <Stack.Screen name="UnderConstruction" component={UnderConstruction} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="OfficerPage" component={OfficerPage} />
          <Stack.Screen name="SettingsPgOfficer" component={SettingsPgOfficer} />
          <Stack.Screen name="OfficerSelecting" component={OfficerSelecting} options={{ title: "Officers" }} />
          <Stack.Screen name="OfficerPreview" component={OfficerPreview} />
          <Stack.Screen name="SetPasscode" component={SetPasscode} />
          <Stack.Screen name="UpdatePasscode" component={UpdatePasscode} />


        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // If logged in, navigate to either OfficerPage or NavigationBar
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        {userType === 'government' ? (
          <>
            
            <Stack.Screen name="OfficerPage" component={OfficerPage} />
            <Stack.Screen name='SettingsPgOfficer' component={SettingsPgOfficer} />

            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          </>

        ) : (
          <>
            <Stack.Screen name="Lock" component={Lock} />
            <Stack.Screen name="NavigationBar" component={NavigationBar} />
            <Stack.Screen name="DeathCertificateForm" component={DeathCertificateForm} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="UnderConstruction" component={UnderConstruction} />
            <Stack.Screen name="DivisionalCouncil" component={DivisionalCouncil} />
            <Stack.Screen name="BirthCertificate" component={BirthCertificate} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="OfficerPage" component={OfficerPage} />
            <Stack.Screen name="SettingsPgOfficer" component={SettingsPgOfficer} />
            <Stack.Screen name="OfficerSelecting" component={OfficerSelecting} options={{ title: "Officers" }} />
            <Stack.Screen name="OfficerPreview" component={OfficerPreview} />
            <Stack.Screen name="UpdatePasscode" component={UpdatePasscode} />


          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );


}




