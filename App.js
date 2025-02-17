import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Homepage from './UpdatedMenuOptions';
import NavigationBar from './NavigationBar';
import MunicipalCouncil from './MunicipalCouncil';
import MenuOptions from './UpdatedMenuOptions';

const Stack = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MenuOptions">
        <Stack.Screen name="MenuOptions" component={MenuOptions} />
        <Stack.Screen name="Municipal Council" component={MunicipalCouncil} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// const styles = StyleSheet.create({
//   container:{
//     flex:1,
//   },
// })
