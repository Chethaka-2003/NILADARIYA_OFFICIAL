import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';

const UserProfile = () => {
  const initialUserState = {
    name: '',
    email: '',
    phone: '',
    password: '',
  };

  const [user, setUser] = useState(initialUserState);

  useEffect(() => {
    // Fetch user data from API or local storage
    const fetchUserData = async () => {
      const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
      };
      setUser(userData);
    };

    fetchUserData();
  }, []);

  const handleInputChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+()-\s]*$/;
    const passwordRegex = /^(?=.*[0-9]).{6,}$/; // At least 6 characters & 1 number

    if (!user.name.trim()) {
      Alert.alert('Validation Error', 'Name cannot be empty.');
      return false;
    }
    if (!emailRegex.test(user.email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return false;
    }
    if (!phoneRegex.test(user.phone)) {
      Alert.alert('Validation Error', 'Phone number contains invalid characters.');
      return false;
    }
    if (!passwordRegex.test(user.password)) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters long and include at least one number.');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (validateInputs()) {
      console.log('User data saved:', user);
      Alert.alert('Success', 'User profile updated successfully!');
      
      // ✅ Reset form to initial state
      setUser(initialUserState);
    }
  };

  return (
    <ImageBackground 
      source={require('./assets/ABF.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>User Profile</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#ddd"
          value={user.name}
          onChangeText={(value) => handleInputChange('name', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ddd"
          keyboardType="email-address"
          value={user.email}
          onChangeText={(value) => handleInputChange('email', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="#ddd"
          keyboardType="phone-pad"
          value={user.phone}
          onChangeText={(value) => handleInputChange('phone', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#ddd"
          secureTextEntry={true}
          value={user.password}
          onChangeText={(value) => handleInputChange('password', value)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfile;
