import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Animated } from 'react-native';

const Lock = () => {
  const [username, setUsername] = useState('John Doe'); // Example username
  const [passcode, setPasscode] = useState('');
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
    setPasscode((prev) => (prev.length < 6 ? prev + number : prev));
  };

  const handleDeletePress = () => {
    setPasscode((prev) => prev.slice(0, -1));
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log('Passcode:', passcode);
    setPasscode('');
  };

  return (
    <ImageBackground
      source={require('./assets/ABF.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.username}>{username}</Text>
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Enter Passcode</Text>
          <TextInput
            style={styles.passcodeInput}
            value={passcode}
            editable={false}
            secureTextEntry
          />
          <View style={styles.numberPad}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
              <TouchableOpacity
                key={number}
                style={styles.numberButton}
                onPress={() => handleNumberPress(number.toString())}
              >
                <Text style={styles.numberButtonText}>{number}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress('0')}>
              <Text style={styles.numberButtonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numberButton} onPress={handleDeletePress}>
              <Text style={styles.numberButtonText}>Del</Text>
            </TouchableOpacity>
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
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
    padding: 25,
    borderRadius: 15,
    elevation: 6, // Android shadow for a more subtle effect
    shadowColor: '#000', // iOS shadow with soft effect
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2f2f2f',
    marginBottom: 20,
  },
  passcodeInput: {
    height: 50,
    borderColor: '#1e88e5',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    width: '100%',
    textAlign: 'center',
  },
  numberPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  numberButton: {
    width: 60,
    height: 60,
    margin: 10,
    backgroundColor: '#1e88e5',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#1e88e5',
    borderRadius: 30,
    paddingVertical: 15,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Lock;