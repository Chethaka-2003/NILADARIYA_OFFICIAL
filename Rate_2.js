import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import DONE from './assets/done.json';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import FeatherIcon from 'react-native-vector-icons/Feather';

const Rate_2 = ({ title, message, onClose, handleOkPress }) => {
  const [rating, setRating] = useState(0);

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
          <TouchableOpacity style={styles.button} onPress={handleOkPress}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BlurView intensity={190} style={StyleSheet.absoluteFill}>
        <View style={styles.container2}>
          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <FeatherIcon name="x-circle" size={35} color="white" />
          </TouchableOpacity>


          <Text style={styles.title}>Rate This App</Text>

          {/* Star Rating System */}
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

          {/* Optional Feedback Input */}
          <TextInput
            style={styles.feedbackInput}
            placeholder="Leave a comment (optional)"
            placeholderTextColor="#888"
            value={feedback}
            onChangeText={setFeedback}
            multiline
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
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
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20, // Change border radius here
    alignItems: 'center',
  },
  animation: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  container2: {
    borderWidth: 3,
    borderColor: "black",
    backgroundColor: 'white', // White box
    padding: 20,
    borderRadius: 10, // Rounded corners
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%', // Responsive width
    elevation: 5, // Shadow effect (for Android)
    shadowColor: '#000', // Shadow effect (for iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    position: 'absolute', // Absolute positioning
    top: '60%', // Center vertically
    left: '50%', // Center horizontally
    // transform: [{ translateX: -width * 0.4 }, { translateY: -height * 0.25 }], // Adjust for width and height
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  feedbackInput: {
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 60,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: -20,
    right: -20,
    backgroundColor: 'black',
    borderRadius: 100,

  },

  container: {
    alignItems: 'center',
    // marginTop: height * 0.05,
  },

  headerText: {
    // fontSize: width * 0.08,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },

  mainIcon: {
    fontSize: 60,
    color: 'black',
    // marginTop: height * 0.02,
  },

  // section: {
  //   paddingHorizontal: width * 0.1,
  //   paddingTop: height * 0.1,
  // },

  icon: {
    fontSize: 30,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    // fontSize: width * 0.05,
    // paddingLeft: width * 0.02,
    fontWeight: 'bold',
    color: '#0c0c0c',
  },

  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
export default Rate_2 ;