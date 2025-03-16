import React, { useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, Animated, ImageBackground, TouchableOpacity } from "react-native";

const ProfilePage = () => {
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
      source={require('../assets/Selection.jpg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.userName}>Chethaka Fernando</Text>
        </View>

        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          {/* Blinking Availability Indicator */}
          <Animated.View
            style={[
              styles.availabilityIndicator,
              { transform: [{ scale: pulseAnim }] }, // Apply pulsating animation
            ]}
          />
          <Image
            source={require("../assets/officer.png")}
            style={styles.profilePicture}
          />
        </View>

        {/* Officer Details Section */}
        <View style={styles.officerDetailsContainer}>
          <Text style={styles.officerDetailsTitle}>Officer Name</Text>
          <Text style={styles.officerDetail}>Rank: Sergeant</Text>
          <Text style={styles.officerDetail}>Badge Number: 12345</Text>
          <Text style={styles.officerDetail}>Department: Education</Text>
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
  footer: {
    position: "absolute",
    bottom: 0,
    width: "110%",
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

export default ProfilePage;