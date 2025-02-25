import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  ImageBackground 
} from 'react-native';

const { width, height } = Dimensions.get('window');

const AboutUs = () => {
  return (
    <ImageBackground 
      source={require('./assets/Background.jpg')} 
      style={styles.background} 
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("./assets/Logo.png")} style={styles.image} />
        <Text style={styles.header}>Welcome to Niladariya!</Text>

        {/* Vision Section */}
        <View style={styles.textContainer}>
          <Text style={styles.sectionHeader}>Our Vision</Text>
          <Text style={styles.text}>
            The vision of the "Niladariya" app is to empower citizens with quick, transparent, and efficient access to government services and consultations. 
            By leveraging advanced technology, it aims to streamline communication between government officers and citizens, fostering a more responsive and accountable public sector.
          </Text>
        </View>
        <Image source={require("./assets/colombo 2.jpg")} style={styles.image} />

        {/* Mission Section */}
        <View style={styles.textContainer}>
          <Text style={styles.sectionHeader}>Our Mission</Text>
          <Text style={styles.text}>
            The mission of "Niladariya" is to provide an intuitive platform that connects individuals with the right government officers for expert advice and consultation, 
            ensuring ease of access to services. It focuses on improving transparency, increasing efficiency in government procedures, and enhancing the user experience in navigating governmental processes.
          </Text>
        </View>
        <Image source={require("./assets/flag.png")} style={styles.image} />

        {/* Key Features Section */}
        <View style={styles.textContainer}>
          <Text style={styles.sectionHeader}>Key Features</Text>
          <Text style={styles.text}>
            • <Text style={styles.boldText}>Officer Consultation Services:</Text> Users can directly interact with government officers for guidance on various services, policies, and regulations.{"\n\n"}
            • <Text style={styles.boldText}>Personalized Recommendations:</Text> Based on user queries, the app suggests the appropriate government departments or officers best suited to provide assistance.{"\n\n"}
            • <Text style={styles.boldText}>Document Management:</Text> Users can upload and manage important documents needed for government consultations or service applications.{"\n\n"}
            • <Text style={styles.boldText}>Real-time Updates:</Text> Notifications and updates regarding ongoing queries, consultations, and changes in government policies are sent to users.{"\n\n"}
            • <Text style={styles.boldText}>Appointment Scheduling:</Text> Users can book appointments with government officers, reducing waiting times and improving accessibility.{"\n\n"}
            • <Text style={styles.boldText}>Interactive Chatbot:</Text> An AI-powered chatbot assists users in answering basic questions and provides information on common government services and processes.{"\n\n"}
            • <Text style={styles.boldText}>Service Tracking:</Text> Users can track the status of their applications or consultations, ensuring they are informed of progress.{"\n\n"}
            • <Text style={styles.boldText}>Multilingual Support:</Text> The app is available in multiple languages, ensuring inclusivity for all citizens regardless of their language preferences.
          </Text>
        </View>
        <Image source={require("./assets/gov.jpg")} style={styles.image} />

        {/* Footer Section */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Contact Us:</Text>
          <Text style={styles.footerText}>Email: support@niladariya.com</Text>
          <Text style={styles.footerText}>Phone: +94 123 456 789</Text>
          
          <View style={styles.socialMediaContainer}>
            <TouchableOpacity>
              <Image source={require('./assets/facebook.png')} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('./assets/whatsapp.png')} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('./assets/instagram.png')} style={styles.socialIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    textShadowColor: '#8f8f8e',       // Color of the shadow
    textShadowOffset: { width: 2, height: 2 },  // Position of the shadow
    textShadowRadius: 5, // Blur intensity of the shadow
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
  },
  boldText: {
    fontWeight: 'bold',
  },
  image: {
    width: 400,
    height: 200,
    marginVertical: 10,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 20,
    width: '100%',
  },
  footerText: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  socialMediaContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 15,
  },
});

export default AboutUs;
