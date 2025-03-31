import React, { useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput } from "react-native";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


import CustomLottieAlert from '../Alerts/CustomLottieAlert';
import successAnimation from '../assets/Done1.json';
import CustomAlert from '../Alerts/CustomAlert';
import AlertCustom from "../Alerts/AlertCustom";


const App = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [AlertCustomVisible, setAlertCustomVisible] = useState(false);
  



  const handleRating = (star) => { setRating(star); };

  const handleSubmit = async () => {
    // Ensure at least 1 star is selected
    if (rating < 1) {
      setAlertTitle('Error');
      setAlertMessage('Please select at least one star.');
      setAlertVisible(true);
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.136:4000/Feedback/submit', {
        rating: rating,
        feedbackText: feedback,
      });

      setAlertTitle('THANK YOU!!!');
      setAlertMessage('Feedback submitted successfully');
      setAlertCustomVisible(true);
      // setModalVisible(false);

      // Optionally, reset rating and feedback
      setRating(0);
      setFeedback('');

      // Optionally navigate to a different screen
      // navigation.navigate('FeedbackSubmitted');
    } catch (error) {
      console.error('Error submitting feedback:',  error.response ? error.response.data : error.message);
      setAlertTitle('Error');
      setAlertMessage('Failed to submit feedback. Please try again later.');
      setAlertVisible(true);
    }
  };

  return (
    <View style={styles.container1}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.row}>
        <View style={styles.box}>
          <FeatherIcon name="thumbs-up" style={styles.icon} />
        </View>
        <Text style={styles.rowLabel}>Rate Us</Text>
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

            <Text style={styles.title}>Rate Our App</Text>

            <View style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                  <MaterialIcons
                    name={star <= rating ? 'star' : 'star-border'}
                    size={40}
                    color={star <= rating ? '#FFD700' : '#bbb'}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* Creative Feedback Box */}
            <View style={styles.feedbackBox}>
              <TextInput
                style={styles.input}
                placeholder="Tell us what you think..."
                placeholderTextColor="#666"
                multiline
                value={feedback}
                onChangeText={(text) => setFeedback(text)}
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Submit Feedback</Text>
            </TouchableOpacity>
          </View>
        </View>
        <AlertCustom
          visible={AlertCustomVisible}
          title={alertTitle}
          message={alertMessage}
          onClose={() => setAlertCustomVisible(false)}
          animationSource={successAnimation} // Pass the Lottie animation source here
        />
        <CustomAlert
          visible={alertVisible}
          title={alertTitle}
          message={alertMessage}
          onClose={() => setAlertVisible(false)}
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
    borderRadius: 30,
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
  starContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  starWrapper: {
    borderWidth: 2, // Black Border
    borderColor: 'black',
    borderRadius: 10, // Slightly Rounded Edges
    padding: 5,
    marginHorizontal: 5,
  },
  starIcon: {
    marginHorizontal: 2,
  },
  feedbackBox: {
    width: '100%',
    borderWidth: 1, 
    borderColor: '#420475', 
    backgroundColor: '#d3d3d3', 
    borderRadius: 15, 
    padding: 15,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: height * 0.01,
    right: width * 0.02,
    borderRadius: 100,
  },

});

export default App;