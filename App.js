import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Switch, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const userName = "RAJAMUNI UDAYAKUMARA"; // Replace with dynamic data if needed.

  return (
    <ImageBackground
      source={require('./assets/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Government Logo */}
        <Image
          style={styles.logo}
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
          onError={(error) => console.error('Failed to load logo:', error.nativeEvent.error)}
          accessibilityLabel="Government logo"
        />

        {/* Profile Picture */}
        <Image
          style={styles.profilePic}
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
          onError={(error) => console.error('Failed to load profile picture:', error.nativeEvent.error)}
          accessibilityLabel="User profile picture"
        />

        {/* Name */}
        <Text style={styles.name}>{userName}</Text>

        {/* Switch */}
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.switch}
          accessibilityLabel="Enable or disable the setting"
        />

        {/* Buttons */}
        <TouchableOpacity style={styles.button} accessibilityLabel="View position details">
          <Text style={styles.buttonText}>POSITION</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} accessibilityLabel="View contact details">
          <Text style={styles.buttonText}>CONTACT DETAILS</Text>
        </TouchableOpacity>

        {/* Save Changes Button */}
        <TouchableOpacity style={styles.saveButton} accessibilityLabel="Save profile changes">
          <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for better readability
    borderRadius: 10,
    margin: 20,
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
    color: '#333', // Dark text color for readability
  },
  switch: {
    marginVertical: 20,
  },
  button: {
    width: '80%',
    padding: 12,
    backgroundColor: '#d3d3d3', // Light gray button
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  saveButton: {
    width: '80%',
    padding: 15,
    backgroundColor: '#6a0dad', // Purple button
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // White text
  },
});
