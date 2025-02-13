import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  // State to handle the current language
  const [language, setLanguage] = useState('en'); // Default language: English
  const navigation = useNavigation();
  // Language dictionary
  const translations = {
    en: {
      greeting: 'ආයුබෝවන්                வணக்கம்                    WELCOME',
      publicButton: 'PUBLIC',
      governmentButton: 'GOVERNMENT',
    },
    si: {
      greeting: 'ආයුබෝවන්                வணக்கம்                    WELCOME',
      publicButton: 'මහජනයා',
      governmentButton: 'රාජ්‍ය සේවය',
    },
  };

  // Get the current translations
  const { greeting, publicButton, governmentButton } = translations[language];

  return (
    <ImageBackground
      source={require('./assets/ABC.jpg')}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('./assets/ABE.png')} 
            style={styles.logo}
          />

        </View>

        {/* Greeting Text */}
        <Text style={styles.headingText}>{greeting}</Text>

        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.publicButton]} // Apply specific style
            onPress={() => navigation.navigate('SignupScreen')}
          >
            <Text style={[styles.buttonText, styles.publicButtonText]}>{publicButton}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.governmentButton]} // Apply specific style
            onPress={() => navigation.navigate('SignupScreen')}
          >
            <Text style={[styles.buttonText, styles.governmentButtonText]}>{governmentButton}</Text>
          </TouchableOpacity>
        </View>

        {/* Language Toggle Button */}
        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => setLanguage(language === 'en' ? 'si' : 'en')} // Toggle language
        >
          <Text style={styles.languageButtonText}>
            {language === 'en' ? 'සිංහල' : 'English'}
          </Text>
        </TouchableOpacity>

        <StatusBar style="light" />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50, // Adjusted for better spacing
  },
  logo: {
    width: 350, // Set specific width
    height: 200, // Set specific height
    marginBottom: 70,
    resizeMode: 'contain',
  },
  headingText: {
    color: '#333333',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50, // Adjust spacing below heading
    lineHeight: 50, // Better alignment with font size
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 15, // Reduced margin between buttons
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, // Reduced shadow opacity for natural look
    shadowRadius: 4,
    elevation: 3,
  },
  publicButton: {
    backgroundColor: '#4CAF50', // Green for Public Button
  },
  governmentButton: {
    backgroundColor: '#F44336', // Red for Government Button
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  publicButtonText: {
    color: '#FFFFFF',
  },
  governmentButtonText: {
    color: '#FFFFFF',
  },
  languageButton: {
    position: 'absolute', // Position near the bottom
    bottom: 30,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2196F3',
    borderRadius: 8,
  },
  languageButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
