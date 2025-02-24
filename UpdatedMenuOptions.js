import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground, Modal, Dimensions, Animated, PanResponder } from 'react-native';
import { Picker } from '@react-native-picker/picker';
//import Draggable from 'react-native-draggable';
import NavigationBar from './NavigationBar';
import Icon from 'react-native-vector-icons/Ionicons';

const districts = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 'Hambantota',
  'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale',
  'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
];

const { width, height } = Dimensions.get('window');

export default function MenuOptions({navigation}) {
 
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [scale, setScale] = useState(new Animated.Value(1));
  const [selectedLanguage, setSelectedLanguage] = useState(null); // To track selected language
  const [question, setQuestion] = useState(null); // To track the current question
  const [questionHistory, setQuestionHistory] = useState([]);
  const [showTooltip, setShowTooltip] = useState(true);
  const tooltipOpacity = new Animated.Value(0);
 
  useEffect(() => {
    // Fade in the tooltip
    Animated.sequence([
      Animated.timing(tooltipOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // Wait for 5 seconds
      Animated.delay(5000),
      // Fade out the tooltip
      Animated.timing(tooltipOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => setShowTooltip(false));
  }, []);

 

  const handleChatbotPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedLanguage(null); // Reset language selection
    setQuestion(null); // Reset question
  };

  const handleZoom = () => {
    Animated.spring(scale, {
      toValue: scale._value === 1 ? 1.5 : 1,
      useNativeDriver: true,
    }).start();
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    // Set the next question based on the selected language
    const nextQuestion = {
      English: "Please select the service you need.",
      Sinhala: "ඔබට අවශ්‍ය සේවාව තෝරාගන්න.",
      Tamil: "நீங்கள் தேவைப்படும் சேவையைத் தேர்ந்தெடுக்கவும்."
    };
    const newQuestion = nextQuestion[language];
    setQuestion(newQuestion); // Set the current question
    setQuestionHistory((prev) => [...prev, { language, question: nextQuestion[language] }]);
  };

  const handleBack = () => {
    setQuestionHistory((prev) => {
      const newHistory = [...prev];
      newHistory.pop(); // Remove the last question
      const previousQuestion = newHistory[newHistory.length - 1]?.question ?? null;
      setQuestion(previousQuestion); // Update question
      return newHistory;
    });
  };

  const currentQuestion = question || (questionHistory[questionHistory.length - 1]?.question ?? null);

  return (
    <ImageBackground source={require('./assets/background.png')} style={styles.background}>
        
        <View style={styles.logo}>
          <Image source={require("./assets/Logo.png")} style={styles.logoImage} />
        </View>
        
        <View style={styles.pickerContainer}>
         <View style={styles.pickerWrapper}>  
          <Picker
            selectedValue={selectedDistrict}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
          >
            {districts.map((district, index) => (
              <Picker.Item key={index} label={district} value={district} />
            ))}
          </Picker>

          <View style={styles.chatbotContainer}>   
          <TouchableOpacity style={styles.pickerChatbot} onPress={handleChatbotPress}>
          <Image source={require('./assets/chatbotIcon.png')} style={styles.pickerChatbotImage} />
          </TouchableOpacity>

          {showTooltip && (
              <Animated.View 
                style={[
                  styles.tooltip,
                  {
                    opacity: tooltipOpacity,
                  }
                ]}
              >
                <View style={styles.tooltipTriangle} />
                <Text style={styles.tooltipText}>Hi! I'm here to help you!</Text>
              </Animated.View>
            )}

        </View>
        </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollView}>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} >
            <ImageBackground source={require('./assets/flag.png')} style={styles.buttonBackground} borderRadius={30}>
              <Text style={styles.buttonText}> DIVISIONAL COUNCIL</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Municipal Council")}>
            <ImageBackground source={require('./assets/MunicipalCoun.jpg')} style={styles.buttonBackground}borderRadius={30}>
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

        
        
        <Modal visible={isModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>

            <Animated.View style={[styles.modalContent, { transform: [{ scale }] }]}>
              <View style={styles.Icons}>
                <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                  <Icon name="close" size={15} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleZoom} style={styles.zoomIcon}>
                  <Icon name="expand-outline" size={15} color="black" />
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
                currentQuestion && (
                  <View style={styles.Questions}>
                    <Text style={styles.selectedQuestion}>{currentQuestion}</Text>
                    {currentQuestion === "Please select the service you need." && (
                      <View style={styles.servicesContainer}>
                        <TouchableOpacity style={styles.serviceButton}>
                          <Text style={styles.serviceButtonText}>Civil Registrations</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.serviceButton}>
                          <Text style={styles.serviceButtonText}>Issuance of Permits</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.serviceButton}>
                          <Text style={styles.serviceButtonText}>Issuing of Certicates</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.serviceButton}>
                          <Text style={styles.serviceButtonText}>Payment of Pensions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.serviceButton}>
                          <Text style={styles.serviceButtonText}>Land Administration</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.serviceButton}>
                          <Text style={styles.serviceButtonText}>Social Welfare and Benefits</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.serviceButton}>
                          <Text style={styles.serviceButtonText}>Development Program</Text>
                        </TouchableOpacity>
                        

                      </View>
                    )}
                  </View>
                )
              )}

              {questionHistory.length > 0 && (
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                  <Icon name="arrow-back" size={18} color="white" />
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
  background: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  logo: {
    alignItems: 'center',
  },
  logoImage: {
    width: width * 0.5,
    height: height * 0.2,
    resizeMode: 'contain',
    marginTop: height * 0.03,
    marginBottom: height * 0.01,
    alignItems: 'center',
  },
  picker: {
    height: 50,
    width: width * 0.6,
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 30,
    marginTop: -25,
    marginLeft: 45,
  },
  pickerContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.8,
  },
  pickerChatbot: {
    marginLeft: 28,
  },
  pickerChatbotImage: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: height * 0.01,
    marginTop: height * 0.01,
    borderRadius: 50,
  },
  button: {
    height: height * 0.25,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 50,
  },
  buttonBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.8,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: width * 0.05,
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
    width: width * 0.7,
    alignItems: 'center',
    marginLeft: 5,
    height: height * 0.25,
  },
  icon: {
    backgroundColor: 'gray',
    borderRadius: 50,
    padding: 0.1,
    alignItems: 'center',
    width: '50%',
    marginVertical: 10,
  },
  iconImage: {
    width: width * 0.2,
    height: height * 0.1,
    marginBottom: 1,
  },
  iconsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    width: width * 0.8,
    marginLeft: width * 0.1,
  },
  Chatbot: {
    resizeMode: 'contain',
    height: height * 0.1,
    width: width * 0.5,
  },
  chatbotImage: {
    height: height * 0.1,
    width: width * 0.5,
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
    height: height * 0.67,
    width: width * 0.68,
  },
  modalImage: {
    width: width * 0.2,
    height: height * 0.1,
    resizeMode: 'contain',
  },
 
  title: {
    fontSize: width * 0.06,
    textAlign: 'center',
    fontStyle: 'normal',
    color: 'orange',
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: width * 0.03,
    color: 'grey',
    fontStyle: 'italic',
    fontWeight: "bold",
  },
  Questions: {
    alignItems: 'center',
    marginTop: 50,
    fontSize: width * 0.05,
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
    width: width * 0.5,
  },
  languageButtonText: {
    color: 'white',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#FF4D4F', // Red close button
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    marginRight: 30,
  },
  zoomIcon: {
    backgroundColor: '#4CAF50', // Green expand button
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
  },
  Icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
  },
  serviceButtonText: {
    color: 'white',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    textAlign: 'center',
  }, 
  chatbotContainer: {
    position: 'relative',
    marginLeft: 2,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    width: width * 0.4,
    right: width * 0.05,
    top: -height * 0.06,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tooltipText: {
    color: 'black',
    fontSize: width * 0.035,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tooltipTriangle: {
    position: 'absolute',
    bottom: -10,
    right: 20,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    transform: [{ rotate: '180deg' }],
  },
});