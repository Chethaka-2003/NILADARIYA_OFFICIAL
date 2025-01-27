import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Switch,
  Dimensions,
  ImageBackground,
  Modal,
  TextInput,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function App({ navigation }) {
  const [activeTab, setActiveTab] = useState('Appointments');
  const [appointments, setAppointments] = useState([
    {
      id: '1',
      title: 'Consultant Session (Chethaka Fernando)',
      time: 'Mon Jan 29, 2025 | 11:10am - 11:30am (GMT+5:30)',
      who: 'Banu Ahuraliya',
    },
    {
      id: '2',
      title: 'Consultant Session (Chethaka Fernando)',
      time: 'Mon Jan 29, 2025 | 11:10am - 11:30am (GMT+5:30)',
      who: 'Banu Ahuraliya',
    },
    {
      id: '3',
      title: 'Consultant Session (Chethaka Fernando)',
      time: 'Mon Jan 29, 2025 | 11:10am - 11:30am (GMT+5:30)',
      who: 'Banu Ahuraliya',
    },
  ]);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  const [modalVisible, setModalVisible] = useState(false);  // State for modal visibility
  const [requestTitle, setRequestTitle] = useState('');  // State to capture request title
  const [requestDescription, setRequestDescription] = useState('');  // State to capture request description

  const handleCancel = (id) => {
    const updatedAppointments = appointments.filter((item) => item.id !== id);
    setAppointments(updatedAppointments);
  };

  const handleCreateRequest = () => {
    if (requestTitle && requestDescription) {
      // Handle the creation of the request (e.g., saving it to state, sending to server)
      alert('Request Created: ' + requestTitle);
      setModalVisible(false); // Close the modal after creating the request
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={{ uri: 'https://your-image-url.com/background.jpg' }} // Replace with your image URL or local image
        style={styles.backgroundImage}
      >
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>{'< Back'}</Text>
          </TouchableOpacity>
          <Text style={styles.userName}>Chethaka Fernando</Text>
          <Switch
            trackColor={{ false: '#c4c4c4', true: '#4caf50' }}
            thumbColor={isEnabled ? '#fff' : '#fff'}
            ios_backgroundColor="#e0e0e0"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={styles.switch}
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Appointments' && styles.activeTab]}
            onPress={() => setActiveTab('Appointments')}
          >
            <Text style={[styles.tabText, activeTab === 'Appointments' && styles.activeTabText]}>
              Appointments
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Requisites' && styles.activeTab]}
            onPress={() => setActiveTab('Requisites')}
          >
            <Text style={[styles.tabText, activeTab === 'Requisites' && styles.activeTabText]}>
              Requisites
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {activeTab === 'Appointments' ? (
          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardTime}>{item.time}</Text>
                <Text style={styles.cardWho}>Who: {item.who}</Text>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => handleCancel(item.id)}
                >
                  <Text style={styles.cancelText}>CANCEL</Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No appointments available.</Text>
              </View>
            }
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No requisites available.</Text>
          </View>
        )}

        {/* Request Button */}
        <TouchableOpacity style={styles.requestButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.requestButtonText}>+ Request</Text>
        </TouchableOpacity>
      </ImageBackground>

      {/* Modal for Create Request */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Request</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Request Title"
              value={requestTitle}
              onChangeText={setRequestTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Request Description"
              value={requestDescription}
              onChangeText={setRequestDescription}
              multiline
            />
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateRequest}
            >
              <Text style={styles.createButtonText}>Create Request</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    opacity: 0.9,
  },
  userName: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
    marginTop: height * 0.05,
  },
  switch: {
    transform: [{ scale: width * 0.0035 }],
    marginTop: height * 0.05,
  },
  backButton: {
    position: 'absolute',
    left: width * 0.03,
    top: height * 0.03,
  },
  backButtonText: {
    fontSize: width * 0.04,
    color: '#4caf50',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: height * 0.015,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  tab: {
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.01,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeTab: {
    backgroundColor: '#333',
  },
  tabText: {
    fontSize: width * 0.04,
    color: '#555',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  listContainer: {
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.02,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: width * 0.04,
    marginVertical: height * 0.01,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.005,
  },
  cardTime: {
    fontSize: width * 0.04,
    color: '#666',
    marginBottom: height * 0.005,
  },
  cardWho: {
    fontSize: width * 0.04,
    color: '#999',
  },
  cancelButton: {
    marginTop: height * 0.01,
    backgroundColor: '#ff3b30',
    borderRadius: 5,
    paddingVertical: height * 0.015,
    alignItems: 'center',
  },
  cancelText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: width * 0.045,
    color: '#666',
    textAlign: 'center',
  },
  requestButton: {
    backgroundColor: '#4caf50',
    borderRadius: 30,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    alignSelf: 'center',
    position: 'absolute',
    bottom: height * 0.03,
  },
  requestButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.045,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: width * 0.05,
    width: width * 0.8,
  },
  modalTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  },
  input: {
    height: height * 0.07,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: width * 0.04,
    marginBottom: height * 0.02,
  },
  createButton: {
    backgroundColor: '#4caf50',
    borderRadius: 5,
    paddingVertical: height * 0.015,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  closeButton: {
    marginTop: height * 0.02,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: width * 0.04,
    color: '#888',
  },
});
