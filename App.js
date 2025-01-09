import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Homepage from './Homepage';
import React, {useState} from 'react';

export default function App() {
  return(
    <View  style = {StyleSheet.container}>
      <Homepage/>
      <StatusBar style="auto"/>
    </View>  
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
})
