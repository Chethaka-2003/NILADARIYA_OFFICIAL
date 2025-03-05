import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, } from 'react-native';

const { width, height } = Dimensions.get('window');

const AboutUs = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("./assets/Logo.png")} style={styles.image} />
      <Text style={styles.header}>Welcome to Niladariya!</Text>
      <Text style={styles.text}>
      <Text style={styles.boldText}>Our Vision:</Text>{"\n"}The vision of the "Niladariya" app is to empower citizens with quick, transparent, and efficient access to government services and consultations. By leveraging advanced technology, it aims to streamline communication between government officers and citizens, fostering a more responsive and accountable public sector.{"\n"}{"\n"}
      </Text>
      <Image source={require("./assets/colombo 2.jpg")} style={styles.image} />
      <Text style={styles.text}>
      <Text style={styles.boldText}>Our Mission:</Text> {"\n"}The mission of "Niladariya" is to provide an intuitive platform that connects individuals with the right government officers for expert advice and consultation, ensuring ease of access to services. It focuses on improving transparency, increasing efficiency in government procedures, and enhancing the user experience in navigating governmental processes.{"\n"}{"\n"}
      </Text>
      <Image source={require("./assets/UpdatedMenuOption/flag.png")} style={styles.image} />
      <Text style={styles.text}>
      <Text style={[styles.text, styles.boldText]}>Key Features:</Text>{"\n"}
      <Text style={styles.text}>• Officer Consultation Services: Users can directly interact with government officers for guidance on various services, policies, and regulations.</Text>{"\n"}{"\n"}
      <Text style={styles.text}>• Personalized Recommendations: Based on user queries, the app suggests the appropriate government departments or officers best suited to provide assistance.</Text>{"\n"}{"\n"}
      <Text style={styles.text}>• Document Management: Users can upload and manage important documents needed for government consultations or service applications.</Text>{"\n"}{"\n"}
      <Text style={styles.text}>• Real-time Updates: Notifications and updates regarding ongoing queries, consultations, and changes in government policies are sent to users.</Text>{"\n"}{"\n"}
      <Text style={styles.text}>• Appointment Scheduling: Users can book appointments with government officers, reducing waiting times and improving accessibility.</Text>{"\n"}{"\n"}
      <Text style={styles.text}>• Interactive Chatbot: An AI-powered chatbot assists users in answering basic questions and provides information on common government services and processes.</Text>{"\n"}{"\n"}
      <Text style={styles.text}>• Service Tracking: Users can track the status of their applications or consultations, ensuring they are informed of progress.</Text>{"\n"}{"\n"}
      <Text style={styles.text}>• Multilingual Support: The app is available in multiple languages, ensuring inclusivity for all citizens regardless of their language preferences.</Text>{"\n"}{"\n"}
      </Text>
      <Image source={require("./assets/gov.jpg")} style={styles.image} />
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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
    marginVertical: 10,
  },
  image: {
    width: 400,
    height: 200,
    marginVertical: 10,
  },
  boldText: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
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
