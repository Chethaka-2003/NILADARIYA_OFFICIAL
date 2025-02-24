import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Switch, TouchableOpacity, ImageBackground, Modal, TextInput, Dimensions } from "react-native";
import axios from "axios";

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

  const toggleSwitch = () => setIsEnabled(!isEnabled);

  //Fetch profile details from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("mongodb+srv://niladariya:<db_password>@niladariya.fnv7s.mongodb.net/?retryWrites=true&w=majority&appName=NILADARIYA");
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } 
    };

    fetchProfile();
  }, []);

  // Handle profile updates
  const handleProfileUpdate = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
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
              <TextInput style={styles.input} placeholder="Enter Service" value={profile.service} onChangeText={(text) => handleProfileUpdate("contact", text)} />
              <TextInput style={styles.input} placeholder="Enter Contact" value={profile.contact} onChangeText={(text) => handleProfileUpdate("service", text)} />

              <TouchableOpacity style={styles.saveButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View> 
          </View>
        </Modal>

        {/* Permission Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Permission</Text>
          <TouchableOpacity style={styles.option}>
            <View style={styles.optionContent}>
              <Image
                source={require("./assets/officer.png")}
                style={styles.icon}
              />
              
              <Text style={styles.optionText}>Activity</Text>
            </View>
            <Text style={styles.arrowIcon}>{">"}</Text>
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
  section: {
    width: "100%",
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  option: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginVertical: 12,
    justifyContent: "space-between",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 27,
    height: 27,
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
  arrowIcon: {
    fontSize: 16,
    color: "#000",
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
    borderRadius: 20,
    padding: 20,
    width : width * 0.8,
    height : height * 0.3,
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
    padding: 20,
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
});

export default ProfilePage;
