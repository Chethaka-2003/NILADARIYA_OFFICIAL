import React, { useState, useCallback, useEffect } from 'react';
import { 
  View, Text, TextInput, Button, ScrollView, Alert, StyleSheet, Image, TouchableOpacity, useColorScheme, Switch, Dimensions 
} from 'react-native';
//import * as ImagePicker from 'react-native-image-picker';
import Animated, { FadeInUp } from 'react-native-reanimated';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import firestore from '@react-native-firebase/firestore';

const { width } = Dimensions.get('window');

const THEMES = {
  light: { background: '#F5F5F5', card: '#FFF', text: '#333', input: '#FFF', border: '#CCC' },
  dark: { background: '#121212', card: '#1E1E1E', text: '#FFF', input: '#333', border: '#444' },
  blue: { background: '#1E3A8A', card: '#3B82F6', text: '#FFF', input: '#93C5FD', border: '#60A5FA' }
};

const UserProfile = () => {
  const deviceTheme = useColorScheme();
  const [theme, setTheme] = useState(THEMES.light);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    preferences: { notifications: false, darkMode: false },
    profileImage: null,
  });

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme) setTheme(THEMES[storedTheme]);

      const userDoc = await firestore().collection('users').doc('user123').get();
      if (userDoc.exists) {
        setUserInfo(userDoc.data());
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const handleInputChange = useCallback((name, value) => {
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleUpdateProfile = async () => {
    try {
      await firestore().collection('users').doc('user123').set(userInfo);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  const handleImagePick = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo', includeBase64: false },
      (response) => {
        if (!response.didCancel && response.assets?.length > 0 && response.assets[0]?.uri) {
          setUserInfo((prev) => ({ ...prev, profileImage: response.assets[0].uri }));
        }
      }
    );
  };

  const togglePreference = (key) => {
    setUserInfo((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: !prev.preferences[key] }
    }));
  };

  const changeTheme = async (selectedTheme) => {
    setTheme(THEMES[selectedTheme]);
    await AsyncStorage.setItem('theme', selectedTheme);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.View style={[styles.card, { backgroundColor: theme.card }]} entering={FadeInUp}>
        <Text style={[styles.title, { color: theme.text }]}>User Profile</Text>

        {/* Profile Picture */}
        <TouchableOpacity onPress={handleImagePick} style={styles.imagePicker}>
          {userInfo.profileImage ? (
            <Image 
              source={{ uri: userInfo.profileImage }} 
              style={styles.profileImage} 
            />
          ) : (
            <Text style={styles.imageText}>Upload Profile Picture</Text>
          )}
        </TouchableOpacity>

        <TextInput
          style={[styles.input, { backgroundColor: theme.input, borderColor: theme.border, color: theme.text }]}
          placeholder="Name"
          placeholderTextColor="#999"
          value={userInfo.name}
          onChangeText={(value) => handleInputChange('name', value)}
        />
        <TextInput
          style={[styles.input, { backgroundColor: theme.input, borderColor: theme.border, color: theme.text }]}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#999"
          value={userInfo.email}
          onChangeText={(value) => handleInputChange('email', value)}
        />
        <TextInput
          style={[styles.input, { backgroundColor: theme.input, borderColor: theme.border, color: theme.text }]}
          placeholder="Phone"
          keyboardType="phone-pad"
          placeholderTextColor="#999"
          value={userInfo.phone}
          onChangeText={(value) => handleInputChange('phone', value)}
        />
        <Button title="Update Profile" onPress={handleUpdateProfile} color="#4CAF50" />
      </Animated.View>

      <Animated.View style={[styles.card, { backgroundColor: theme.card }]} entering={FadeInUp.delay(200)}>
        <Text style={[styles.title, { color: theme.text }]}>Preferences</Text>
        <View style={styles.row}>
          <Text style={{ color: theme.text }}>Enable Notifications</Text>
          <Switch value={userInfo.preferences.notifications} onValueChange={() => togglePreference('notifications')} />
        </View>
        <View style={styles.row}>
          <Text style={{ color: theme.text }}>Dark Mode</Text>
          <Switch value={userInfo.preferences.darkMode} onValueChange={() => togglePreference('darkMode')} />
        </View>
      </Animated.View>

      <Animated.View style={[styles.card, { backgroundColor: theme.card }]} entering={FadeInUp.delay(400)}>
        <Text style={[styles.title, { color: theme.text }]}>Change Theme</Text>
        <View style={styles.row}>
          <Button title="Light" onPress={() => changeTheme('light')} />
          <Button title="Dark" onPress={() => changeTheme('dark')} />
          <Button title="Blue" onPress={() => changeTheme('blue')} />
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { borderRadius: 12, padding: 16, marginBottom: 16, elevation: 5 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 12, width: width * 0.9 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
  imagePicker: { alignItems: 'center', marginBottom: 16 },
  profileImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: '#4CAF50' },
  imageText: { marginTop: 8, fontSize: 14, color: '#4CAF50' },
});

export default UserProfile;
