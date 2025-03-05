import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput } from "react-native";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CustomLottieAlert from './screens/Alert';
import successAnimation from './assets/Done1.json';

const App = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [lottieAlertVisible, setLottieAlertVisible] = useState(false);

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
  };

  const handleOk = () => {
    setAlertTitle('Success');
    setAlertMessage('Language changed successfully');
    setLottieAlertVisible(true);

  };


  return (
    <View style={styles.container1}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.row}>
        <View style={styles.box}>
          <FeatherIcon name="thumbs-up" style={styles.icon} />
        </View>
        <Text style={styles.rowLabel}>Language</Text>
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

            <Text style={styles.title}>Select Language</Text>


            <TouchableOpacity style={styles.languageButton} onPress={() => changeLanguage('English')}>
              <MaterialIcons
                name={selectedLanguage === 'English' ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={24}
                color="black"
              />
              <Text style={styles.languageText}>English</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.languageButton} onPress={() => changeLanguage('Sinhala')}>
              <MaterialIcons
                name={selectedLanguage === 'Sinhala' ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={24}
                color="black"
              />
              <Text style={styles.languageText}>සිංහල</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.languageButton} onPress={() => changeLanguage('Tamil')}>
              <MaterialIcons
                name={selectedLanguage === 'Tamil' ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={24}
                color="black"
              />
              <Text style={styles.languageText}>தமிழ்</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.okButton}
              onPress={(handleOk)}
            >
              <Text style={styles.okText}>SHIFT</Text>
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
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },

  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
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
  icon: {
    fontSize: 30,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    borderRadius: 100,
  },
  languageButton: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  languageText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  okButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  okText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

});

export default App;