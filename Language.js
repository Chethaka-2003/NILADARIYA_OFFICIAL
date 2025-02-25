import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

const Language = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <ImageBackground source={require('./assets/Background.jpg')} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.alertBox}>

          {/* Close Button Inside the Box */}
          <TouchableOpacity onPress={() => navigation.navigate('SettingsPg')} style={styles.closeButton}>
            <FeatherIcon name="x-circle" size={28} color="black" />
          </TouchableOpacity>

          <Text style={styles.title}>Select Language</Text>

          <View style={styles.languageContainer}>
            <TouchableOpacity style={styles.languageButton} onPress={() => changeLanguage('English')}>
              <MaterialIcons
                name={selectedLanguage === 'English' ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={24}
                color="black"
              />
              <Text style={styles.languageText}>English</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.languageButton} onPress={() => changeLanguage('Sinhala')}>
              <MaterialIcons
                name={selectedLanguage === 'Sinhala' ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={24}
                color="black"
              />
              <Text style={styles.languageText}>සිංහල</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.languageButton} onPress={() => changeLanguage('Tamil')}>
              <MaterialIcons
                name={selectedLanguage === 'Tamil' ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={24}
                color="black"
              />
              <Text style={styles.languageText}>தமிழ்</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.okButton} 
              onPress={() => navigation.navigate('SettingsPg')}
            >
              <Text style={styles.okText}>SHIFT</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  languageContainer: {
    width: '100%',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  languageText: {
    fontSize: 16,
    marginLeft: 10,
  },
  okButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  okText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Language;
