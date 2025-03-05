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

// Multilingual services data
const services = {
  English: [
    "Civil Registrations",
    "Issuance of Permits",
    "Issuing of Certicates",
    "Payment of Pensions",
    "Land Administration",
    "Social Welfare and Benefits",
    "Development Program"
  ],
  Sinhala: [
    "සිවිල් ලියාපදිංචි කිරීම්",
    "බලපත්‍ර නිකුත් කිරීම",
    "සහතිකපත් නිකුත් කිරීම",
    "විශ්‍රාම වැටුප් ගෙවීම",
    "ඉඩම් පරිපාලනය",
    "සමාජ සුභසාධන හා ප්‍රතිලාභ",
    "සංවර්ධන වැඩසටහන"
  ],
  Tamil: [
    "சிவில் பதிவுகள்",
    "அனுமதிப்பத்திரங்கள் வழங்குதல்",
    "சான்றிதழ்கள் வழங்குதல்",
    "ஓய்வூதியம் செலுத்துதல்",
    "நில நிர்வாகம்",
    "சமூக நலன் மற்றும் நன்மைகள்",
    "அபிவிருத்தி திட்டம்"
  ]
};

// Civil registration services in multiple languages
const civilRegistrationServices = {
  English: [
    "Details of father, grandfather and informant in a birth certificate",
    "Copies of Birth Certificates",
    "Name change statement by the bearer of the name",
    "Name change application by mother, father or guardian",
    "Copies of death certificates",
    "Copies of marriage certificates",
    "Delayed birth registration",
    "Section 32 of the Muslim Marriage and Divorce Registration Act"
  ],
  Sinhala: [
    "උප්පැන්න සහතිකයක පියා, සීයා සහ දැනුම්දෙන්නාගේ විස්තර",
    "උප්පැන්න සහතිකවල පිටපත්",
    "නම දරන්නා විසින් නම වෙනස් කිරීමේ ප්‍රකාශය",
    "මව, පියා හෝ භාරකරු විසින් නම වෙනස් කිරීමේ අයදුම්පත",
    "මරණ සහතිකවල පිටපත්",
    "විවාහ සහතිකවල පිටපත්",
    "ප්‍රමාද වූ උපත් ලියාපදිංචිය",
    "මුස්ලිම් විවාහ හා දික්කසාද ලියාපදිංචි කිරීමේ පනතේ 32 වන වගන්තිය"
  ],
  Tamil: [
    "பிறப்புச் சான்றிதழில் தந்தை, பாட்டனார் மற்றும் தகவல் அளிப்பவரின் விவரங்கள்",
    "பிறப்புச் சான்றிதழ்களின் நகல்கள்",
    "பெயர் தாங்கியால் பெயர் மாற்ற அறிக்கை",
    "தாய், தந்தை அல்லது பாதுகாவலரால் பெயர் மாற்ற விண்ணப்பம்",
    "இறப்புச் சான்றிதழ்களின் நகல்கள்",
    "திருமணச் சான்றிதழ்களின் நகல்கள்",
    "தாமதமான பிறப்புப் பதிவு",
    "முஸ்லிம் திருமணம் மற்றும் விவாகரத்து பதிவுச் சட்டத்தின் 32வது பிரிவு"
  ]
};

