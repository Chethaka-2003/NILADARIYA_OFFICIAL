import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';


import Background from '../Required/GradientBackground';
import axios from 'axios';
import CustomAlert from '../Alerts/CustomAlert';
import ForgetPassword from '../OtherPages/FogetPassword';


// Get screen dimensions
const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const [modalVisible, setModalVisible] = useState(false);


  // const navigation = useNavigation();

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  
    if (!email || !password) {
      setAlertTitle('ERROR');
      setAlertMessage('Please enter email and password');
      setAlertVisible(true);
      return;
    }
  
    axios.post('https://niladariya-official-backend.onrender.com/auth/login', { email: email, password })
    
        .then(response => {
          const { token, userType } = response.data;
    
          // Log token for debugging
          console.log('JWT Token:', token);
    
          AsyncStorage.setItem('jwtToken', token);
          AsyncStorage.setItem('userType', userType);
    
          // Decode JWT token and check user session
          const decoded = jwt_decode(token); // Correct use of jwt_decode
          console.log('Decoded JWT:', decoded);
    
          // Handle login success and reset navigation stack
          if (userType === 'government') {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'OfficerPage' }],
              })
            );
          } else {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'NavigationBar' }],
              })
            );
          }
        })
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Background />
      <View style={styles.container}>.
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
              style={styles.eyeIcon}
            >
              <MaterialIcons
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forget Password?</Text>
          </TouchableOpacity>

          {/* Call ForgetPassword component and pass modalVisible and setModalVisible */}
          <ForgetPassword visible={modalVisible} onClose={() => setModalVisible(false)} />
        </View>



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
    marginTop: height * 0.3,
    paddingBottom: height * 0.095,
  },

  title: { fontSize: width * 0.12, fontWeight: 'bold', },

  titleContainer: {
    alignItems: 'center',

  },

  text: {
    fontSize: width * 0.12,
    color: '#fff',
    fontWeight: 'bold',
  },

  inputContainer: {
    width: '80%',
    marginBottom: height * 0.18,
    paddingTop: height * 0.05,
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

  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
  },

  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  loginButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 410,
    width: 200,

  },

  showPasswordIcon: {
    marginLeft: width * 0.7,

  },

  passwordContainer: {
    position: 'relative',
  },

  forgotPasswordText: {
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  }


});
