import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/settings.png')}
        style={styles.background}
        blurRadius={10}
      >
        <View style={styles.container}>
            {/* Close Button */}
          <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Select Language</Text>
          <View style={styles.languageBox}>
            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => changeLanguage('English')}
            >
              <MaterialIcons
                name={selectedLanguage === 'English' ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={24}
                color="black"
              />
              <Text style={styles.languageText}>English</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => changeLanguage('Sinhala')}
            >
              <MaterialIcons
                name={selectedLanguage === 'Sinhala' ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={24}
                color="black"
              />
              <Text style={styles.languageText}>සිංහල</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => changeLanguage('Tamil')}
            >
              <MaterialIcons
                name={selectedLanguage === 'Tamil' ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={24}
                color="black"
              />
              <Text style={styles.languageText}>தமிழ்</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    top: 200,
  },
  languageBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    top: 220,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
  },
  languageText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 100,
    right: 40,
    backgroundColor: 'black', // Black background
    width: 30,
    height: 30,
    borderRadius: 15, // Circular button
    justifyContent: 'center', // Center the text inside the circle
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white', // White text
    fontSize: 20,
    fontWeight: 'bold',
  },
});
