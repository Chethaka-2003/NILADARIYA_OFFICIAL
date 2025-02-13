import React, { useState } from "react";
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, Image,
  ScrollView, ImageBackground, Modal, Dimensions, Animated
} from 'react-native';
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
  const scale = useState(new Animated.Value(1))[0];

  const handleChatbotPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleZoom = () => {
    Animated.spring(scale, {
      toValue: scale.__getValue() === 1 ? 1.5 : 1,
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
          onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
        >
          {districts.map((district, index) => (
            <Picker.Item key={index} label={district} value={district} />
          ))}
        </Picker>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
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

        {/* Chatbot */}
        <Draggable x={100} y={100}>
          <TouchableOpacity style={styles.Chatbot} onPress={handleChatbotPress}>
            <Image source={require('./assets/chatbotIcon.png')} style={styles.chatbotImage} />
          </TouchableOpacity>
        </Draggable>

        <Modal visible={isModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <Animated.View style={[styles.modalContent, { transform: [{ scale }] }]}>
              <Image source={require('./assets/chatbotIcon.png')} style={styles.modalImage} />
              <Text style={styles.title}> HIII THERE!!!! </Text>
              <Text style={styles.subTitle}>Connect with me.. Save your time.. </Text>

              <View style={styles.Questions}>
                <Text style={styles.QEnglish}>Choose the language you want. </Text>
                <Text style={styles.QSinhala}>ඔබට අවශ්‍ය භාෂාව තෝරාගන්න.</Text>
                <Text style={styles.QTamil}>நீங்கள் விரும்பும் மொழியைத் தேர்ந்தெடுக்கவும்.</Text>
              </View>

              <View style={styles.languageButtonsContainer}>
                <TouchableOpacity style={styles.languageButton}><Text style={styles.languageButtonText}>English</Text></TouchableOpacity>
                <TouchableOpacity style={styles.languageButton}><Text style={styles.languageButtonText}>සිංහල</Text></TouchableOpacity>
                <TouchableOpacity style={styles.languageButton}><Text style={styles.languageButtonText}>தமிழ்</Text></TouchableOpacity>
              </View>

              <TouchableOpacity onPress={handleZoom} style={styles.zoomIcon}>
                <Icon name="expand" size={30} color="black" />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
}
