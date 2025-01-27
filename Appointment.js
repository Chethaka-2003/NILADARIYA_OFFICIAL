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

  const handleCancel = (id) => {
    const updatedAppointments = appointments.filter((item) => item.id !== id);
    setAppointments(updatedAppointments);
  };

  const handleRequest = () => {
    // Handle the request action (e.g., open a form or navigate to another screen)
    alert('Request action triggered!');
  };

  return (
    
    <SafeAreaView style={styles.container}>
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
      <TouchableOpacity style={styles.requestButton} onPress={handleRequest}>
        <Text style={styles.requestButtonText}>+ Request</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f7f8fa',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: width * 0.05, // 5% of screen width
      paddingVertical: height * 0.02, // 2% of screen height
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderColor: '#e0e0e0',
    },
    userName: {
      fontSize: width * 0.05, // Dynamic font size based on screen width
      fontWeight: 'bold',
      color: '#333',
      marginTop: height * 0.05,
    },
    switch: {
      transform: [{ scale: width * 0.0035 }], // Dynamic switch scale
      marginTop: height * 0.05,
    },
    backButton: {
      position: 'absolute',
      left: width * 0.03, // Dynamic left margin
      top: height * 0.04,
    },
    backButtonText: {
      fontSize: width * 0.04,
      color: '#4caf50',
    },
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#fff',
      paddingVertical: height * 0.015, // Adjusted padding
      borderBottomWidth: 1,
      borderColor: '#e0e0e0',
    },
    tab: {
      paddingHorizontal: width * 0.05, // Adjusted width
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
      padding: width * 0.04, // Adjusted padding
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
  });
