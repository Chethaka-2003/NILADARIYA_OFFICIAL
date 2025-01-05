
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
export default function SignupScreen() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
  return (
    <ImageBackground 
      source={require('../assets/login 2.jpg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Already Registered? Log In here</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
        <Text style={styles.label}>NAME</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Name" 
            placeholderTextColor="black"
          />
          <Text style={styles.label}>EMAIL</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            placeholderTextColor="black"
            keyboardType="email-address"
          />
          <Text style={styles.label}>MOBILE NUMBER</Text>
           <TextInput 
            style={styles.input} 
            placeholder="Mobile number" 
            placeholderTextColor="black"
            keyboardType="phone-pad" // Allows phone number input
          />
          <View style={styles.passwordContainer}>
          <Text style={styles.label}>PASSWORD</Text>
            <TextInput 
              style={styles.input} 
              placeholder="•••••••••••••" 
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
          <TouchableOpacity style={styles.SignupButton} onPress={() => alert('Sign up functionality')}>
        <Text style={styles.SignupButtonText}>Sign up</Text>
        </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputContainer: {
    width: '80%',
    marginTop: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#d3d3d3',
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  loginText: {
    marginTop: 170,
    marginBottom: 20,
    fontSize: 11,
    color: 'black',
    textDecorationLine: 'underline',
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
  showPasswordIcon: {
    marginLeft: 260,
    marginTop: -60,
  },
});
