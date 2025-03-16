import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './Required/SplashScreen';
import Screen from './StartUP/Screen';
import SignupScreen from './StartUP/SignupScreen';
import LoginScreen from './StartUP/LoginScreen';
import SettingsPg from './Required/SettingsPg';
import NavigationBar from './Required/NavigationBar';
import { StatusBar } from 'expo-status-bar';
import Language from './SettingsPages/Language';
import Security from './SettingsPages/Security';
import AboutUs from './SettingsPages/AboutUs';
import Rate from './SettingsPages/Rate';
import CustomAlert from './Alerts/CustomAlert';
import FeedbackSubmitted from './SettingsPages/FeedbackSubmitted';
import { LogBox } from 'react-native';
import DeathCertificateForm from './OtherPages/DeathCertificateForm';
import Selection from './StartUP/Selection';

const Stack = createStackNavigator();
LogBox.ignoreLogs([
  'Warning: Text strings must be rendered within a <Text> component.'
]);

export default function App() {


  // return (< Loading/>);
  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>

        <Stack.Navigator initialRouteName="SplashScreen"
          screenOptions={{ headerShown: false }}>

          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Screen" component={Screen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SettingsPg" component={SettingsPg} />
          <Stack.Screen name='NavigationBar' component={NavigationBar} />
          <Stack.Screen name='Language' component={Language} />
          <Stack.Screen name="Security" component={Security} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
          <Stack.Screen name="Rate" component={Rate} />
          <Stack.Screen name="CustomAlert" component={CustomAlert} />
          <Stack.Screen name="FeedbackSubmitted" component={FeedbackSubmitted} />
          <Stack.Screen name="DeathCertificateForm" component={DeathCertificateForm} />


        </Stack.Navigator>

        {/* <Stack.Navigator initialRouteName="Selection"
          screenOptions={{ headerShown: false }}>

          <Stack.Screen name="Selection" component={Selection} />
          </Stack.Navigator> */}
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




