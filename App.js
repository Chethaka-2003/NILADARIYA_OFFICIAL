import 'react-native-gesture-handler';
import * as React from 'react';
import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuOptions from './UpdatedMenuOptions';
import DivisionalCouncil from './DivisionalCouncil';
import BirthCertificate from './BirthCertificate';
import MunicipalCouncil from './MunicipalCouncil';
import ElectricityBoard from './ElectricityBoard';
import Police from './Police';
import WaterSupplyBoard from './WaterSupplyBoard';
import LawCourt from './LawCourt';
 
const Stack = createStackNavigator();
export default function App() {
return (
    <>
      <StatusBar style='auto'/>
      <NavigationContainer>
 
        <Stack.Navigator initialRouteName="DivisionalCouncil"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MenuOptions" component={MenuOptions} />
          <Stack.Screen name="DivisionalCouncil" component={DivisionalCouncil} />
          <Stack.Screen name="BirthCertificate" component={BirthCertificate} /> 
          <Stack.Screen name="MunicipalCouncil" component={MunicipalCouncil} />
          <Stack.Screen name="ElectricityBoard" component={ElectricityBoard}/>
          <Stack.Screen name="Police" component={Police} />
          <Stack.Screen name="WaterSupplyBoard" component={WaterSupplyBoard}/>
          <Stack.Screen name="LawCourt" component={LawCourt}/>
          
        </Stack.Navigator>
      </NavigationContainer>;
    </>
 
  );
}