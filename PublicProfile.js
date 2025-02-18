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
      source={require('./assets/Selection.jpg')} 
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
            source={require("./assets/profile.jpg")}
            style={styles.profilePicture}
          />
        </View>

        {/* Permission Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.option}>
            <View style={styles.optionContent}>
              <Image
                source={require("./assets/officer.png")}
                style={styles.icon}
              />
              <Text style={styles.optionText}>Profile Details</Text>
            </View>
            <Text style={styles.arrowIcon}>{">"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <View style={styles.optionContent}>
              <Image
                source={require("./assets/Activity.png")}
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
  section: {
    width: "100%",
    marginTop: 80,
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
    marginVertical: 30,
    top: 0,
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
  whiteContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    width: "100%",
    marginTop: 20,
  },
  managePrivacyButton: {
    backgroundColor: "#d9d9d9",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  managePrivacyText: {
    fontSize: 16,
    color: "#000",
  },
  logoutButton: {
    backgroundColor: "#f53b3b",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
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