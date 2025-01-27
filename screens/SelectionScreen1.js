import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from "react-native";

const SelectionPage = () => {
  return (
    <ImageBackground 
      source={require('../assets/Selection.jpg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backText}>⬅</Text>
          </TouchableOpacity>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.title}>PRADESHIYA SABHAWA</Text>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonsContainer}>
          {menuOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.button}>
              <View style={styles.iconContainer}>
                <Image source={option.icon} style={styles.icon} />
              </View>
              <Text style={styles.buttonText}>{option.label}</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerIcon}>👤</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footerButton, styles.activeFooterButton]}>
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

// Button Data
const menuOptions = [
  { label: "G.S Officer", icon: require("../assets/officer.png") },
  { label: "Secretarian", icon: require("../assets/officer.png") },
  { label: "Samurdhi Officer", icon: require("../assets/officer.png") },
  { label: "Field Officer", icon: require("../assets/officer.png") },
  { label: "Transport", icon: require("../assets/Transport.png") },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // Ensures the background image covers the entire screen
  },

  backButton: {
    position: "absolute",
    top: 10,
    left: 20,
  },
  backText: {
    fontSize: 50,
    color: "#000",
    left: -10,
  },
  logo: {
    marginTop: 20,
    top: 10,
    left: 140,
    width: 120,
    height: 80,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    left: 100,
  },
  buttonsContainer: {
    flex: 1,
    marginTop: 70,
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 20,
    borderRadius: 10,
    elevation: 5,
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  arrow: {
    fontSize: 18,
    color: "#000",
  },
  footer: {
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

export default SelectionPage;
