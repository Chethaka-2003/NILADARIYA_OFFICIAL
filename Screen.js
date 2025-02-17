import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, SafeAreaView, Image, Dimensions, Platform } from 'react-native';
import { LanguageContext } from './LanguageContext';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

export default function Screen({ navigation }) {
  const { language, setLanguage } = useContext(LanguageContext); // Use language context

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
            onPress={() => navigation.navigate('Profile')} // Navigate to ProfilePage
          >
            <Text style={[styles.buttonText, styles.publicButtonText]}>{publicButton}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.governmentButton]} // Apply specific style
            onPress={() => navigation.navigate('Profile')} // Navigate to ProfilePage
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
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: height * 0.05, // Adjusted for better spacing
  },
  logo: {
    width: width * 0.7, // Set specific width
    height: height * 0.2, // Set specific height
    marginBottom: height * 0.05,
    resizeMode: 'contain',
  },
  headingText: {
    color: '#333333',
    fontSize: width * 0.08,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.05, // Adjust spacing below heading
    lineHeight: width * 0.1, // Better alignment with font size
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  button: {
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.02, // Reduced margin between buttons
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
  languageButton: {
    position: 'absolute', // Position near the bottom
    bottom: Platform.OS === 'ios' ? height * 0.05 : height * 0.03, //Adjust for platform
    alignSelf: 'center',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    backgroundColor: '#2196F3',
    borderRadius: 8,
  },
  languageButtonText: {
    fontSize: width * 0.045,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});