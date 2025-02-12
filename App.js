import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Homepage from './UpdatedMenuOptions';
import NavigationBar from './NavigationBar';


export default function App() {
  return(
    // <View  style = {styles.container}>
    //   <Homepage/>
    //   <StatusBar style="auto"/>
    // </View>
    <NavigationBar/> 
  );
}
// const styles = StyleSheet.create({
//   container:{
//     flex:1,
//   },
// })
