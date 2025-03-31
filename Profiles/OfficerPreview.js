import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Modal, Alert, Dimensions} from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Background from "../Required/GradientBackground";


const { width, height } = Dimensions.get('window');

export default function OfficerPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { officerEmail } = route.params || {}; // email passed when an officer is selected from another tab
  
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    profilePicture: "",
    available: false,
    position: "",
    department: "",
  });

  const API_BASE_URL = "https://niladariya-official-backend.onrender.com/profile";

  useEffect(() => {
    if (!officerEmail) {
      Alert.alert('Error', 'Officer email not provided.');
      return;
    }

    axios.get(`${API_BASE_URL}/getprofile`, {
      params: { email: officerEmail }
    })
      .then(res => {
        if (res.data.status === "OK") {
          setProfile(res.data.profile);
        } else {
          Alert.alert('Error', 'Officer not found.');
        }
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Error', 'An error occurred while fetching the profile.');
      });
  }, [officerEmail]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Background />
      
      <View style={[styles.container, { paddingTop: height * 0.15 }]}>
        <View style={styles.availableButton}>
          <Ionicons 
            name={profile.available ? "checkmark-circle" : "close-circle"} 
            size={30} 
            color={profile.available ? "green" : "red"}
          />
          <Text style={styles.availableButtonText}>
            {profile.available ? "Available" : "Not Available"}
          </Text>
        </View>

        <View style={styles.header}>
          <Image 
            source={profile.profilePicture 
                      ? { uri: profile.profilePicture } 
                      : require("../assets/officer.png")} 
            style={styles.profilePicture} 
          />
          <Text style={styles.userName}>{profile.name}</Text>
        </View>

        <View style={styles.profileDetails}>
          {["Name", "Email", "Mobile", "Position", "Department"].map(field => (
            <View style={styles.detailRow} key={field}>
              <Text style={styles.detailLabel}>{field}:</Text>
              <Text style={styles.detailValue}>{String(profile[field.toLowerCase()] || "")}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  availableButton: {
    flexDirection: "row",
    backgroundColor: "#233C67",
    padding: width * 0.025,
    borderRadius: 20,
    marginLeft: width * 0.55,
    marginTop: height * -0.08,
    marginBottom: height * 0.05,
  },
  availableButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: width * 0.04,
    marginTop: height * 0.004,
    marginLeft: width * 0.02,
  },
  header: {
    alignItems: "center",
    marginBottom: height * 0.05,
  },
  profilePicture: {
    width: width * 0.5,
    height: height * 0.25,
    borderRadius: 60,
  },
  userName: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginTop: height * 0.01,
    color: "black",
    textTransform: "uppercase",
  },
  profileDetails: {
    width: "80%",
    padding: 30,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
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
});
