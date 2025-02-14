import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import Screen from './Screen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import SettingsPg from './SettingsPg';
import NavigationBar from './NavigationBar';
import { StatusBar } from 'expo-status-bar';


const Stack = createStackNavigator();

export default function App() {
  

  // return (< Loading/>);
  return (
    <>
    <StatusBar style='auto'/>
  <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen"
    screenOptions={{ headerShown: false }}>
    
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Screen" component={Screen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SettingsPg" component={SettingsPg}/>
      <Stack.Screen name='NavigationBar' component={NavigationBar}/>
    </Stack.Navigator>
  </NavigationContainer>;
  </>
  
  // const [isSplashVisible, setIsSplashVisible] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsSplashVisible(false);
  //   }, 4000); // 3 seconds

  //   return () => clearTimeout(timer);
  // }, []);

  // return (
  //   <View style={{ flex: 1 }}>
  //     {isSplashVisible ? <SplashScreen /> : <Screen />}
  //   </View>
  // );
);
  }
  
   


