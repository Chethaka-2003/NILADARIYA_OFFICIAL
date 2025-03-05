import React, { useState } from 'react';
import { ImageBackground, View, Text, TouchableOpacity, StyleSheet, TextInput, SafeAreaView, Dimensions, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CustomLottieAlert from './screens/Alert';
import successAnimation from './assets/done.json';

const { width, height } = Dimensions.get('window');

export default function ChangePassword() {
  const navigation = useNavigation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [lottieAlertVisible, setLottieAlertVisible] = useState(false);


  const [modalVisible, setModalVisible] = useState(false);

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    setAlertTitle('Success');
    setAlertMessage('Password changed successfully');
    setLottieAlertVisible(true);

  };


  return (
    <View style={styles.container1}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.row}>
        <View style={styles.box}>
          <FeatherIcon name="shield" style={styles.icon} />
        </View>
        <Text style={styles.rowLabel}>Security</Text>
        <View style={styles.rowSpacer} />
        <FeatherIcon color="black" name="chevron-right" size={30} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Close Button */}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
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
        </View>
        <CustomLottieAlert
          visible={lottieAlertVisible}
          title={alertTitle}
          message={alertMessage}
          onClose={() => setLottieAlertVisible(false)}
          animationSource={successAnimation} // Pass the Lottie animation source here
        />
      </Modal>
    </View>
  );
}



const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    elevation: 5,
  },
  icon: {
    fontSize: 30,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 55,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    marginBottom: 30,
    paddingHorizontal: 12,
  },

  rowLabel: {
    fontSize: width * 0.05,
    paddingLeft: width * 0.02,
    fontWeight: 'bold',
    color: '#0c0c0c',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
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
