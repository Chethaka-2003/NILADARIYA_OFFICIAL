import React from 'react';
import { View, Text, StyleSheet, ScrollView , SafeAreaView} from 'react-native';
import Background from './GradientBackground';

const LockInstructions = () => {
    
  return (
    <SafeAreaView flex={1}>
        <Background />
      <Text style={styles.title}>User Instructions for Lock Screen</Text>
      
      <Text style={styles.sectionTitle}>Introduction</Text>
      <Text style={styles.text}>
        The Lock Screen allows you to secure your application with a passcode. Follow the instructions below to use the Lock Screen effectively.
      </Text>
      
      <Text style={styles.sectionTitle}>Setting Up Your Passcode</Text>
      <Text style={styles.text}>
        1. Open the application and navigate to the Lock Screen.
        2. Enter a 6-digit passcode of your choice.
        3. Confirm your passcode by entering it again.
        4. Your passcode is now set and will be required to unlock the application.
      </Text>
      
      <Text style={styles.sectionTitle}>Unlocking the Application</Text>
      <Text style={styles.text}>
        1. Open the application and navigate to the Lock Screen.
        2. Enter your 6-digit passcode.
        3. If the passcode is correct, the application will unlock.
        4. If the passcode is incorrect, an error message will be displayed, and you will need to try again.
      </Text>
      
      <Text style={styles.sectionTitle}>Changing Your Passcode</Text>
      <Text style={styles.text}>
        1. Navigate to the settings page within the application.
        2. Select the option to change your passcode.
        3. Enter your current passcode.
        4. Enter a new 6-digit passcode.
        5. Confirm your new passcode by entering it again.
        6. Your passcode is now updated.
      </Text>
      
      <Text style={styles.sectionTitle}>Troubleshooting</Text>
      <Text style={styles.text}>
        If you encounter any issues with the Lock Screen, please try the following steps:
        1. Ensure that you are entering the correct 6-digit passcode.
        2. If you have forgotten your passcode, you may need to reset the application to its default settings.
        3. Contact support for further assistance.
      </Text>
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default LockInstructions;