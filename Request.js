import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Animated, TextInput, TouchableOpacity, Modal } from 'react-native';

const RequisiteItem = ({ item = {} }) => {
  const [requestMessage, setRequestMessage] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0)); // Fade effect for card
  const [modalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRequest = () => {
    if (requestMessage.trim()) {
      console.log('Request submitted:', requestMessage);
      setRequestMessage('');
      setModalVisible(false);
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
            <Text style={styles.cardWho}>Requested by: {item.personBooking || 'Unknown'}</Text>
            <Text style={styles.cardWho}>Assigned to: {item.personBooked || 'Unassigned'}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.cardTime}>Date: {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}</Text>
            <Text style={styles.cardTime}>Time: {item.time || 'N/A'}</Text>
          </View>

          <TouchableOpacity style={styles.requestButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.requestButtonText}>Submit Request</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Submit Your Request</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Write your request here..."
              placeholderTextColor="#888"
              value={requestMessage}
              onChangeText={setRequestMessage}
              multiline
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleRequest}>
              <Text style={styles.modalButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 30,
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    width: '90%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e3a8a',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardDescription: {
    fontSize: 16,
    color: '#4b5563',
    marginVertical: 10,
    lineHeight: 22,
    fontWeight: '500',
  },
  cardWho: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2563eb',
  },
  cardTime: {
    fontSize: 14,
    color: '#6b7280',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  textInput: {
    height: 120,
    borderColor: '#1e40af',
    borderWidth: 2,
    borderRadius: 12,
    padding: 15,
    marginTop: 15,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#f9fafb',
    textAlignVertical: 'top',
  },
  requestButton: {
    backgroundColor: '#1e40af',
    borderRadius: 30,
    paddingVertical: 15,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  requestButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 25,
    borderRadius: 15,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1e3a8a',
  },
  modalButton: {
    backgroundColor: '#1e40af',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#d32f2f',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default RequisiteItem;
