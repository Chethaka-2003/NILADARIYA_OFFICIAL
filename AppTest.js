import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OfficerPreview from './Profiles/OfficerPreview';
import OfficerSelecting from './Profiles/OfficerSelecting';




const Stack = createStackNavigator();



export default function App(navigation) {

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="OfficerSelecting" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OfficerSelecting" component={OfficerSelecting} options={{ title: "Officers" }}/>
          <Stack.Screen name="OfficerPreview" component={OfficerPreview} />
         
        </Stack.Navigator>
      </NavigationContainer>
    );
  }




