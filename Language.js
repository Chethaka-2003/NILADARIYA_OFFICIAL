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

export default function LanguageSelector({ onClose }) { // Accept onClose for closing
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ImageBackground source={require('./background.png')} style={styles.background} blurRadius={10}>
      <Background type="type2" />
      <View style = {styles.container}> 
          <Text style = {styles.headerText}>APP Settings</Text>
          <FeatherIcon name="settings" style = {styles.mainIcon} />
        </View>

        <ScrollView>
          <View style = {styles.section}>

            {/* Language changer */}
            <TouchableOpacity onPress={() => alert('You have selected the first option') } style = {styles.row}>
              <View style = {styles.box}>
                <FeatherIcon name="globe" style = {styles.icon}/>
              </View>
              <Text style = {styles.rowLabel}>Language</Text>
              <View style = {styles.rowSpacer}/>

              <FeatherIcon color = 'black' name='chevron-right' size={30}/>
            </TouchableOpacity>

            {/* Security button */}
            <TouchableOpacity onPress={() => alert('You have selected the first option')} style = {styles.row}>
              <View style = {styles.box}>
                <FeatherIcon name="shield" style = {styles.icon}/>
              </View>

              <Text style = {styles.rowLabel}>Security</Text>
              <View style = {styles.rowSpacer}/>

              <FeatherIcon color = 'black' name='chevron-right' size={30}/>              
            </TouchableOpacity>

            {/* Notification changer */}
            
            <View style = {styles.row}>
              <View style = {styles.box}>
                <FeatherIcon name="bell" style = {styles.icon}/>
              </View>
              

              <Text style = {styles.rowLabel}>Notifications</Text>
              <View style = {styles.rowSpacer}/>

              <Switch onValueChange={notifications => setForm ({...form, notifications})} value = {form.notifications}/>
            </View>
            

            {/* About App */}
            <TouchableOpacity onPress={() => alert('You have selected the first option')} style = {styles.row}>
              <View style = {styles.box}>
                <FeatherIcon name="info" style = {styles.icon}/>
              </View>
            
              <Text style = {styles.rowLabel}>About App</Text>
              <View style = {styles.rowSpacer}/>

              <FeatherIcon color = 'black' name='chevron-right' size={30}/>
            </TouchableOpacity>

            {/* RateUs */}
            <TouchableOpacity onPress={() => alert('You have selected the first option')} style = {styles.row}>
              <View style = {styles.box}>
                <FeatherIcon name="thumbs-up" style = {styles.icon}/>
              </View>
            
              <Text style = {styles.rowLabel}>Rate Us</Text>
              <View style = {styles.rowSpacer}/>

              <FeatherIcon color = 'black' name='chevron-right' size={30}/>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.container2}>
          {/* White Box */}
          <View style={styles.box}>
            {/* Close Button */}
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>Select Language</Text>

            {/* Language Options */}
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
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },
  container2: {
    alignItems: 'center',
    width: '100%',
  },
  box: {
    backgroundColor: 'white', // White background
    padding: 20,
    borderRadius: 10, // Rounded corners
    width: '80%',
    alignItems: 'center',
    elevation: 5, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  languageBox: {
    width: '100%',
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
    top: 10,
    right: 10,
    backgroundColor: 'black', // Black background
    width: 30,
    height: 30,
    borderRadius: 15, // Circular button
    justifyContent: 'center', // Center the text inside the circle
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white', // White text
    fontSize: 18,
    fontWeight: 'bold',
  },
  container:{ 
    alignItems: 'center', 
    marginTop: height * 0.05, 
  },
  
  headerText:{
    fontSize: width * 0.08,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },

  mainIcon:{
    fontSize: 60,
    color: 'black',
    marginTop: height * 0.02,
  },

  section:{
    paddingHorizontal: width * 0.1,
    paddingTop: height * 0.1,
  },

  icon:{
    fontSize:30,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  row:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 55,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    marginBottom: 30,
    paddingHorizontal: 12,
  },

  rowLabel:{
    fontSize: width * 0.05,
    paddingLeft: width * 0.02,
    fontWeight: 'bold',
    color: '#0c0c0c',
  },

  rowSpacer:{
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});