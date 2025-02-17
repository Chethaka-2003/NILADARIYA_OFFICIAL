import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, StyleSheet, Switch, TouchableOpacity, ImageBackground, ActivityIndicator } from "react-native";
import { LanguageContext } from './LanguageContext';

const ProfilePage = () => {
  const { language } = useContext(LanguageContext); // Use language context
  const [isEnabled, setIsEnabled] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate fetching user profile data from the backend
    const fetchUserProfile = async () => {
      try {
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Simulate user data
        const userData = {
          name: "John Doe",
          profileImage: "path/to/officer.png",
          preferences: {
            notifications: true,
          },
        };
        setUser(userData);
        setIsEnabled(userData.preferences.notifications);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchUserProfile();
  }, []);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    // Simulate updating user profile data
    console.log('User profile updated:', { notifications: !isEnabled });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!user) {
    return <Text>Loading...</Text>;
  }

  // Language dictionary
  const translations = {
    en: {
      permission: 'Permission',
      profileDetails: 'Profile Details',
      activity: 'Activity',
      access: 'Access',
      managePrivacy: 'Manage Privacy',
      logout: 'LOG OUT',
    },
    si: {
      permission: 'අවසර',
      profileDetails: 'පැතිකඩ විස්තර',
      activity: 'ක්‍රියාකාරකම්',
      access: 'ප්‍රවේශය',
      managePrivacy: 'පෞද්ගලිකත්වය කළමනාකරණය කරන්න',
      logout: 'පිටවන්න',
    },
  };

  // Get the current translations
  const { permission, profileDetails, activity, access, managePrivacy, logout } = translations[language];

  return (
    <ImageBackground 
      source={require('./assets/Selection.jpg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.userName}>{user.name}</Text>
          <Switch
            trackColor={{ false: "#767577", true: "green" }}
            thumbColor={isEnabled ? "white" : "white"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          <Image
            source={{ uri: `http://192.168.8.124:5000/${user.profileImage}` }} // Assuming profileImage is a URL
            style={styles.profilePicture}
          />
        </View>

        {/* Permission Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{permission}</Text>
          <TouchableOpacity style={styles.option}>
            <View style={styles.optionContent}>
              <Image
                source={require("./assets/officer.png")}
                style={styles.icon}
              />
              <Text style={styles.optionText}>{profileDetails}</Text>
            </View>
            <Text style={styles.arrowIcon}>{">"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <View style={styles.optionContent}>
              <Image
                source={require("./assets/Activity.png")}
                style={styles.icon}
              />
              <Text style={styles.optionText}>{activity}</Text>
            </View>
            <Text style={styles.arrowIcon}>{">"}</Text>
          </TouchableOpacity>
        </View>

        {/* Access Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{access}</Text>
        </View>

        {/* White Container */}
        <View style={styles.whiteContainer}>
          <TouchableOpacity style={styles.managePrivacyButton}>
            <Text style={styles.managePrivacyText}>{managePrivacy}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>{logout}</Text>
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
    width: 170,
    height: 170,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfilePage;