//Permit issuance services in multiple languages
const permitServices = {
  English: [
    "Registration of a Business name (individual/partnership)",
    "Change of Business name registration certificate",
    "Cancellation of business registration certificate",
    "Permit for felling trees",
    "Permit for timber transport (new/extended)",
    "Issuing soil transport permits",
    "Permits for the transportation of animals",
    "Presidential Fund",
    "Liquor sale license(New/Renewal)",
    "Licenses for Mortgage centers (New/Renewal)",
    "Changing the names of electricity inspection and electricity bills",
    "Disaster loans and real esrare loans",
    "Agrahara insurance",
    "Land leasing and transfer of lands, issuance of government land deeds"
    
  ],
  Sinhala: [
    "ව්‍යාපාර නාමයක් ලියාපදිංචි කිරීම (පුද්ගලික/හවුල්)",
    "ව්‍යාපාර නාම ලියාපදිංචි සහතිකය වෙනස් කිරීම",
    "ව්‍යාපාර ලියාපදිංචි සහතිකය අවලංගු කිරීම",
    "ගස් කැපීම සඳහා අවසර පත්‍රය",
    "දැව ප්‍රවාහන අවසර පත්‍රය (නව/දීර්ඝ කරන ලද)",
    "පස් ප්‍රවාහන අවසර පත්‍ර නිකුත් කිරීම",
    "සතුන් ප්‍රවාහනය සඳහා අවසර පත්‍ර",
    "ජනාධිපති අරමුදල",
    "මද්‍යසාර විකුණුම් බලපත්‍ර (නව/නවීකරණ)",
    "බැංකු මධ්‍යස්ථාන බලපත්‍ර (නව/නවීකරණ)",
    "විදුලි පරීක්ෂණ සහ විදුලි බිල් නම් වෙනස් කිරීම",
    "ව්‍යසන ණය සහ අසල්වැසි ණය",
    "අගහාර ක්‍රමය",
    "බදු ඉඩම් සහ ඉඩම් මාරු කිරීම, රාජ්‍ය ඉඩම් සificහික නිකුත් කිරීම"
  ],
  Tamil: [
    "வணிகப் பெயரைப் பதிவு செய்தல் (தனிநபர்/கூட்டு)",
    "வணிகப் பெயர் பதிவுச் சான்றிதழை மாற்றுதல்",
    "வணிகப் பதிவுச் சான்றிதழை ரத்து செய்தல்",
    "மரங்களை வெட்டுவதற்கான அனுமதி",
    "மரக்கட்டை போக்குவரத்து அனுமதி (புதிய/நீட்டிக்கப்பட்ட)",
    "மண் போக்குவரத்து அனுமதிகளை வழங்குதல்",
    "விலங்குகளின் போக்குவரத்துக்கு அனுமதி",
    "சனாதிபதி நிதி",
    "மது விற்பனை உரிமம் (புதிய/மீள்புதுப்பிப்பு)",
    "சொத்து மத்திய நிலைய உரிமங்கள் (புதிய/மீள்புதுப்பிப்பு)",
    "மின்சார பரிசோதனை மற்றும் மின் கட்டண பெயர்கள் மாற்றம்",
    "பேரிடர் கடன்கள் மற்றும் வீட்டுச் சொத்துக் கடன்கள்",
    "அகாரா காப்பீடு",
    "நிலம் வாடகைக்கு வழங்குதல் மற்றும் நிலம் மாற்றம், அரசாங்க நில சான்றிதழ் வழங்குதல்"

  ]
};

