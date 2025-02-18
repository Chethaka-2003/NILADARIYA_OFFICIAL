import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Switch, TouchableOpacity, ImageBackground } from "react-native";

const ProfilePage = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(!isEnabled);

  return (
    <ImageBackground 
      source={require('./assets/Selection.jpg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.userName}>Chethaka Fernando</Text>
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

        {/* Permission Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Permission</Text>
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
});

export default ProfilePage;
