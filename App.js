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
import Language from './Language';
import Security from './Security';
import AboutUs from './AboutUs';
import Welcom from './Welcom';
import Rate from './Rate';
import CustomAlert from './screens/CustomAlert';
import FeedbackSubmitted from './FeedbackSubmitted';
import { LogBox } from 'react-native';
import DeathCertificateForm from './DeathCertificateForm';
import BackgroundTest from './GradientBackground';

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
          <Stack.Screen name="Under" component={Welcom} />
         <Stack.Screen name="DeathCertificateForm" component={DeathCertificateForm} />

          
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