// certificates services in multiple languages
const certificateServices = {
  English: [
    "Vehicle Revenue License Online System",
    "Birth / Marriage / Death / Registration",
    "Income Certificate"
  ],
  Sinhala: [
    "වාහන භාණ්ඩාගාර බලපත්‍ර මාර්ගගත පද්ධතිය",
    "උප්පැදි / විවාහ / මරණ / ලියාපදිංචිය",
    "ආදායම් සහතිකය"
  ],
  Tamil: [
    "வாகன வருமான உரிமம் ஆன்லைன் அமைப்பு",
    "பிறப்பு / திருமணம் / இறப்பு / பதிவு",
    "வருமான சான்றிதழ்"
  ]
};

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
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCertificateService, setSelectedCertificateService] = useState(null);

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
    setSelectedService(null);
  };
  
  const handleServiceSelect = (serviceIndex) => {
    if (!selectedLanguage) return;
   
    // For civil registrations (index 0), show sub-services
    if (serviceIndex === 0) {
      const serviceQuestions = {
        English: "Please select the specific civil registration service you need:",
        Sinhala: "ඔබට අවශ්‍ය විශේෂිත සිවිල් ලියාපදිංචි සේවාව තෝරාගන්න:",
        Tamil: "நீங்கள் தேவைப்படும் குறிப்பிட்ட சிவில் பதிவு சேவையைத் தேர்ந்தெடுக்கவும்:"
      };
      setQuestion(serviceQuestions[selectedLanguage]);
      setQuestionHistory((prev) => [...prev, { 
        language: selectedLanguage, 
        question: serviceQuestions[selectedLanguage],
        serviceType: "civil"
      }]);
      setSelectedService("civil");
    } // NEW: For permits issuance (index 1), show sub-services
    else if (serviceIndex === 1) {
      const serviceQuestions = {
        English: "Please select the specific permit you need:",
        Sinhala: "ඔබට අවශ්‍ය විශේෂිත බලපත්‍රය තෝරාගන්න:",
        Tamil: "நீங்கள் தேவைப்படும் குறிப்பிட்ட அனுமதியைத் தேர்ந்தெடுக்கவும்:"
      };
      setQuestion(serviceQuestions[selectedLanguage]);
      setQuestionHistory((prev) => [...prev, { 
        language: selectedLanguage, 
        question: serviceQuestions[selectedLanguage],
        serviceType: "permit"
      }]);
      setSelectedService("permit");
    }
    // For certificates (index 2), show sub-services
    else if (serviceIndex === 2) {
      const serviceQuestions = {
        English: "Please select the specific certificate service you need:",
        Sinhala: "ඔබට අවශ්‍ය විශේෂිත සහතික සේවාව තෝරාගන්න:",
        Tamil: "நீங்கள் தேவைப்படும் குறிப்பிட்ட சான்றிதழ் சேவையைத் தேர்ந்தெடுக்கவும்:"
      };
      setQuestion(serviceQuestions[selectedLanguage]);
      setQuestionHistory((prev) => [...prev, { 
        language: selectedLanguage, 
        question: serviceQuestions[selectedLanguage],
        serviceType: "certificates"
      }]);
      setSelectedService("certificates");
    }

    else {
      // For other services, we could expand this in the future
      setSelectedService(services[selectedLanguage][serviceIndex]);
    }
  };

  
  const handleBack = () => {
    if (questionHistory.length > 0) { 
    setQuestionHistory((prev) => {
      const newHistory = [...prev];
      newHistory.pop(); // Remove the last question
      const previousQuestion = newHistory[newHistory.length - 1]?.question ?? null;
      setQuestion(previousQuestion); // Update question
    
    // Update selected service based on history
    if (newHistory.length > 0) {
      const lastItem = newHistory[newHistory.length - 1];
      setSelectedService(lastItem.serviceType || null);
    } else {
      setSelectedService(null);
    }  

      return newHistory;
    });
  }
  };

  const currentQuestion = question || (questionHistory[questionHistory.length - 1]?.question ?? null);

  // Get the current language services based on the selected language
  const getCurrentServices = () => {
    if (!selectedLanguage) return services.English;
    return services[selectedLanguage];
  };

  // Get civil registration services based on selected language
  const getCivilRegistrationServices = () => {
    if (!selectedLanguage) return civilRegistrationServices.English;
    return civilRegistrationServices[selectedLanguage];
  };
  
  // Get permit services based on selected language
  const getPermitServices = () => {
    if (!selectedLanguage) return permitServices.English;
    return permitServices[selectedLanguage];
  };

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

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Municipal Council")}>
            <ImageBackground source={require('./assets/CEB-1.jpg')} style={styles.buttonBackground}borderRadius={30}>
              <Text style={styles.buttonText}>CEYLON ELECTRICITY BOARD</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Municipal Council")}>
            <ImageBackground source={require('./assets/Water.png')} style={styles.buttonBackground}borderRadius={30}>
              <Text style={styles.buttonText}>NATIONAL WATER SUPPLY & DRAINAGE BOARD</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Municipal Council")}>
            <ImageBackground source={require('./assets/law_court.jpeg')} style={styles.buttonBackground}borderRadius={30}>
              <Text style={styles.buttonText}>LAW COURT</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Municipal Council")}>
            <ImageBackground source={require('./assets/policeImg.jpg')} style={styles.buttonBackground}borderRadius={30}>
              <Text style={styles.buttonText}>SRI LANKA POLICE</Text>
            </ImageBackground>
          </TouchableOpacity>
              

        </View>
  
        <Modal visible={isModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>

            <Animated.View style={[styles.modalContent, { transform: [{ scale }] }]}>
              <View style={styles.Icons}>
                <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                  <Icon name="close" size={12} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleZoom} style={styles.zoomIcon}>
                  <Icon name="expand-outline" size={12} color="black" />
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
                 <ScrollView style={styles.scrollContainer}> 
                  <View style={styles.Questions}>
                    <Text style={styles.selectedQuestion}>{currentQuestion}</Text>
                    
                    {/* Display main services if no specific service is selected */}
                    {!selectedService && 
                    (currentQuestion === "Please select the service you need." || 
                      currentQuestion === "ඔබට අවශ්‍ය සේවාව තෝරාගන්න." || 
                      currentQuestion === "நீங்கள் தேவைப்படும் சேவையைத் தேர்ந்தெடுக்கவும்.") && (
                      <View style={styles.servicesContainer}>
                        {getCurrentServices().map((service, index) => (
                            <TouchableOpacity 
                              key={index} 
                              style={styles.serviceButton}
                              onPress={() => handleServiceSelect(index)}
                            >
                              <Text style={styles.serviceButtonText}>{service}</Text>
                            </TouchableOpacity>
                          ))}
                      </View>
                    )}

                    {/* Display civil registration services based on the selected language  */}
                    {selectedService === "civil" && (
                        <View style={styles.servicesContainer}>
                          {getCivilRegistrationServices().map((service, index) => (
                            <TouchableOpacity 
                              key={index} 
                              style={styles.serviceButton}
                            >
                              <Text style={styles.serviceButtonText}>{service}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}

                    {/* NEW: Display permit services based on the selected language */}
                    {selectedService === "permit" && (
                        <View style={styles.servicesContainer}>
                          {getPermitServices().map((service, index) => (
                            <TouchableOpacity 
                              key={index} 
                              style={styles.serviceButton}
                            >
                              <Text style={styles.serviceButtonText}>{service}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                    )}  


                  </View>
                 </ScrollView> 
                )
              )}
              

              {questionHistory.length > 0 && (
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                  <Icon name="arrow-back" size={12} color="white" />
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
    color: '#283747',
    fontWeight: 'bold',
    textAlign: 'center',
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
    width: width * 0.15,
    height: height * 0.1,
    resizeMode: 'contain',
    marginTop: 1,
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
    marginTop: 22,
    marginBottom: 4,
  },
  QEnglish: {
    fontSize: 11,
    marginRight: 19,
  },
  QSinhala: {
    marginTop: 4,
    fontSize: 11,
  },
  QTamil: {
    marginTop: 4,
    fontSize: 11,
  },   
  selectedQuestion: {
    fontSize: 11, 
    marginTop: 4,  
  }, 
  languageButtonsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 10,
    alignItems: 'center', // Add this
  width: '100%', // Add this
  },
  languageButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 60,
    marginHorizontal: 100,
    width:'80%',
    marginTop: 7,
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
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    marginRight: 30,
  },
  zoomIcon: {
    backgroundColor: '#4CAF50', // Green expand button
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
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
    paddingHorizontal: 10,
    borderRadius: 50,
    marginTop: 2,
  },
  serviceButtonText: {
    color: 'white',
    fontSize: 9.5,
    fontWeight: 'bold',
    textAlign: 'center',
  }, 
  serviceButton: {
    backgroundColor: 'black',
    borderRadius: 5,
     paddingVertical: 9,

    width: width * 0.5,
    marginTop: 4,
    
    
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