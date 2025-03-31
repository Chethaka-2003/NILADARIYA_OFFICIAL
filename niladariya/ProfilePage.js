import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Switch, TouchableOpacity, SafeAreaView, Modal, TextInput, Dimensions, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage'

import Background from '../Required/GradientBackground';
import SettingsPg from "../Required/SettingsPg";
import AlertCustom from "../Alerts/AlertCustom";


const { width, height } = Dimensions.get("window");

export default function OfficerPage() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    profilePicture: null,


  });

  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [AlertCustomVisible, setAlertCustomVisible] = useState(false);

  const [errors, setErrors] = useState({});

  const API_BASE_URL = "http://192.168.1.136:4000/auth";

  // Fetch profile details from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      const token = await AsyncStorage.getItem('jwtToken');
      console.log('Token from AsyncStorage:', token);
      if (!token) {
        Alert.alert('Authentication Error', 'You are not logged in.');
        return;
      }


      axios.get('http://192.168.1.136:4000/auth/getprofile', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(res => {
          if (res.data.status === "OK") {
            const profile = res.data.profile;
            setProfile(profile);
          } else {
            console.log("Unexpected response:", res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    fetchProfile();
  }, []);

  // Request camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Camera permission is required to take photos.");
      }
    })();
  }, []);

  const validateInput = () => {
    let newErrors = {};
    if (!profile.name.trim()) newErrors.name = "Name is Required";
    if (!profile.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) newErrors.email = "Valid Email is Required";
    if (!profile.mobile.trim() || !/^\d{10}$/.test(profile.mobile)) newErrors.mobile = "Valid 10 Digit Mobile is Required";

    console.log("New Errors:", newErrors); // Debugging: check new errors

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle profile updates

  const handleProfileUpdate = (key, value) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value, // Ensures the new text is appended properly
    }));
  };

  const handleSave = async () => {
    setAlertTitle('Success');
    setAlertMessage('Recorded Your Data Successfully');
    setAlertVisible(true);
  };

  // Select or Capture an profile picture
  const pickOrCaptureImage = async () => {
    Alert.alert(
      "Upload a Profile Picture",
      "Choose an option to upload a profile picture",
      [
        {
          text: "Take a Photo",
          onPress: takeImage,
        },
        {
          text: "Pick from Gallery",
          onPress: pickImage,
        },
        {
          text: "Remove Image",
          onPress: removeImage,
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  // Pick an image from the gallery
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.assets && result.assets.length > 0) {
      setProfile((prev) => ({
        ...prev,
        profilePicture: result.assets[0].uri,
      }));
      uploadProfilePicture(result.assets[0].uri);
    }
  };

  //Capture an image using the camera
  const takeImage = async () => {
    //Request camera permission
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    //Launch camera
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Camera result:", result); // Debugging

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfile((prev) => ({
        ...prev,
        profilePicture: result.assets[0].uri,
      }));
      uploadProfilePicture(result.assets[0].uri);
    }
  };

  const removeImage = async () => {
    setProfile((prev) => ({ ...prev, profilePicture: null }));
    try {
      // Update state to remove profile picture
      setProfile((prev) => ({
        ...prev,
        profilePicture: null,
      }));

      // Send request to remove image from the server
      await axios.delete('http://192.168.1.136:4000/auth/profilePicture');
      Alert.alert("Profile picture removed successfully!");
    } catch (error) {
      console.error("Error removing profile picture:", error);
      Alert.alert("Error removing profile picture! Please try again.");
    }
  };

  // Upload the selected image to the server
  const uploadProfilePicture = async (imageUri) => {
    let formData = new FormData();
    formData.append("profilePicture", {
      uri: imageUri,
      name: "profile.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await axios.post(`${API_BASE_URL}/profilePicture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Alert.alert("Profile picture uploaded successfully!");
      console.log("Upload response:", response.data);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      Alert.alert("Error uploading profile picture!");
    }
  };


  return (

    <SafeAreaView style={{ flex: 1 }}>
      <Background />

      <View style={styles.container}>

        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={pickOrCaptureImage} style={styles.profilePicture}>
            <Image source={profile.profilePicture ? { uri: profile.profilePicture } : require("../assets/officer.png")} style={[styles.profilePicture]} />
            <View style={styles.editIcon}>
              <Ionicons name="camera-outline" size={20} color="white" />
            </View>
          </TouchableOpacity>

          <Text style={styles.userName}>{profile.name}</Text>
          <Text style={styles.email}>{profile.email}</Text>
        </View>

        {/*Officer Details*/}
        <View style={styles.profileDetails}>



          {["Name", "Email", "Mobile"].map((field) => (
            <View style={styles.detailRow} key={field}>
              <Text style={styles.detailLabel}>{field}:</Text>
              <Text style={styles.detailValue}>{String(profile[field.toLowerCase()] || "")}</Text>
            </View>
          ))}
        </View>

        {/*Edit Profile Button Under Profile Details*/}
        <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        {/*Modal for Editing Profile */}
        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Profile</Text>

              <TextInput
                style={[styles.input, errors.position && styles.inputError]}
                placeholder="Enter Name"
                value={profile.name}
                onChangeText={(text) => handleProfileUpdate("name", text)}
              />
              {errors.position && <Text style={styles.errorText}>{errors.position}</Text>}

              <TextInput
                style={[styles.input, errors.mobile && styles.inputError]}
                placeholder="Enter Mobile"
                value={profile.mobile}
                onChangeText={(text) => handleProfileUpdate("mobile", text)}
              />
              {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
          <AlertCustom
            visible={alertVisible}
            title={alertTitle}
            message={alertMessage}
            onClose={() => setAlertVisible(false)}
          />
        </Modal>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: height * 0.15,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePictureContainer: {
    width: 120,
    height: 120,
    position: "relative",
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#195b8c",
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "black",
    textTransform: "uppercase",
    width: "100%",
    textAlign: "center",
  },

  email: {
    fontSize: 16,
    color: "black",
    //marginTop: 5,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
    marginBottom: height * 0.07,
  },
  iconCreate: {
    backgroundColor: "(rgba(255, 255, 255, 0.7)",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    width: 80,
    marginHorizontal: 20,
    marginVertical: -15,
  },
  iconButton: {
    alignItems: "center",
    marginVertical: -10,
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,
    color: "black",
  },
  profileDetails: {
    width: "80%",
    padding: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,

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
    backgroundColor: "#195b8c",
    padding: 10,
    borderRadius: 20,
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
    borderRadius: 20,
    marginBottom: 10,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#195b8c",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },

  closeButton: {
    backgroundColor: "#cccccc",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "black",
    fontWeight: "bold",
  },
});


