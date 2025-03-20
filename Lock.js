import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, 
  Animated, Vibration, SafeAreaView 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../GradientBackground';

const Lock = () => {
  const [passcode, setPasscode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

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
          { backgroundColor: i < passcode.length ? '#FFD700' : 'transparent' } 
        ]}
      />
    ));
  };

  return (
    <SafeAreaView>
      <Background/>
      <View style={styles.container}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
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
            <Text style={styles.buttonText}>Unlock</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,  // Make sure the gradient fills the entire screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'transparent',
    padding: 25,
    borderRadius: 15,
    elevation: 6,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  passcodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  passcodeDot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  numberPad: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  numberButton: {
    width: 80,
    height: 80,
    margin: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberButtonText: {
    fontSize: 20,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FFD700',
    borderRadius: 50,
    paddingVertical: 20,
    marginTop: 20,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Lock;
