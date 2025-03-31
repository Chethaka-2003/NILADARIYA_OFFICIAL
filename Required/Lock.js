import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Vibration, SafeAreaView, Dimensions, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from './GradientBackground';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const Lock = () => {
  const [passcode, setPasscode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleNumberPress = (number) => {
    if (passcode.length < 6) {
      setPasscode((prev) => prev + number);
      setErrorMessage('');
    } else {
      setErrorMessage('Passcode cannot be more than 6 digits');
      Vibration.vibrate();
    }
  };

  const handleDeletePress = () => {
    setPasscode((prev) => prev.slice(0, -1));
    setErrorMessage('');
  };

  const handleLogin = async () => {
    const correctPasscode = await AsyncStorage.getItem('userPin') || '123456';
    if (passcode === correctPasscode) {
      console.log('Passcode:', passcode);
      setPasscode('');
      setErrorMessage('');
      navigation.navigate('NavigationBar');
    } else {
      setErrorMessage('Incorrect passcode');
      Vibration.vibrate();
      setPasscode('');
    }
  };

  const renderPasscodeDots = () => {
    return Array.from({ length: 6 }).map((_, i) => (
      <View
        key={i}
        style={[ 
          styles.passcodeDot, 
          { backgroundColor: i < passcode.length ? '#195b8c' : 'transparent' } 
        ]}
      />
    ));
  };

  return (
    <SafeAreaView flex={1}>
      <ScrollView>
      <Background/>
      <View style={styles.container}>
      {/* <Background/> */}
        <Image source={require('../assets/LOGO.png')} style={styles.logo} />
        <Animated.View style={[styles.card]}>
          <Text style={styles.title}>Enter Passcode</Text>
          <View style={styles.passcodeContainer}>{renderPasscodeDots()}</View>
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          <View style={styles.numberPad}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'Del', 0].map((number, index) => (
              <TouchableOpacity
                key={index}
                style={styles.numberButton}
                onPress={() => (number === 'Del' ? handleDeletePress() : handleNumberPress(number.toString()))}
              >
                <Text style={styles.numberButtonText}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText1}>Unlock</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      </ScrollView>
      </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: width * 0.05, // Adjust padding based on screen width
  },
  logo: {
    width: width * 0.4, // Adjust logo size based on screen width
    height: width * 0.4,
    marginBottom: height * 0.02, // Adjust margin based on screen height
  },
  card: {
    padding: width * 0.06, // Adjust padding based on screen width
    borderRadius: 15,
    elevation: 6,
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.06, // Adjust font size based on screen width
    fontWeight: 'bold',
    color: 'black',
    marginBottom: height * 0.02, // Adjust margin based on screen height
  },
  passcodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: height * 0.02, // Adjust margin based on screen height
  },
  passcodeDot: {
    width: width * 0.04, // Adjust dot size based on screen width
    height: width * 0.04,
    borderRadius: (width * 0.04) / 2,
    borderWidth: 2,
    borderColor: 'black',
  },
  errorText: {
    color: 'red',
    marginTop: height * 0.01, // Adjust margin based on screen height
  },
  numberPad: {
    marginTop: height * 0.03, // Adjust margin based on screen height
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  numberButton: {
    width: width * 0.2, // Adjust button size based on screen width
    height: width * 0.2,
    margin: width * 0.02, // Adjust margin based on screen width
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: (width * 0.2) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberButtonText: {
    fontSize: width * 0.05, // Adjust font size based on screen width
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#195b8c',
    borderRadius: 50,
    paddingVertical: height * 0.02, // Adjust padding based on screen height
    marginTop: height * 0.03, // Adjust margin based on screen height
    width: width * 0.8, // Adjust width based on screen width
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    fontSize: width * 0.05, // Adjust font size based on screen width
    color: '#000',
    fontWeight: 'bold',
  },
  buttonText1: {
    fontSize: width * 0.05, // Adjust font size based on screen width
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Lock;
