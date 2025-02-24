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

  const [modalVisible, setModalVisible] = useState(false);
  const [requestTitle, setRequestTitle] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const [requestDate, setRequestDate] = useState('');
  const [requestTime, setRequestTime] = useState('');
  const [requestPersonBooking, setRequestPersonBooking] = useState('');
  const [requestPersonBooked, setRequestPersonBooked] = useState('');

  const handleCancelAppointment = (id) => {
    const updatedAppointments = appointments.filter((item) => item.id !== id);
    setAppointments(updatedAppointments);
  };

  const handleCreateRequest = () => {
    if (
      requestTitle &&
      requestDescription &&
      requestDate &&
      requestTime &&
      requestPersonBooking &&
      requestPersonBooked
    ) {
      const newAppointment = {
        id: Math.random().toString(), // Unique ID for the appointment
        title: requestTitle,
        description: requestDescription,
        date: requestDate,
        time: requestTime,
        personBooking: requestPersonBooking,
        personBooked: requestPersonBooked,
      };

      setAppointments((prevAppointments) => [...prevAppointments, newAppointment]); // Add appointment to appointments

      alert('Appointment Created: ' + requestTitle); // Optional alert
      setModalVisible(false); // Close the modal
      setRequestTitle(''); // Clear input fields
      setRequestDescription('');
      setRequestDate('');
      setRequestTime('');
      setRequestPersonBooking('');
      setRequestPersonBooked('');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require('./assets/ABF.png')} // Replace with your image URL or local image
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
                  onPress={() => handleCancelAppointment(item.id)}
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
          <FlatList
            data={requisites}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
                <Text style={styles.cardTime}>Date: {item.date}</Text>
                <Text style={styles.cardTime}>Time: {item.time}</Text>
                <Text style={styles.cardWho}>Booking by: {item.personBooking}</Text>
                <Text style={styles.cardWho}>Who: {item.personBooked}</Text>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => handleCancelRequest(item.id)}
                >
                  <Text style={styles.cancelText}>CANCEL</Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No requisites available.</Text>
              </View>
            }
          />
        )}

        {/* Request Button */}
        <TouchableOpacity style={styles.requestButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.requestButtonText}>Add Appointment</Text>
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
            <Text style={styles.modalTitle}>Create Appointment</Text>
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
            <TextInput
              style={styles.input}
              placeholder="Enter Request Date (e.g., Jan 29, 2025)"
              value={requestDate}
              onChangeText={setRequestDate}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Request Time (e.g., 11:10am - 11:30am)"
              value={requestTime}
              onChangeText={setRequestTime}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Person Booking"
              value={requestPersonBooking}
              onChangeText={setRequestPersonBooking}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Person Being Booked"
              value={requestPersonBooked}
              onChangeText={setRequestPersonBooked}
            />

            <TouchableOpacity style={styles.createButton} onPress={handleCreateRequest}>
              <Text style={styles.createButtonText}>Add</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    paddingTop: height * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: width * 0.05,
  },
  backButton: {
    position: 'absolute',
    left: width * 0.03,
    top: height * 0.03,
  },
  backButtonText: {
    fontSize: width * 0.045,
    color: '#333',
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: height * 0.02,
  },
  tab: {
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
  },
  activeTab: {
    backgroundColor: '#4caf50',
  },
  tabText: {
    fontSize: width * 0.045,
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
  },
  listContainer: {
    marginTop: height * 0.02,
    paddingHorizontal: width * 0.05,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: width * 0.05,
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#333',
  },
  cardTime: {
    fontSize: width * 0.04,
    color: '#666',
  },
  cardWho: {
    fontSize: width * 0.04,
    color: '#999',
  },
  cardDescription: {
    fontSize: width * 0.04,
    color: '#666',
    marginTop: height * 0.01,
  },
  cancelButton: {
    backgroundColor: '#ff3b30',
    borderRadius: 5,
    paddingVertical: height * 0.015,
    alignItems: 'center',
    marginTop: height * 0.01,
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
