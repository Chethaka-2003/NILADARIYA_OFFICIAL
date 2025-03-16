import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, Dimensions,} from 'react-native';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import Background from '../Required/GradientBackground';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

export default function Screen({ navigation }) {
  return (
    
      <SafeAreaView style={{ flex: 1 }}>
        <Background />
        <View style={styles.container}>
        
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/Logo.png')} 
            style={styles.logo}
          />
        </View>

        {/* Greeting Text */}
        <Text style={styles.headingText}>ආයුබෝවන්</Text>
        <Text style={styles.headingText}>WELCOME</Text>
        <Text style={styles.headingText}>வணக்கம்</Text>

        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.publicButton]} // Apply specific style
            onPress={() => navigation.navigate(SignupScreen)} // Navigate to UserProfile
          >
            <Text style={[styles.buttonText, styles.publicButtonText]}>PUBLIC</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.governmentButton]} // Apply specific style
            onPress={() => navigation.navigate(LoginScreen)} // Navigate to UserOfficer
          >
            <Text style={[styles.buttonText, styles.governmentButtonText]}>GOVERNMENT</Text>
          </TouchableOpacity>
        </View>
        </View>

        <StatusBar style="auto" />
      </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: height * 0.1,
  },
  
  logoContainer: {
    alignItems: 'center',
    marginBottom: height * 0.10,
  },
  logo: {
    width: width * 0.6,
    height: height * 0.14,
    resizeMode: 'contain',
  },
  headingText: {
    color: '#333333',
    fontSize: width * 0.09,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.03,
    lineHeight: width * 0.12,
  },
  buttonContainer: {
    top: height * 0.1,
    width: '100%',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  button: {
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.04,
    marginBottom: height * 0.015,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  publicButton: {
    backgroundColor: '#4CAF50',
  },
  governmentButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    fontSize: width * 0.05,
    fontWeight: '500',
    textAlign: 'center',
  },
  publicButtonText: {
    color: '#FFFFFF',
  },
  governmentButtonText: {
    color: '#FFFFFF',
  },
});