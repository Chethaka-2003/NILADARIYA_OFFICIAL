import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Switch, TouchableOpacity, SafeAreaView, Modal, TextInput, Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Background from './GradientBackground';
import { useNavigation } from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
//import e from "cors"; 

const { width, height } = Dimensions.get("window");

const Officer = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState (false);
  const [profile, setProfile] = useState ({
    name: "Savini Perera",
    email: "savini@gmail.com",
    position: "Officer",
    service: "Education",
    mobile: "1234-123-9874",
    telephone: "1234-123-9874",
    address:"",
    profilePicture: null,
  });

  const API_BASE_URL = "http://YOUR_NODE_SERVER_IP:3000/OFFICER_API";

  // Fetch profile details from the backend
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

  // // Handle profile updates
  // const handleProfileUpdate = (key, value) => {
  //   setProfile((prev) => ({
  //     ...prev,
  //     [key]: value, // Ensures the new text is appended properly
  //   }));
  // };

  // Pick an Image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const selectedImage = result.assets[0].uri;
      setProfile((prev) => ({
        ...prev,
        profilePicture: selectedImage,
      }));

      uploadProfilePicture(selectedImage); // Upload the selected image to the server
    }
  };

  // Upload the selected image to the server
  const uploadProfilePicture = async (imageUri) => {
    let formData = new FormData();
    formData.append("profilePicture", {
      uri: imageUri,
      name: "profile.jpg",
      type: "image/jpg",
    });

    try {
      await axios.post(`${API_BASE_URL}/profilePicture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Profile picture uploaded successfully!");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };
  
  return (

    <SafeAreaView style={{ flex: 1 }}>
        <Background />
      
      <View style={styles.container}>

        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={pickImage} style={styles.profilePicture}>
            <Image source={profile.profilePicture ? { uri: profile.profilePicture } : require("./assets/officer.png")} style={styles.profilePicture} />
            <View style={styles.editIcon}>
              <Ionicons name="camera-outline" size={20} color="white" />
            </View>
          </TouchableOpacity>

          <Text style={styles.userName}>{profile.name}</Text>
          <Text style={styles.email}>{profile.email}</Text>
        </View>  

        {/* Icon Button */}
        <View style={styles.iconContainer}>

          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="chat-outline" size={24} color="black"/>
            <Text style={styles.iconText}>Live Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="settings-outline" size={24} color="black"/>
            <Text style={styles.iconText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="chat-processing-outline" size={24} color="black" />
            <Text style={styles.iconText}>Chat With Officer</Text>
          </TouchableOpacity>

        </View>

        {/*Officer Details*/}
        <View style={styles.profileDetails}>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Position:</Text>
            <Text style={styles.detailValue}>{profile.position}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Service:</Text>
            <Text style={styles.detailValue}>{profile.service}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Mobile:</Text>
            <Text style={styles.detailValue}>{profile.mobile}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Telephone:</Text>
            <Text style={styles.detailValue}>{profile.telephone}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Address:</Text>
            <Text style={styles.detailValue}>{profile.address}</Text>
          </View>

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
              <TextInput style={styles.input} placeholder="Enter Mobile" value={profile.mobile} onChangeText={(text) => handleProfileUpdate("mobile", text)} />
              <TextInput style={styles.input} placeholder="Enter Telephone" value={profile.telephone} onChangeText={(text) => handleProfileUpdate("telephone", text)} />
              <TextInput style={styles.input} placeholder="Enter Address" value={profile.address} onChangeText={(text) => handleProfileUpdate("address", text)} />

              <TouchableOpacity style={styles.saveButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View> 
          </View>
        </Modal>
      </View>
    </SafeAreaView>  
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePictureContainer: {
    width: 100,
    height: 100,
    position: "relative",
  },  
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "white",
  },
  email: {
    fontSize: 16,
    color: "white",
    //marginTop: 5,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginVertical: 20,
  },
  iconButton: {
    alignItems: "center",
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,
    color: "black",
  },
  profileDetails: {
    width: "80%",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 5,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  detailLabel: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#233C67",
  },
  detailValue: {
    color: "gray",
    fontSize: 16,
  },
  editButton: {
    backgroundColor: "#1E90FF",
    padding: 12,
    borderRadius: 25,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  editButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: width * 0.8,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },  
});

export default Officer;
