import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Background from '../Background';
import CustomAlert from './CustomAlert';
import CustomLottieAlert from './CustomLottieAlert';
import successAnimation from '../assets/done.json';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [nameVerify, setNameVerify] = useState(false);
  const [nameError, setNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [emailError, setEmailError] = useState('');

  const [mobile, setMobile] = useState('');
  const [mobileVerify, setMobileVerify] = useState(false);
  const [mobileError, setMobileError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [lottieAlertVisible, setLottieAlertVisible] = useState(false);


  const navigation = useNavigation();


  function handleName(e) {
    const nameVar = e.nativeEvent.text;
    setName(nameVar);
    setNameVerify(false);
    setNameError('');

    const invalidCharRegex = /[^a-zA-Z\s]/;
    if (invalidCharRegex.test(nameVar)) {
      setNameError('Name should not contain numbers or special characters');
    } else if (nameVar.length === 1) {
      setNameError('Name should contain more than one letter');
    } else if (nameVar.length > 1) {
      setNameVerify(true);
    }
  }

  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(false);
    setEmailError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailVar.length > 0 && !emailRegex.test(emailVar)) {
      setEmailError('Invalid Email Address');
    } else if (emailRegex.test(emailVar)) {
      setEmailVerify(true);
    }
  }

  function handleMobile(e) {
    const mobileVar = e.nativeEvent.text;
    setMobile(mobileVar);
    setMobileVerify(false);
    setMobileError('');

    const mobileRegex = /[6-9]{1}[0-9]{8}/
    if (mobileVar.length > 0 && !mobileRegex.test(mobileVar)) {
      setMobileError('Invalid Phone Number');
    } else if (mobileRegex.test(mobileVar)) {
      setMobileVerify(true);
    }
  }

  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);
    setPasswordError('');

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
    if (passwordVar.length > 0 && !passwordRegex.test(passwordVar)) {
      setPasswordError('Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (@$!%*?&#)')
    } else if (passwordRegex.test(passwordVar)) {
      setPasswordVerify(true);
    }
  }


  const handleSendVerification = () => {   // Verification Part
    if (!email) {
      setAlertTitle('Error');
      setAlertMessage('Please enter your email to receive a verification code.');
      setAlertVisible(true);
      return;
    }

    axios.post('http://192.168.8.101:4000/send-verification', { email })
      .then(res => {
        if (res.data.status === "OK") {
          setAlertTitle('Verification Code Sent');
          setAlertMessage('Check your email for the verification code.');
          setAlertVisible(true);
          setIsCodeSent(true);
        } else {
          Alert.alert('Error', res.data.data);
        }
      })
      .catch(err => console.log(err));
  };

  const handleSignUp = () => {
    if (!isCodeSent || !verificationCode) {
      Alert.alert('Error', 'Please enter the verification code first.');
      return;
    }

    const userData = { name, email, mobile, password, code: verificationCode };

    axios.post('http://192.168.8.101:4000/register', userData)
      .then(res => {
        if (res.data.status === "OK") {
          setAlertTitle('Success');
          setAlertMessage('Account created successfully.');
          setLottieAlertVisible(true);
          setIsVerified(true);
        } else {
          Alert.alert('Error', res.data.data);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <Background type="type1" />

      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.loginTextContainer}>
          <Text style={styles.loginText}>Already Registered? Log In here</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>

          <View style={styles.contBox}>
            <Text style={styles.label}>NAME</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Name"
                placeholderTextColor="black"
                onChange={e => handleName(e)}
              />
              {name.length < 1 ? null : nameVerify ? (
                <Feather name="check-circle" color="green" size={20} style={styles.icon} />
              ) : (
                <Feather name="x-circle" color="red" size={20} style={styles.icon} />
              )}
            </View>
          </View>
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}


          <View style={styles.contBox}>
            <Text style={styles.label}>MOBILE NUMBER</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Mobile number"
                placeholderTextColor="black"
                keyboardType="phone-pad" // Allows phone number input
                onChange={e => handleMobile(e)}
              />
              {mobile.length < 1 ? null : mobileVerify ? (
                <Feather name="check-circle" color="green" size={20} style={styles.icon} />
              ) : (
                <Feather name="x-circle" color="red" size={20} style={styles.icon} />
              )}
            </View>
          </View>
          {mobileError ? <Text style={styles.errorText}>{mobileError}</Text> : null}


          <View style={styles.contBox}>
            <View style={styles.passwordContainer}>
              <Text style={styles.label}>PASSWORD</Text>
              <View style={styles.action}>
                <TextInput
                  placeholder='Password'
                  placeholderTextColor="black"
                  value={password}
                  onChange={e => handlePassword(e)}
                  secureTextEntry={!showPassword}
                />

                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
                  {password.length < 1 ? null : showPassword ? (
                    <Feather name="eye-off" color="black" size={20} />
                  ) : (
                    <Feather name="eye" color="black" size={20} />
                  )}

                </TouchableOpacity>
              </View>
            </View>
          </View>
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <View style={styles.contBox}>
            <Text style={styles.label}>EMAIL</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="black"
                keyboardType="email-address"
                onChange={e => handleEmail(e)}
                
              />
              {email.length < 1 ? null : emailVerify ? (
                <Feather name="check-circle" color="green" size={20} style={styles.icon} />
              ) : (
                <Feather name="x-circle" color="red" size={20} style={styles.icon} />
              )}
          
            </View>
            
          </View>
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}


          <View style={styles.container3}>
            

            <TouchableOpacity style={styles.buttonSmall} onPress={handleSendVerification}>
              <Text style={styles.buttonText2}>Send Code</Text>
            </TouchableOpacity>

          </View>

          {isCodeSent && (
            <>
              <Text style={styles.label}>VERIFICATION CODE</Text>
              <TextInput style={styles.input} placeholder="Enter Code" keyboardType="numeric" onChangeText={setVerificationCode} />
            </>
          )}


          <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={!isCodeSent || isVerified}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />

      <CustomLottieAlert
        visible={lottieAlertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setLottieAlertVisible(false)}
        animationSource={successAnimation} // Pass the Lottie animation source here
      />


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    backgroundColor: 'white',
    borderTopLeftRadius: 120,
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },

  container3: {
    marginTop: -20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: { fontSize: 30, fontWeight: 'bold' },
  loginTextContainer: { alignSelf: 'center' },
  loginText: { fontSize: 12, color: 'black', textDecorationLine: 'underline' },
  inputContainer: { width: '85%', marginTop: 20 },

  contBox: {
    marginBottom: 30,
  },


  errorText: {
    color: 'red',
    marginTop: -15,
    marginBottom: 25,
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
  },

  icon: {
    position: 'absolute',
    right: 15,
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },

  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#420475',
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    marginBottom: 10,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  buttonSmall: {
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#420475',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'black',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
  buttonText2: { color: 'black', fontWeight: 'bold' },
});
