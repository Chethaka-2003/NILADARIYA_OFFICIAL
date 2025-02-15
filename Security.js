import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ChangePassword({ onClose }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    alert("Password changed successfully!");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ImageBackground source={require('./background.png')} style={styles.background} blurRadius={10}>
      <Background type="type2" />
      <View style = {styles.container}> 
          <Text style = {styles.headerText}>APP Settings</Text>
          <FeatherIcon name="settings" style = {styles.mainIcon} />
        </View>

        <ScrollView>
          <View style = {styles.section}>

            {/* Language changer */}
            <TouchableOpacity onPress={() => alert('You have selected the first option') } style = {styles.row}>
              <View style = {styles.box}>
                <FeatherIcon name="globe" style = {styles.icon}/>
              </View>
              <Text style = {styles.rowLabel}>Language</Text>
              <View style = {styles.rowSpacer}/>

              <FeatherIcon color = 'black' name='chevron-right' size={30}/>
            </TouchableOpacity>

            {/* Security button */}
            <TouchableOpacity onPress={() => alert('You have selected the first option')} style = {styles.row}>
              <View style = {styles.box}>
                <FeatherIcon name="shield" style = {styles.icon}/>
              </View>

              <Text style = {styles.rowLabel}>Security</Text>
              <View style = {styles.rowSpacer}/>

              <FeatherIcon color = 'black' name='chevron-right' size={30}/>              
            </TouchableOpacity>

            {/* Notification changer */}
            
            <View style = {styles.row}>
              <View style = {styles.box}>
                <FeatherIcon name="bell" style = {styles.icon}/>
              </View>
              

              <Text style = {styles.rowLabel}>Notifications</Text>
              <View style = {styles.rowSpacer}/>

              <Switch onValueChange={notifications => setForm ({...form, notifications})} value = {form.notifications}/>
            </View>
            

            {/* About App */}
            <TouchableOpacity onPress={() => alert('You have selected the first option')} style = {styles.row}>
              <View style = {styles.box}>
                <FeatherIcon name="info" style = {styles.icon}/>
              </View>
            
              <Text style = {styles.rowLabel}>About App</Text>
              <View style = {styles.rowSpacer}/>

              <FeatherIcon color = 'black' name='chevron-right' size={30}/>
            </TouchableOpacity>

            {/* RateUs */}
            <TouchableOpacity onPress={() => alert('You have selected the first option')} style = {styles.row}>
              <View style = {styles.box}>
                <FeatherIcon name="thumbs-up" style = {styles.icon}/>
              </View>
            
              <Text style = {styles.rowLabel}>Rate Us</Text>
              <View style = {styles.rowSpacer}/>

              <FeatherIcon color = 'black' name='chevron-right' size={30}/>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.container2}>
          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Replace Password</Text>

          {/* Current Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              placeholderTextColor="#888"
              secureTextEntry={!showCurrentPassword}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TouchableOpacity
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              style={styles.eyeIcon}
            >
              <MaterialIcons name={showCurrentPassword ? "visibility" : "visibility-off"} size={24} color="#888" />
            </TouchableOpacity>
          </View>

          {/* New Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="#888"
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity
              onPress={() => setShowNewPassword(!showNewPassword)}
              style={styles.eyeIcon}
            >
              <MaterialIcons name={showNewPassword ? "visibility" : "visibility-off"} size={24} color="#888" />
            </TouchableOpacity>
          </View>

          {/* Confirm New Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              placeholderTextColor="#888"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              <MaterialIcons name={showConfirmPassword ? "visibility" : "visibility-off"} size={24} color="#888" />
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleChangePassword}>
            <Text style={styles.submitText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'black',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container:{ 
    alignItems: 'center', 
    marginTop: height * 0.05, 
  },
  
  headerText:{
    fontSize: width * 0.08,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },

  mainIcon:{
    fontSize: 60,
    color: 'black',
    marginTop: height * 0.02,
  },

  section:{
    paddingHorizontal: width * 0.1,
    paddingTop: height * 0.1,
  },

  icon:{
    fontSize:30,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  row:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 55,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    marginBottom: 30,
    paddingHorizontal: 12,
  },

  rowLabel:{
    fontSize: width * 0.05,
    paddingLeft: width * 0.02,
    fontWeight: 'bold',
    color: '#0c0c0c',
  },

  rowSpacer:{
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
