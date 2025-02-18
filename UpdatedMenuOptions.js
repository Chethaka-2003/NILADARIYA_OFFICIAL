import React, { useState } from "react";
import { 
  View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, 
  ImageBackground, Modal, Dimensions, Animated 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Draggable from 'react-native-draggable';
import Icon from 'react-native-vector-icons/Ionicons';

const districts = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 'Hambantota',
  'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale',
  'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 
  'Trincomalee', 'Vavuniya'
];

const { width, height } = Dimensions.get('window');

export default function MenuOptions({ navigation }) {
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [scale, setScale] = useState(new Animated.Value(1));
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [question, setQuestion] = useState(null);
  const [questionHistory, setQuestionHistory] = useState([]);

  const handleChatbotPress = () => setModalVisible(true);

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedLanguage(null);
    setQuestion(null);
  };

  const handleZoom = () => {
    Animated.spring(scale, {
      toValue: scale._value === 1 ? 1.5 : 1,
      useNativeDriver: true,
    }).start();
  };

  const handleLanguageSelect = (language) => {
    const nextQuestion = {
      English: "Please select the service you need.",
      Sinhala: "ඔබට අවශ්‍ය සේවාව තෝරාගන්න.",
      Tamil: "நீங்கள் தேவைப்படும் சேவையைத் தேர்ந்தெடுக்கவும்."
    };
    setSelectedLanguage(language);
    setQuestion(nextQuestion[language]);
    setQuestionHistory((prev) => [...prev, { language, question: nextQuestion[language] }]);
  };

  const handleBack = () => {
    setQuestionHistory((prev) => {
      const newHistory = [...prev];
      newHistory.pop();
      const previousQuestion = newHistory[newHistory.length - 1]?.question ?? null;
      setQuestion(previousQuestion);
      return newHistory;
    });
  };

  const currentQuestion = question || (questionHistory[questionHistory.length - 1]?.question ?? null);

  return (
    <ImageBackground source={require('./assets/background.png')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
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

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <ImageBackground source={require('./assets/flag.png')} style={styles.buttonBackground}>
              <Text style={styles.buttonText}> DIVISIONAL COUNCIL</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Municipal Council")}>
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

        <Draggable x={100} y={100}>
          <TouchableOpacity style={styles.Chatbot} onPress={handleChatbotPress}>
            <Image source={require('./assets/chatbotIcon.png')} style={styles.chatbotImage} />
          </TouchableOpacity>
        </Draggable>

        <Modal visible={isModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
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

              {currentQuestion === null ? (
                <View style={styles.Questions}>
                  <Text style={styles.QEnglish}>Choose the language you want.</Text>
                  <Text style={styles.QSinhala}>ඔබට අවශ්‍ය භාෂාව තෝරාගන්න.</Text>
                  <Text style={styles.QTamil}>நீங்கள் விரும்பும் மொழியைத் தேர்ந்தெடுக்கவும்.</Text>
                  <View style={styles.languageButtonsContainer}>
                    <TouchableOpacity style={styles.languageButton} onPress={() => handleLanguageSelect('English')}>
                      <Text style={styles.languageButtonText}>English</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.languageButton} onPress={() => handleLanguageSelect('Sinhala')}>
                      <Text style={styles.languageButtonText}>සිංහල</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.languageButton} onPress={() => handleLanguageSelect('Tamil')}>
                      <Text style={styles.languageButtonText}>தமிழ்</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.Questions}>
                  <Text style={styles.selectedQuestion}>{currentQuestion}</Text>
                </View>
              )}

              {questionHistory.length > 0 && (
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                  <Icon name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
              )}
            </Animated.View>
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  scrollViewContent: { flexGrow: 1, paddingBottom: 20 },
  logoAndTextContainer: { alignItems: 'center' },
  logo: { width: width * 0.5, height: height * 0.2, resizeMode: 'contain', marginTop: height * 0.03 },
  pickerContainer: { alignItems: 'center', marginTop: 10 },
  picker: { height: 50, width: width * 0.7, backgroundColor: '#fff', borderColor: '#000', borderWidth: 1, borderRadius: 5 },
  buttonsContainer: { flexDirection: 'column', marginBottom: 20 },
  button: { height: 190, margin: 10 },
  buttonBackground: { flex: 1, justifyContent: 'center', alignItems: 'center', width: 300, borderRadius: 10 },
  buttonText: { fontSize: 20, fontWeight: 'bold' },
  iconsContainer: { marginVertical: 20 },
  iconsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  icon: { width: 70, height: 55 },
  Chatbot: { resizeMode: 'contain', height: 50, width: 200 },
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: 'white', borderRadius: 10 },
  title: { fontSize: 23 },
});
