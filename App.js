import React from 'react';
import AppNavigator from './AppNavigator';
import { LanguageProvider } from './LanguageContext';
import NavigationBar from './NavigationBar';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <LanguageProvider>
        <NavigationBar />
      </LanguageProvider>
    </NavigationContainer>
  );
}
