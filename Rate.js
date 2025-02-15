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

export default function RateApp({ onClose }) { // Accept onClose for closing
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
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
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  container2: {
    backgroundColor: 'white', // White box
    padding: 20,
    borderRadius: 10, // Rounded corners
    alignItems: 'center',
    width: '80%', // Responsive width
    elevation: 5, // Shadow effect (for Android)
    shadowColor: '#000', // Shadow effect (for iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
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
    top: 10,
    right: 10,
    backgroundColor: 'black', // Black background
    width: 30,
    height: 30,
    borderRadius: 15, // Circular button
    justifyContent: 'center', // Center the text inside the circle
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white', // White text
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