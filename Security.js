import React, { useState } from 'react';
import { Image, ImageBackground } from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Dimensions,
  Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

export default function ChangePassword() {
  const navigation = useNavigation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    setModalVisible(true);
  };

  const backgroundImage = require('./assets/Background.jpg'); 

  return (
    <ImageBackground source={backgroundImage} style={styles.background} >
      <SafeAreaView style={styles.background}>
        <View style={styles.container2}>
          {/* Close Button */}
          <TouchableOpacity onPress={() => navigation.navigate('SettingsPg')} style={styles.closeButton}>
            <FeatherIcon name="x-circle" size={30} color="black" />
          </TouchableOpacity>

          <Text style={styles.title}>Replace Password</Text>

          {/* Current Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              placeholderTextColor="#888"
              secureTextEntry={!showCurrentPassword}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)} style={styles.eyeIcon}>
              <MaterialIcons name={showCurrentPassword ? "visibility" : "visibility-off"} size={24} color="#888" />
            </TouchableOpacity>
          </View>

          {/* New Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="#888"
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.eyeIcon}>
              <MaterialIcons name={showNewPassword ? "visibility" : "visibility-off"} size={24} color="#888" />
            </TouchableOpacity>
          </View>

          {/* Confirm New Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              placeholderTextColor="#888"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
              <MaterialIcons name={showConfirmPassword ? "visibility" : "visibility-off"} size={24} color="#888" />
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleChangePassword}>
            <Text style={styles.submitText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        {/* Success Modal */}
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <MaterialIcons name="check-circle" size={60} color="#4CAF50" />
              <Text style={styles.modalText}>Password Changed Successfully!</Text>
              <TouchableOpacity 
                style={styles.okButton} 
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('SettingsPg');
                }}
              >
                <Text style={styles.okText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
  okButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  okText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
