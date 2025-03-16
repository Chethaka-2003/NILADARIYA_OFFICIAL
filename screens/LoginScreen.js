import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import NavigationBar from '../NavigationBar';
import Background from '../GradientBackground';
import axios from 'axios';
import CustomAlert from './CustomAlert';


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');


  const navigation = useNavigation();

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);

    if (!email || !password) {
      setAlertTitle('ERROR');
      setAlertMessage('Please enter email and password');
      setAlertVisible(true);
      return;
    }

    axios.post('http://192.168.1.136:4000/login', { email, password })
      .then(res => {
        console.log('Response:', res.data);
        if (res.data.status === 'OK') {
          navigation.navigate(NavigationBar);
        } else {
          console.log('Error:', res.data.message);
          setAlertTitle('ERROR');
          setAlertMessage(res.data.message);
          setAlertVisible(true);
        }
      })
      .catch(error => {
        console.log('Error:', error);
        setAlertTitle('ERROR');
        setAlertMessage(error.message);
        setAlertVisible(true);
      });
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Background />
      <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="black"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="black"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.showPasswordIcon}
            >
              <MaterialIcons
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => alert('Forgot Password functionality')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  title: { fontSize: 30, fontWeight: 'bold' },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '80%',
    marginTop: 50,
  },
  input: {
    height: 50,
    backgroundColor: '#d3d3d3',
    borderRadius: 20,
    marginBottom: 30,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  forgotPassword: {
    marginTop: 30,
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginButton: {
    marginTop: 50,
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 410,
    width: 200,
  },
  showPasswordIcon: {
    marginLeft: 280,
    marginTop: -65,
  },
});
