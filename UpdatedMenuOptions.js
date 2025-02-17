import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground, Modal, Dimensions, Animated, PanResponder } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Draggable from 'react-native-draggable';
import NavigationBar from './NavigationBar';
import Icon from 'react-native-vector-icons/Ionicons';


const districts = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 'Hambantota',
  'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale',
  'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
];

const { width, height } = Dimensions.get('window');

export default function MenuOptions() {
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [scale, setScale] = useState(new Animated.Value(1));

  const handleChatbotPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleZoom = () => {
    Animated.spring(scale, {
      toValue: scale._value === 1 ? 1.5 : 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ImageBackground source={require('./assets/background.png')} style={styles.background}>
        
        <View style={styles.logoAndTextContainer}>
          <Image source={require("./assets/Logo.png")} style={styles.logo} />
        </View>
        
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedDistrict}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setSelectedDistrict(itemValue)}
          >
            {districts.map((district, index) => (
              <Picker.Item key={index} label={district} value={district} />
            ))}
          </Picker>
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Page2")}>
            <ImageBackground source={require('./assets/flag.png')} style={styles.buttonBackground}>
              <Text style={styles.buttonText}> DIVISIONAL COUNCIL</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <ImageBackground source={require('./assets/MunicipalCoun.jpg')} style={styles.buttonBackground}>
              <Text style={styles.buttonText}> MUNICIPAL COUNCIL</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <View style={styles.iconsContainer}>
          <View style={styles.iconsGrid}>
            <TouchableOpacity style={styles.icon}>
              <Image source={require('./assets/water_board.png')} style={styles.iconImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <Image source={require('./assets/electricity.png')} style={styles.iconImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <Image source={require('./assets/police.jpg')} style={styles.iconImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <Image source={require('./assets/court.png')} style={styles.iconImage} />
            </TouchableOpacity>
          </View>
        </View>

        //Chatbot
        <Draggable x={100} y={100}>
          <TouchableOpacity style={styles.Chatbot} onPress={handleChatbotPress}>
            <Image source={require('./assets/chatbotIcon.png')} style={styles.chatbotImage} />
          </TouchableOpacity>
        </Draggable>
        
        <Modal visible={isModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>

            /*Icons Container*/
          <Animated.View style={[styles.modalContent, { transform: [{ scale }] }]}>
          <View style={styles.Icons}>
               <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Icon name="close" size={20} color="black" />
               </TouchableOpacity>
               <TouchableOpacity onPress={handleZoom} style={styles.zoomIcon}>
                  <Icon name="expand-outline" size={20} color="black" />
               </TouchableOpacity>
              </View>  
              <Image source={require('./assets/chatbotIcon.png')} style={styles.modalImage} />
              <View style={styles.textContainer}>
                <Text style={styles.title}> HIII THERE!!!! </Text>
                <Text style={styles.subTitle}>Connect with me.. Save your time.. </Text>
              </View>
              <View style={styles.Questions}>
                <Text style={styles.QEnglish}>Choose the language you want. </Text>
                <Text style={styles.QSinhala}>ඔබට අවශ්‍ය භාෂාව තෝරාගන්න.</Text>
                <Text style={styles.QTamil}>நீங்கள் விரும்பும் மொழியைத் தேர்ந்தெடுக்கவும்.</Text>
              </View>
              <View style={styles.languageButtonsContainer}>
                <TouchableOpacity style={styles.languageButton}>
                  <Text style={styles.languageButtonText}>English</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.languageButton}>
                  <Text style={styles.languageButtonText}>සිංහල</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.languageButton}>
                  <Text style={styles.languageButtonText}>தமிழ்</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  logoAndTextContainer: {
    alignItems: 'center',
  },
  logo: {
    width: width * 0.5,
    height: height * 0.2,
    resizeMode: 'contain',
    marginTop: height * 0.03,
    marginBottom:10,
  },
  picker: {
    height: 50,
    width: width * 0.7,
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  pickerContainer: {
    alignItems: 'center',
    marginTop: 2,
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: height * 0.01,
    marginTop: height * 0.01,
    borderRadius: 50,
  },
  button: {
    height: 190,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 2,
    width: 250,
    alignItems: 'center',
    marginLeft: 5,
  },
  icon: {
    backgroundColor: 'gray',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    width: '50%',
    marginVertical: 10,
  },
  iconImage: {
    width: 70,
    height: 55,
    marginBottom: 1,
  },
  iconsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    width: 290,
    marginLeft: 65,
  },
  Chatbot: {
    resizeMode: 'contain',
    height: 50,
    width: 200,
  },
  chatbotImage: {
    height: 60,
    width: 200,
    resizeMode: 'contain',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    height: 500,
    width: 280,
  },
  modalImage: {
    width: 60,
    height: 50,
    resizeMode: 'contain',
  },
  draggableChatbot: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  draggableChatbotImage: {
    height: 60,
    width: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 23,
    textAlign: 'center',
    fontStyle: 'normal',
    color: 'orange',
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 14,
    color: 'grey',
    fontStyle: 'italic',
    fontWeight: "bold",
  },
  Questions: {
    alignItems: 'center',
    marginTop: 50,
    fontSize: 19,
    fontWeight: "bold",
  },
  languageButtonsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20,
  },
  languageButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 60,
    marginHorizontal: 100,
    width: 200,
  },
  languageButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
   closeButton: {
    backgroundColor: '#FF4D4F', // Red close button
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    marginRight: 10,
  },
  zoomIcon: {
    backgroundColor: '#4CAF50', // Green expand button
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  Icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});