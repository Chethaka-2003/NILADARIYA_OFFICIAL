import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Vibration, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../Required/GradientBackground';

const SetPasscode = ({ navigation }) => {
  const [passcode, setPasscode] = useState(''); // Passcode entry
  const [confirmPasscode, setConfirmPasscode] = useState(''); // Confirm passcode entry
  const [errorMessage, setErrorMessage] = useState(''); // Error message to display

  // Handle button press for numbers (passcode entry)
  const handleNumberPress = (number) => {
    if (passcode.length < 6) {
      setPasscode((prev) => prev + number);
      setErrorMessage(''); // Clear any previous error messages
    } else {
      setErrorMessage('Passcode cannot be more than 6 digits');
      Vibration.vibrate(); // Vibrate on error
    }
  };

  // Handle button press for numbers (confirm passcode entry)
  const handleConfirmNumberPress = (number) => {
    if (confirmPasscode.length < 6) {
      setConfirmPasscode((prev) => prev + number);
      setErrorMessage(''); // Clear any previous error messages
    } else {
      setErrorMessage('Confirm passcode cannot be more than 6 digits');
      Vibration.vibrate(); // Vibrate on error
    }
  };

  // Handle backspace for both fields
  const handleDeletePress = () => {
    if (passcode.length > confirmPasscode.length) {
      setPasscode((prev) => prev.slice(0, -1)); // Remove last digit of passcode
    } else {
      setConfirmPasscode((prev) => prev.slice(0, -1)); // Remove last digit of confirm passcode
    }
    setErrorMessage(''); // Clear any error messages
  };

  // Handle the action to set the passcode after confirmation
  const handleSetPasscode = async () => {
    if (passcode === confirmPasscode) {
      // Save the passcode securely in AsyncStorage
      await AsyncStorage.setItem('userPin', passcode);
      setPasscode('');
      setConfirmPasscode('');
      setErrorMessage('');
      navigation.navigate('Lock'); // Navigate to the lock screen after setting the passcode
    } else {
      setErrorMessage('Passcodes do not match');
      Vibration.vibrate(); // Vibrate on error
    }
  };

  // Render dots for passcode and confirm passcode
  const renderPasscodeDots = (code) => {
    return Array.from({ length: 6 }).map((_, i) => (
      <View
        key={i}
        style={[
          styles.passcodeDot,
          { backgroundColor: i < code.length ? '#FFD700' : 'transparent' },
        ]}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <View style={styles.card}>
        <Text style={styles.title}>Set Passcode</Text>

        {/* Render passcode input */}
        <Text style={styles.subTitle}>Enter Passcode</Text>
        <View style={styles.passcodeContainer}>{renderPasscodeDots(passcode)}</View>

        {/* Render confirm passcode input */}
        <Text style={styles.subTitle}>Confirm Passcode</Text>
        <View style={styles.passcodeContainer}>{renderPasscodeDots(confirmPasscode)}</View>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        {/* Number pad for passcode and confirm passcode */}
        <View style={styles.numberPad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'Del', 0].map((number, index) => (
            <TouchableOpacity
              key={index}
              style={styles.numberButton}
              onPress={() =>
                number === 'Del'
                  ? handleDeletePress()
                  : passcode.length < 6
                  ? handleNumberPress(number.toString()) // Passcode input
                  : handleConfirmNumberPress(number.toString()) // Confirm passcode input
              }
            >
              <Text style={styles.numberButtonText}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSetPasscode}>
          <Text style={styles.buttonText}>Set Passcode</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { padding: 25, borderRadius: 15, elevation: 6, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  subTitle: { fontSize: 16, color: '#fff', marginBottom: 10 },
  passcodeContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginBottom: 20 },
  passcodeDot: { width: 15, height: 15, borderRadius: 7.5, borderWidth: 1, borderColor: 'white' },
  errorText: { color: 'red', marginTop: 10 },
  numberPad: { marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  numberButton: { width: 80, height: 80, margin: 10, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  numberButtonText: { fontSize: 20, color: 'black', fontWeight: 'bold' },
  button: { backgroundColor: '#FFD700', borderRadius: 50, paddingVertical: 20, marginTop: 20, width: 300, alignItems: 'center', justifyContent: 'center' },
  buttonText: { fontSize: 20, color: '#000', fontWeight: 'bold' },
});

export default SetPasscode;
