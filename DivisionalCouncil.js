import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Background from "./GradientBackground";

const { width, height } = Dimensions.get('window');

const DivisionalCouncil = ({ navigation }) => {
  // State to track which service is expanded
  const [expandedService, setExpandedService] = useState(null);
  // State to track if Civil Registration service buttons are visible
  const [showCivilRegistrationServices, setShowCivilRegistrationServices] = useState(false);

  // Service details data
  const serviceDetails = {
    "Civil Registration": {
      icon: "document-text-outline",
      description: "Birth, marriage, and death certificates",
      details: [
        "Birth certificate application and collection",
        "Marriage registration and certificates",
        "Death certificate registration",
        "Certificate amendments and corrections",
        "Search and verification of records"
      ],
      serviceButtons: [
        { name: "Apply for Birth Certificate", icon: "document-outline", screen: "BirthCertificate" },
        { name: "Register Marriage", icon: "heart-outline", screen: "MarriageRegistration" },
        { name: "Register Death", icon: "document-outline", screen: "DeathRegistration" },
        { name: "Request Certificate Amendment", icon: "create-outline", screen: "CertificateAmendment" },
        { name: "Search Records", icon: "search-outline", screen: "RecordSearch" }
      ]
    },
    "Permits & Licenses": {
      icon: "card-outline",
      description: "Business registration, construction permits",
      details: [
        "New business registration",
        "Business license renewals",
        "Construction and building permits",
        "Event permits for public gatherings",
        "Trade licenses and certifications"
      ]
    },
    "Land Administration": {
      icon: "business-outline",
      description: "Land registry services, property transfers",
      details: [
        "Property title registration",
        "Land ownership transfers",
        "Boundary dispute resolution",
        "Land surveys and mapping",
        "Property tax assessments"
      ]
    },
    "Social Services": {
      icon: "cash-outline",
      description: "Welfare benefits, pension payments",
      details: [
        "Pension disbursements",
        "Welfare program registration",
        "Financial assistance applications",
        "Support for vulnerable populations",
        "Community development programs"
      ]
    }
  };

  const toggleService = (serviceName) => {
    if (expandedService === serviceName) {
      setExpandedService(null); // Collapse if already expanded
      if (serviceName === "Civil Registration") {
        setShowCivilRegistrationServices(false); // Hide service buttons when collapsing
      }
    } else {
      setExpandedService(serviceName); // Expand the clicked service
      if (serviceName !== "Civil Registration") {
        setShowCivilRegistrationServices(false); // Hide service buttons when expanding different service
      }
    }
  };

  const handleRequestService = (serviceName) => {
    if (serviceName === "Civil Registration") {
      setShowCivilRegistrationServices(true); // Show service buttons for Civil Registration
    } else {
      alert(`Service request for ${serviceName} will be processed soon.`);
    }
  };

  const handleServiceButtonPress = (buttonData) => {
    if (navigation && buttonData.screen) {
      navigation.navigate(buttonData.screen);
    } else {
      alert(`You have selected: ${buttonData.name}`);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Background />
      <View style={styles.logo}>
        <Image source={require("./assets/Logo.png")} style={styles.logoImage} />
      </View>
      
      <View style={styles.councilHeader}>
        <Text style={styles.councilTitle}>Divisional Council Services</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.councilContainer}>
          <Text style={styles.sectionTitle}>Available Services</Text>
          
          {Object.keys(serviceDetails).map((serviceName) => (
            <TouchableOpacity 
              key={serviceName}
              style={[
                styles.serviceCard,
                expandedService === serviceName && styles.expandedServiceCard
              ]}
              onPress={() => toggleService(serviceName)}
              activeOpacity={0.8}
            >
              <Icon name={serviceDetails[serviceName].icon} size={30} color="#283747" />
              <Text style={styles.serviceCardTitle}>{serviceName}</Text>
              <Text style={styles.serviceCardDesc}>{serviceDetails[serviceName].description}</Text>
              
              {expandedService === serviceName && (
                <View style={styles.expandedContent}>
                  {serviceDetails[serviceName].details.map((detail, index) => (
                    <View key={index} style={styles.detailItem}>
                      <Icon name="checkmark-circle-outline" size={16} color="#2E86C1" />
                      <Text style={styles.detailText}>{detail}</Text>
                    </View>
                  ))}
                  
                  {serviceName === "Civil Registration" && showCivilRegistrationServices ? (
                    <View style={styles.serviceButtonsContainer}>
                      <Text style={styles.serviceButtonsTitle}>Select a Service:</Text>
                      {serviceDetails["Civil Registration"].serviceButtons.map((button, index) => (
                        <TouchableOpacity 
                          key={index}
                          style={styles.serviceButton}
                          onPress={() => handleServiceButtonPress(button)}
                        >
                          <Icon name={button.icon} size={22} color="#FFFFFF" />
                          <Text style={styles.serviceButtonText}>{button.name}</Text>
                        </TouchableOpacity>
                      ))}
                      <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => setShowCivilRegistrationServices(false)}
                      >
                        <Text style={styles.backButtonText}>Back</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity 
                      style={styles.requestButton}
                      onPress={() => handleRequestService(serviceName)}
                    >
                      <Text style={styles.requestButtonText}>Request Service</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </TouchableOpacity>
          ))}
          
          <Text style={styles.contactInfo}>
            Contact Information:{"\n"}
            Phone: 011-2345678{"\n"}
            Email: info@divisionalcouncil.gov.lk{"\n"}
            Hours: Monday-Friday, 8:30 AM - 4:30 PM
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  councilHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 9,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 12,
    justifyContent: 'center',
    width: width * 0.85,
    borderRadius: 15, 
    marginLeft: width * 0.075,
  },
  councilTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#283747',
    textAlign: 'center',
  },
  councilContainer: {
    padding: 15,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#283747',
    marginBottom: 20,
    textAlign: 'center',
  },
  serviceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    width: width * 0.85,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  expandedServiceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  serviceCardTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#283747',
    marginTop: 10,
    marginBottom: 5,
  },
  serviceCardDesc: {
    fontSize: width * 0.035,
    color: '#283747',
    textAlign: 'center',
  },
  expandedContent: {
    marginTop: 15,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingTop: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingLeft: 5,
  },
  detailText: {
    fontSize: width * 0.035,
    color: '#283747',
    marginLeft: 8,
    flex: 1,
  },
  requestButton: {
    backgroundColor: '#2E86C1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  requestButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  serviceButtonsContainer: {
    width: '100%',
    marginTop: 15,
    alignItems: 'center',
  },
  serviceButtonsTitle: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#283747',
    marginBottom: 10,
  },
  serviceButton: {
    backgroundColor: '#2E86C1',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.035,
    marginLeft: 10,
  },
  backButton: {
    backgroundColor: '#7F8C8D',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 5,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.035,
  },
  contactInfo: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 15,
    borderRadius: 10,
    fontSize: width * 0.035,
    lineHeight: 22,
    width: width * 0.85,
    textAlign: 'center',
  },
});

export default DivisionalCouncil;