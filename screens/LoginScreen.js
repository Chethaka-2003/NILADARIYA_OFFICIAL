import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.container}>
      <Image source={require('../assets/login 1.jpg')} style={styles.backgroundImage} />
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Username" 
          placeholderTextColor="black"
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
      <TouchableOpacity style={styles.loginButton} onPress={() => alert('Log In functionality')}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
    </View>
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
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  logo: {
    width: 200
    , // Adjust the width as needed
    height: 100, // Adjust the height as needed
    marginTop: 50, // Space from the top of the window
    position: 'absolute', // Ensures it's placed above the background
    top: 50, // Positions the logo near the top
    alignSelf: 'center', // Centers the logo horizontally
  },
  inputContainer: {
    width: '80%',
    marginTop: 420, // Adjust this based on your layout
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
