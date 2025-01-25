import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';

export default function App() {
  
  return (<NavigationBar/>);
  // const [isSplashVisible, setIsSplashVisible] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsSplashVisible(false);
  //   }, 4000); // 3 seconds

  //   return () => clearTimeout(timer);
  // }, []);

  // return (
  //   <View style={{ flex: 1 }}>
  //     {isSplashVisible ? <SplashScreen /> : <WelcomeScreen />}
  //   </View>
  // );
  }
  
   


