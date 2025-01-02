import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './SplashScreen';
import WelcomeScreen from './WelcomePg';

export default function App() {
  
 
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 5000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isSplashVisible ? <SplashScreen /> : <WelcomeScreen />}
    </View>
  );
  }
  
   


