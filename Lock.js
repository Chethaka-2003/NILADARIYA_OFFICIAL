import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Animated, Image, Vibration } from 'react-native';

const Lock = () => {
  const [username, setUsername] = useState('John Doe'); // Example username
  const [passcode, setPasscode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0)); // Fade effect for card

  // Fade in effect on component mount
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleNumberPress = (number) => {
    if (passcode.length < 6) {
      setPasscode((prev) => prev + number);
      setErrorMessage(''); // Clear error message if any
    } else {
      setErrorMessage('Passcode cannot be more than 6 digits');
      Vibration.vibrate(); // Vibrate on error
      setPasscode(''); // Clear passcode
    }
  };

  const handleDeletePress = () => {
    setPasscode((prev) => prev.slice(0, -1));
    setErrorMessage(''); // Clear error message if any
  };

  const handleLogin = () => {
    // Example passcode for demonstration
    const correctPasscode = '123456';
    if (passcode === correctPasscode) {
      console.log('Passcode:', passcode);
      setPasscode('');
      setErrorMessage(''); // Clear error message on successful login
    } else {
      setErrorMessage('Incorrect passcode');
      Vibration.vibrate(); // Vibrate on incorrect passcode
      setPasscode(''); // Clear passcode
    }
  };

  const renderPasscodeDots = () => {
    const dots = [];
    for (let i = 0; i < 6; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.passcodeDot,
            { backgroundColor: i < passcode.length ? '#FFD700' : 'transparent' },
          ]}
        />
      );
    }
    return dots;
  };

  return (
    <ImageBackground
      source={require('./assets/ABF.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image source={require('./assets/Logo.png')} style={styles.logo} />
        <Text style={styles.username}>{username}</Text>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
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
    width: 200,
    height: 100,
    marginBottom: 25,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
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
dklkfnnlsfnsd