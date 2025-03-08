import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Switch, TouchableOpacity, ImageBackground, Modal, TextInput, Dimensions } from "react-native";
import axios from "axios";
//import e from "cors"; 

const { width, height } = Dimensions.get("window");

const ProfilePage = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState (false);
  const [profile, setProfile] = useState ({
    name: " ",
    position: " ",
    contact: " ",
    service: " ",
  });

  const [appointmentCount, setAppointmentCount] = useState(0);
  const [chatCount, setChatCount] = useState(0);
  const [interOfficerChatCount, setInterOfficerChatCount] = useState(0);

  const toggleSwitch = () => setIsEnabled(!isEnabled);

  const API_BASE_URL = "mongodb+srv://niladariya:8QnJRJmLNSc3pJaA@niladariya.fnv7s.mongodb.net/?retryWrites=true&w=majority&appName=NILADARIYA"; // Replace with actual backend URL

  //Fetch profile details from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/profile`);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } 
    };

    fetchProfile();
  }, []);

  //fetch appointment count
  useEffect(() => {
    const fetchAppointmentCount = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/appointment/count`);
        setAppointmentCount(response.data.length);
      } catch (error) {
        console.error("Error fetching appointment count:", error);
      }
    };

    fetchAppointmentCount();
  }, []);

  // Handle profile updates
  const handleProfileUpdate = (key, value) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value, // Ensures the new text is appended properly
    }));
  };
  
  return (
    <ImageBackground 
      source={require('./assets/Selection.jpg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.userName}>{profile.name}</Text>
          <Switch        /*Remove when backend is done*/
            trackColor={{ false: "#767577", true: "green" }}
            thumbColor={isEnabled ? "white" : "white"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          <Image
            source={require("./assets/officer.png")}
            style={styles.profilePicture}
          />
        </View>

        {/*Officer Details*/}
        <View style={styles.profileDetails}>
          <Text style={styles.detailText}>Name: {profile.name}</Text>
          <Text style={styles.detailText}>Position: {profile.position}</Text>
          <Text style={styles.detailText}>Service: {profile.service}</Text>
          <Text style={styles.detailText}>Contact: {profile.contact}</Text>
        </View>

        {/*Edit Profile Button Under Profile Details*/}
        <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        {/*Modal for Editing Profile */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Profile</Text>

              <TextInput style={styles.input} placeholder="Enter Name" value={profile.name} onChangeText={(text) => handleProfileUpdate("name", text)} />
              <TextInput style={styles.input} placeholder="Enter Position" value={profile.position} onChangeText={(text) => handleProfileUpdate("position", text)} />
              <TextInput style={styles.input} placeholder="Enter Service" value={profile.service} onChangeText={(text) => handleProfileUpdate("service", text)} />
              <TextInput style={styles.input} placeholder="Enter Contact" value={profile.contact} onChangeText={(text) => handleProfileUpdate("contact", text)} />

              <TouchableOpacity style={styles.saveButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View> 
          </View>
        </Modal>

        {/*Chat Button, Appoinment Button*/}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.appointmentButton}>
            <Text style={styles.buttonText}>Appoinment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.liveChatButton}>
            <Text style={styles.buttonText}>Live Chat with Public</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.interOfficerChatButton}>
            <Text style={styles.buttonText}>Chat with Officers</Text>
          </TouchableOpacity>
        </View>  

        {/* Footer Section */}
        <View style={styles.footer}>
          <TouchableOpacity style={[styles.footerButton, styles.activeFooterButton]}>
            <Text style={styles.footerIcon}>👤</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerIcon}>🏠</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    left: 100,
  },
  profilePictureContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  profilePicture: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 5,
    borderColor: "#fff",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  editButton: {
    backgroundColor: "#A63A2C",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  footerButton: {
    padding: 10,
  },
  activeFooterButton: {
    backgroundColor: "#A63A2C",
    borderRadius: 20,
  },
  footerIcon: {
    fontSize: 24,
    color: "#000",
  },
  profileDetails: {
    backgroundColor: "white",
    borderRadius: 15,  
    padding: 15,       
    width: width * 0.7, 
    height: height * 0.2, 
  },  
  detailText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding:20,
    width: width * 0.8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#A63A2C",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonsContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  appointmentButtonContainer: {
    position: "relative",
    width: "80%",
    marginBottom: 10,
  },
  appointmentButton: {
    backgroundColor: "#A63A2C",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
    width: "80%",
  },
  liveChatButton: {
    backgroundColor: "#A63A2C",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
    width: "80%",
  },
  interOfficerChatButton: {
    backgroundColor: "#A63A2C",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
    width: "80%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 5,
    minWidth: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  
});

export default ProfilePage;
