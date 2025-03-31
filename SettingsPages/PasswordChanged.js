//NOT IN USE

import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import axios from 'axios'; // Make sure axios is imported for API calls
import CustomAlert from '../Alerts/CustomAlert';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

export const PasswordChange = ({ visible, onClose }) => {

  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const [isCodeSent, setIsCodeSent] = useState(false);  // Flag for code sent
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false); // Flag for password modal

  const [showPassword, setShowPassword] = useState(false);  // Toggle for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  // Toggle for confirm password visibility

  const [newPasswordError, setNewPasswordError] = useState('');  // Error state for new password
  const [confirmPasswordError, setConfirmPasswordError] = useState('');  // Error state for confirm password

  const handleEmailChange = (e) => {
    setEmail(e.nativeEvent.text);  // Update email state when user types
  };

  // Handle sending the verification code to the email
  const handleSendVerification = () => {   
    if (!email) {
      setAlertTitle('Error');
      setAlertMessage('Please enter your email to receive a verification code.');
      setAlertVisible(true);
      return;
    }

    axios.post('https://niladariya-official-backend.onrender.com/auth/send-verification', { email, isPasswordReset: true })
      .then(res => {
        if (res.data.status === "OK") {
          setAlertTitle('Verification Code Sent');
          setAlertMessage('Check your email for the verification code.');
          setAlertVisible(true);
          setIsCodeSent(true);  // Show verification code input and submit button
        } else {
          setAlertTitle('Error');
          setAlertMessage(res.data.data);
          setAlertVisible(true);
        }
      })
      .catch(err => console.log(err));
  };

  // Handle verification code submission
  const handleSubmitVerification = () => {  
    if (!verificationCode) {
      setAlertTitle('Error');
      setAlertMessage('Please enter the verification code.');
      setAlertVisible(true);
      return;
    }

    axios.post('https://niladariya-official-backend.onrender.com/auth/verify-code', { email, code: verificationCode })
      .then(res => {
        if (res.data.status === "OK") {
          setAlertTitle('Success');
          setAlertMessage('Code verified successfully!');
          setAlertVisible(true);
          setIsPasswordModalVisible(true);  // Show the password change input
        } else {
          setAlertTitle('Error');
          setAlertMessage(res.data.data);  // Show error message for invalid code
          setAlertVisible(true);
        }
      })
      .catch(err => console.log(err));
  };

  // Validate the password (strength validation)
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  // Handle password change after code verification
  const handlePasswordChange = () => {
    // Reset errors
    setNewPasswordError('');
    setConfirmPasswordError('');

    if (!newPassword || !confirmPassword) {
      setAlertTitle('Error');
      setAlertMessage('Please enter both password fields.');
      setAlertVisible(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      return;
    }

    if (!validatePassword(newPassword)) {
      setNewPasswordError('Password must be at least 8 characters long, and contain one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    axios.post('https://niladariya-official-backend.onrender.com/auth/change-password', { email, newPassword, code: verificationCode })
      .then(res => {
        if (res.data.status === "OK") {
          setAlertTitle('Success');
          setAlertMessage('Your password has been successfully changed.');
          setAlertVisible(true);
          setTimeout(() => {
            onClose(); // Close the modal after success
          }, 2000); // Delay before closing modal to allow user to see the alert
        } else {
          setAlertTitle('Error');
          setAlertMessage(res.data.data);
          setAlertVisible(true);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <FeatherIcon name="x-circle" size={30} color="black" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Change Password</Text>

          {/* Email Input Section */}
          {!isPasswordModalVisible ? (
            <View style={styles.contBox}>
              <View style={styles.action}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="black"
                  keyboardType="email-address"
                  value={email}  // Bind value to the email state
                  onChange={handleEmailChange}  // Update email state on input change
                />
              </View>
            </View>
          ) : (
            // Password Input Section
            <View style={styles.contBox}>
              <Text style={styles.label}>New Password</Text>
              <View style={[styles.action, newPasswordError ? { borderColor: 'red' } : null]}>
                <TextInput
                  placeholder="New Password"
                  placeholderTextColor="black"
                  secureTextEntry={!showPassword}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.nativeEvent.text)}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}c>
                  <FeatherIcon name={showPassword ? "eye-off" : "eye"} size={20} />
                </TouchableOpacity>
              </View>
              {newPasswordError ? <Text style={styles.errorText}>{newPasswordError}</Text> : null}

              <Text style={styles.label}>Confirm Password</Text>
              <View style={[styles.action, confirmPasswordError ? { borderColor: 'red' } : null]}>
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor="black"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                  <FeatherIcon name={showConfirmPassword ? "eye-off" : "eye"} size={20} />
                </TouchableOpacity>
              </View>
              {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
            </View>
          )}

          {/* Show Submit Code Button after the code is sent */}
          {isCodeSent && !isPasswordModalVisible && (
            <>
              {/* Verification Code Section */}
              <Text style={styles.label}>Enter Verification Code</Text>
              <TextInput
                style={styles.input1}
                placeholder="Enter Code"
                keyboardType="numeric"
                onChangeText={setVerificationCode}
              />
              <TouchableOpacity
                onPress={handleSubmitVerification}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Submit Code</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Request Code Button */}
          {!isCodeSent && (
            <TouchableOpacity
              onPress={handleSendVerification}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Request Code</Text>
            </TouchableOpacity>
          )}

          {/* If the code has been verified, show the Change Password button */}
          {isPasswordModalVisible && (
            <TouchableOpacity
              onPress={handlePasswordChange}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  action: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    borderWidth: 1, 
    borderColor: '#420475', 
    backgroundColor: '#d3d3d3', 
    borderRadius: 15, 
    position: 'relative', 
    marginBottom: height * 0.02, 
    width: width * 0.7, 
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  input1: {
    width: '40%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    borderRadius: 100,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: height * 0.02
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
});

export default PasswordChange;
