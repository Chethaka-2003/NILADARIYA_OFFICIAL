import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Animated, TextInput, TouchableOpacity } from 'react-native';

const RequisiteItem = ({ item = {} }) => {
  const [requestMessage, setRequestMessage] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0)); // Fade effect for card

  // Fade in effect on component mount
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRequest = () => {
    if (requestMessage.trim()) {
      // Handle the request (e.g., send the message to backend)
      console.log('Request submitted:', requestMessage);
      setRequestMessage('');
    } else {
      console.log('No message provided!');
    }
  };

  return (
    <ImageBackground
      source={require('./assets/ABF.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
          <Text style={styles.cardTitle}>{item.title || 'No Title'}</Text>
          <Text style={styles.cardDescription}>{item.description || 'No Description'}</Text>

          <View style={styles.row}>
            <Text style={styles.cardWho}>
              Requested by: {item.personBooking || 'Unknown'}
            </Text>
            <Text style={styles.cardWho}>
              Assigned to: {item.personBooked || 'Unassigned'}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.cardTime}>
              Date: {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
            </Text>
            <Text style={styles.cardTime}>
              Time: {item.time || 'N/A'}
            </Text>
          </View>

          {/* Creative Text Input for Request */}
          <TextInput
            style={styles.textInput}
            placeholder="Write your request here..."
            placeholderTextColor="#888"
            value={requestMessage}
            onChangeText={setRequestMessage}
            multiline
          />

          {/* Request Button */}
          <TouchableOpacity style={styles.requestButton} onPress={handleRequest}>
            <Text style={styles.requestButtonText}>Submit Request</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
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
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2f2f2f',
  },
  cardDescription: {
    fontSize: 16,
    color: '#555',
    marginVertical: 10,
  },
  cardWho: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e88e5',
  },
  cardTime: {
    fontSize: 14,
    color: '#7d7d7d',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  // Creative Text Input Style
  textInput: {
    height: 100,
    borderColor: '#1e88e5',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  requestButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 30,
    paddingVertical: 15,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  requestButtonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RequisiteItem;
