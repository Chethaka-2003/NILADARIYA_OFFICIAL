import React, { useState } from 'react';
import { ImageBackground, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';

const RateUs = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  
  const handleSubmit = () => {
    navigation.navigate('FeedbackSubmitted');
  };

  return (
    <ImageBackground source={require('./assets/Background.jpg')} style={styles.background}>
      <View style={styles.container}>
         {/* Close Button */}
         <TouchableOpacity onPress={() => navigation.navigate('SettingsPg')} style={styles.closeButton}>
            <FeatherIcon name="x-circle" size={30} color="black" />
          </TouchableOpacity>
        <Text style={styles.title}>Rate Our App</Text>

        {/* Star Rating */}
        <View style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)} style={styles.starWrapper}>
              <Icon 
                name="star" 
                size={40} 
                color={star <= rating ? '#FFD700' : '#D3D3D3'} 
                style={styles.starIcon} 
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
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
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    height: 100,
    fontSize: 16,
    textAlignVertical: 'top',
    color: '#333',
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
    top: 10,
    right: 10,
  }, 
});

export default RateUs;
