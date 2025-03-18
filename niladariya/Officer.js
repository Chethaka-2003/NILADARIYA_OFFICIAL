import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Switch, TouchableOpacity, SafeAreaView, Modal, TextInput, Dimensions } from "react-native";
import axios from "axios";
import Background from './GradientBackground';
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

    <SafeAreaView style={{ flex: 1 }}>
        <Background />
      
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

              {/* <TextInput style={styles.input} placeholder="Enter Name" value={profile.name} onChangeText={(text) => handleProfileUpdate("name", text)} /> */}
              <TextInput style={styles.input} placeholder="Enter Position" value={profile.position} onChangeText={(text) => handleProfileUpdate("position", text)} />
              <TextInput style={styles.input} placeholder="Enter Service" value={profile.service} onChangeText={(text) => handleProfileUpdate("service", text)} />
              {/* <TextInput style={styles.input} placeholder="Enter Contact" value={profile.contact} onChangeText={(text) => handleProfileUpdate("contact", text)} /> */}

              <TouchableOpacity style={styles.saveButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View> 
          </View>
        </Modal>

        {/*Chat Button, Appoinment Button*/}
        <View style={styles.buttonContainer}>

          <TouchableOpacity style={styles.appointmentButton} onPress={() => alert("You have " + appointmentCount + " appointments today") <console.log("You have " + appointmentCount + " appointments today")}>
            <Text style={styles.buttonText}>📅 Appointment</Text>
            {appointmentCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>{appointmentCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.interOfficerChatButton}onPress={() => console.log("Officer Chat clicked!")}>
            <Text style={styles.buttonText}>Chat with Officers</Text>
          </TouchableOpacity>
        </View> 
      </View>
    </SafeAreaView>  
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
    textAlign: "center",
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
  editButton: {
    backgroundColor: "#195b8c",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  activeFooterButton: {
    backgroundColor: "#A63A2C",
    borderRadius: 20,
  },
  profileDetails: {
    backgroundColor: "white",
    borderRadius: 15,  
    padding: 15,       
    width: width * 0.7, 
    height: height * 0.15, 
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
    backgroundColor: "#195b8c",
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#195b8c",
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 25,
    width: "250%",
    elevation: 5,
    position: "relative",
    marginTop: 20,
  },
  liveChatButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#195b8c",
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 25,
    width: "250%",
    elevation: 5, 
    marginBottom: 15,
    position: "absolute",
    zIndex: 1000,
  },
  interOfficerChatButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#195b8c",
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 25,
    width: "250%",
    elevation: 5, 
    marginTop: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  chatText: { 
    fontSize: 24, 
    color: "white" 
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 6,
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
