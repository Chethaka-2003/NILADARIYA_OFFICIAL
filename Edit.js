import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [name, setName] = useState('Chethaka Fernando');
  const [contact, setContact] = useState('+94 70 7638012');
  const [email, setEmail] = useState('Chethaka2000@gmail.com');
  const [district, setDistrict] = useState('Colombo');

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Daniel Callego</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      {/* Profile Picture and Close Button */}
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.closeButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Form Section */}
      <View style={styles.form}>
        <Text style={styles.label}>Name In Full</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          style={styles.input}
          value={contact}
          onChangeText={setContact}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>District</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={district}
            onValueChange={(itemValue) => setDistrict(itemValue)}
          >
            <Picker.Item label="Colombo" value="Colombo" />
            <Picker.Item label="Gampaha" value="Gampaha" />
            <Picker.Item label="Kandy" value="Kandy" />
            {/* Add more districts as needed */}
          </Picker>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.navBar}>
        <Ionicons name="home" size={28} color="gray" />
        <Ionicons name="person" size={28} color="black" />
        <Ionicons name="settings" size={28} color="gray" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9e5e8',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2,
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});
