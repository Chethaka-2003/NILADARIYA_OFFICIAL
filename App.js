import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Switch, TouchableOpacity, ImageBackground } from 'react-native';

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <ImageBackground source={require('./assets/background.jpg')} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        
        {/* Government Logo */}
        <Image
        style={styles.logo}
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} // Profile icon from Flaticon
        onError={(error) => console.error('Failed to load image:', error.nativeEvent.error)}
        />
      

        {/* Profile Picture */}
        <Image
          style={styles.profilePic}
          source={{ uri: 'https://www.flaticon.com/free-icon/profile_3135715' }} // Replace with the profile picture URL
        />

        {/* Name */}
        <Text style={styles.name}>RAJAMUNI UDAYAKUMARA</Text>

        {/* Switch */}
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.switch}
        />

        {/* Buttons */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>POSITION</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>CONTACT DETAILS</Text>
        </TouchableOpacity>

        {/* Save Changes Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, // Makes the background fill the screen
        justifyContent: 'center', // Centers content vertically
        alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  switch: {
    marginVertical: 20,
  },
  button: {
    width: '80%',
    padding: 10,
    backgroundColor: '#d3d3d3', // Light gray button
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    width: '80%',
    padding: 15,
    backgroundColor: '#6a0dad', // Purple button
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // White text
  },
});
