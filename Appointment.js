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
//import DateTimePicker from '@react-native-community/datetimepicker';

const { width, height } = Dimensions.get('window');

export default function App({ navigation }) {
  const [activeTab, setActiveTab] = useState('Appointments');
  const [appointments, setAppointments] = useState([]);
  const [requisites, setRequisites] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  const [modalVisible, setModalVisible] = useState(false);
  const [requestTitle, setRequestTitle] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [personBooking, setPersonBooking] = useState('');
  const [personBooked, setPersonBooked] = useState('');

  const handleCreate = () => {
    if (requestTitle && requestDescription && personBooking && personBooked) {
      const newEntry = {
        id: Math.random().toString(),
        title: requestTitle,
        description: requestDescription,
        date: date.toDateString(),
        time: date.toLocaleTimeString(),
        personBooking,
        personBooked,
      };
      activeTab === 'Appointments'
        ? setAppointments((prev) => [...prev, newEntry])
        : setRequisites((prev) => [...prev, newEntry]);
      setModalVisible(false);
      setRequestTitle('');
      setRequestDescription('');
      setPersonBooking('');
      setPersonBooked('');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('./assets/ABF.png')} style={styles.backgroundImage}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Appointments' && styles.activeTab]}
            onPress={() => setActiveTab('Appointments')}
          >
            <Text style={styles.tabText}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Requisites' && styles.activeTab]}
            onPress={() => setActiveTab('Requisites')}
          >
            <Text style={styles.tabText}>Requisites</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={activeTab === 'Appointments' ? appointments : requisites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
              <Text style={styles.cardTime}>Date: {item.date}</Text>
              <Text style={styles.cardTime}>Time: {item.time}</Text>
              <Text style={styles.cardWho}>Booking by: {item.personBooking}</Text>
              <Text style={styles.cardWho}>Who: {item.personBooked}</Text>
            </View>
          )}
        />
        <TouchableOpacity style={styles.requestButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.requestButtonText}>{activeTab === 'Appointments' ? 'Make Appointment' : 'Request'}</Text>
        </TouchableOpacity>
      </ImageBackground>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{activeTab === 'Appointments' ? 'Make Appointment' : 'Create Request'}</Text>
            <View style={styles.textBox}>
              <TextInput style={styles.creativeInput} placeholder="Title" value={requestTitle} onChangeText={setRequestTitle} />
            </View>
            <View style={styles.textBox}>
              <TextInput style={styles.creativeInput} placeholder="Description" value={requestDescription} onChangeText={setRequestDescription} multiline />
            </View>
            <View style={styles.textBox}>
              <TextInput style={styles.creativeInput} placeholder="Booking By" value={personBooking} onChangeText={setPersonBooking} />
            </View>
            <View style={styles.textBox}>
              <TextInput style={styles.creativeInput} placeholder="Who" value={personBooked} onChangeText={setPersonBooked} />
            </View>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
              <Text style={styles.dateText}>Select Date: {date.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && <DateTimePicker value={date} mode="date" display="default" onChange={(e, selectedDate) => {setShowDatePicker(false); setDate(selectedDate || date);}} />}
            <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateButton}>
              <Text style={styles.dateText}>Select Time: {date.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            {showTimePicker && <DateTimePicker value={date} mode="time" display="default" onChange={(e, selectedTime) => {setShowTimePicker(false); setDate(selectedTime || date);}} />}
            <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
              <Text style={styles.createButtonText}>{activeTab === 'Appointments' ? 'Book Appointment' : 'Submit Request'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
  tabContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  tab: { padding: 15 },
  activeTab: { backgroundColor: '#4caf50' },
  tabText: { fontSize: 16 },
  requestButton: { position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: '#4caf50', padding: 15, borderRadius: 10 },
  requestButtonText: { color: '#fff', fontSize: 16 },
  textBox: { backgroundColor: '#e8f5e9', padding: 10, borderRadius: 8, marginBottom: 10 },
  creativeInput: { borderBottomWidth: 2, borderColor: '#4caf50', padding: 10, borderRadius: 8, backgroundColor: '#fff' },
});
