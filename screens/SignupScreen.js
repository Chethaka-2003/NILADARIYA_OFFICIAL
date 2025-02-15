
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation} from '@react-navigation/native';



export default function SignupScreen() {
  const [name, setName] = useState('');
  const [nameVerify, setNameVerify] = useState(false);
  const [nameError, setNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [emailError, setEmailError] = useState('');

  const [mobile, setMobile] = useState('');
  const [mobileVerify, setMobileVerify] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);

  const navigation = useNavigation();

  function handleName(e){
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

  function handleEmail(e){
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(false);
    setEmailError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailRegex.test(emailVar)){
      setEmailVerify(true);
    }else {
      setEmailError('Invalid Email Address');
    }
  }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
    <ImageBackground source={require('../assets/login 2.jpg')} style={styles.backgroundImage}>

      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
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
                <Feather name="check-circle" color="green" size={20} style = {styles.icon} />
                ) : (
                <Feather name="x-circle" color="red" size={20} style = {styles.icon} />
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
                <Feather name="check-circle" color="green" size={20} style = {styles.icon} />
                ) : (
                <Feather name="x-circle" color="red" size={20} style = {styles.icon} />
                )}
            </View>
          </View>

          {email.length < 1 ? null : emailVerify ? null : (<Text style = {styles.errorText}>{emailError}</Text>)}

          <View style={styles.contBox}>
            <Text style={styles.label}>MOBILE NUMBER</Text>
            <View style={styles.action}>
              <TextInput 
                style={styles.input} 
                placeholder="Mobile number" 
                placeholderTextColor="black"
                keyboardType="phone-pad" // Allows phone number input
              />
            </View>
          </View>

          <View style={styles.contBox}>
            <View style={styles.passwordContainer}>
            <Text style={styles.label}>PASSWORD</Text>
              <View style={styles.action}>
                <TextInput 
                  style={styles.input} 
                  placeholder='Password'
                  placeholderTextColor="black" 
                  secureTextEntry={!passwordVerify} 
                  value={password} 
                  onChangeText={setPassword}
                />
                <TouchableOpacity 
                  onPress={() => setPasswordVerify(!passwordVerify)} 
                  style = {styles.icon}
                  >
                  <MaterialIcons 
                    name={passwordVerify ? 'visibility' : 'visibility-off'} 
                    size={24} 
                    color="black" 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.SignupButton} onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.SignupButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
    </ScrollView>
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

  contBox:{
    marginBottom:20
  },

  errorText: {
    color: 'red',
    marginTop: -15,
    marginBottom: 15,
  },

  action: {
    flexDirection: 'row',
    alignItems:'center',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#420475',
    backgroundColor: '#d3d3d3',
    borderRadius: 15,
    position:'relative',
  },
  
  icon:{
    position: 'absolute',
    right: 15,
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
});
