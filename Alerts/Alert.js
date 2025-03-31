import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import DONE from '../assets/Done1.json';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export const Alert = ({ visible, title, message, onClose, animationSource }) => {
  const navigation = useNavigation();

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <LottieView
            source={DONE}
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    width: width * 0.8, // Adjust width dynamically
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20, 
    alignItems: 'center',
  },
  animation: {
    width: width * 0.4, // Adjust animation size dynamically
    height: width * 0.4,
  },
  title: {
    fontSize: width * 0.05, // Adjust font size dynamically
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: width * 0.045, // Adjust font size dynamically
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: height * 0.015, // Adjust padding dynamically
    paddingHorizontal: width * 0.1,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.045, // Adjust font size dynamically
  },
});

export default Alert;