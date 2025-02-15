
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Alert, } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Background from '../Background';
import axios from 'axios';


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

  const [showPassword, setShowPassword] = useState(false)

  const navigation = useNavigation();

  // function handleSubmit(){
  //   const userDate = {
  //     name: name,
  //     email,
  //     mobile,
  //     password,
  //   };
  //   axios
  //     .post('http://192.168.8.100:4000/register', userData)
  //     .then(res => console.log(res.data))
  //     .catch(e => console.log(e));
  // }

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

  function handleSignUp() {
    // if(nameVerify && emailVerify && mobileVerify && passwordVerify){
    //   navigation.navigate('LoginScreen');
    // }else{
    //   Alert.alert('Please fill all the fields correctly before proceeding.')
    // }

    const userData = {
      name: name,
      email,
      mobile,
      password,
    };
      axios
        .post('http://192.168.1.136:4000/register', userData)
        .then(res => {
          console.log(res.data);

          if (res.data.status == 'OK') {
            Alert.alert('User Created');
          } else {
            Alert.alert(JSON.stringify(res.data));
          }
        })
        .catch(e => console.log(e));
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>
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
            <Text style={styles.label}>EMAIL</Text>
            <View style={styles.action}>
              <TextInput
                style={styles.input}
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

          <View style={styles.contBox}>
            <Text style={styles.label}>MOBILE NUMBER</Text>
            <View style={styles.action}>
              <TextInput
                style={styles.input}
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
                  style={styles.input}
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

          <TouchableOpacity
            style={[styles.SignupButton, { opacity: nameVerify && emailVerify && mobileVerify && passwordVerify ? 1 : 0.5 }]}
            onPress={handleSignUp}
            disabled={!nameVerify || !emailVerify || !mobileVerify || !passwordVerify}
          >
            <Text style={styles.SignupButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 130,
    backgroundColor: 'white',
    borderTopLeftRadius: 120,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },

  loginTextContainer: {
    alignSelf: 'center',
  },

  loginText: {
    fontSize: 11,
    color: 'black',
    textDecorationLine: 'underline',
  },

  inputContainer: {
    width: '80%',
    marginTop: 20,
  },

  contBox: {
    marginBottom: 20
  },

  errorText: {
    color: 'red',
    marginTop: -15,
    marginBottom: 15,
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

  SignupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  SignupButton: {
    marginTop: 70,
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    width: '65%',
    alignSelf: 'center',
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8, // Adjusted gap between label and input field
    marginLeft: 5,
  },

});
