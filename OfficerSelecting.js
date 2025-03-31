import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Background from "../Required/GradientBackground";

const { width, height } = Dimensions.get("window");

const API_BASE_URL = "http://192.168.1.136:4000/profile";

export default function OfficerList() {
  const navigation = useNavigation();
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/getofficers`)
      .then((res) => {
        if (res.data.status === "OK" && res.data.officers) {
          // Filter government officers only
          const governmentOfficers = res.data.officers.filter(
            (officer) => officer.userType === "government"
          );
          setOfficers(governmentOfficers);
        } else {
          Alert.alert("Error", "Could not fetch officers.");
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Error", "An error occurred while fetching officers.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#195b8c" />
      </SafeAreaView>
    );
  }

  const renderOfficer = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate("OfficerPreview", { officerEmail: item.email })
      }
    >
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemEmail}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <FlatList
        data={officers}
        keyExtractor={(item) => item.email}
        renderItem={renderOfficer}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    marginTop: height * 0.1,
    paddingHorizontal: width * 0.05,
  },
  itemContainer: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  itemEmail: {
    fontSize: 14,
    color: "gray",
  },
});

export function ProfilePage() {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const startPulse = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.5, // Shrinks the spot
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1, // Restores to original size
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    startPulse();
  }, [pulseAnim]);

  return (
    <ImageBackground
      source={require("./assets/Selection.jpg")}
      style={profileStyles.backgroundImage}
    >
      <View style={profileStyles.container}>
        {/* Header Section */}
        <View style={profileStyles.header}>
          <Text style={profileStyles.userName}>Chethaka Fernando</Text>
        </View>

        {/* Profile Picture */}
        <View style={profileStyles.profilePictureContainer}>
          {/* Blinking Availability Indicator */}
          <Animated.View
            style={[
              profileStyles.availabilityIndicator,
              { transform: [{ scale: pulseAnim }] }, // Apply pulsating animation
            ]}
          />
          <Image
            source={require("./assets/officer.png")}
            style={profileStyles.profilePicture}
          />
        </View>

        {/* Officer Details Section */}
        <View style={profileStyles.officerDetailsContainer}>
          <Text style={profileStyles.officerDetailsTitle}>Officer Name</Text>
          <Text style={profileStyles.officerDetail}>Rank: Sergeant</Text>
          <Text style={profileStyles.officerDetail}>Badge Number: 12345</Text>
          <Text style={profileStyles.officerDetail}>Department: Education</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const profileStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
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
    width: 170,
    height: 170,
    borderRadius: 90,
    borderWidth: 5,
    borderColor: "#fff",
  },
  officerDetailsContainer: {
    marginVertical: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "100%",
  },
  officerDetailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  officerDetail: {
    fontSize: 16,
    marginBottom: 5,
  },
  availabilityIndicator: {
    position: "absolute",
    top: -42, // Adjust to position slightly outside the top-left
    left: 200, // Adjust to position slightly outside the top-left
    width: 20,
    height: 20,
    backgroundColor: "green",
    borderRadius: 10, // Makes it a perfect circle
    borderWidth: -4, // Optional, for a border around the circle
    borderColor: "#fff", // Matches the profile picture border
    zIndex: 1, // Ensures it is on top of the profile picture
  },
});