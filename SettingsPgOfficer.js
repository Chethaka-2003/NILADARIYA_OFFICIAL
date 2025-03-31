import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text, ScrollView, Switch, navigation, Dimensions } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as Notifications from 'expo-notifications';



import Background from './GradientBackground';
import RateUsModal from '../SettingsPages/Rate';
import PasswordChange from '../SettingsPages/Security';
import Language from '../SettingsPages/Language';
import LogOut from '../SettingsPages/LogOut';
import AboutApp from '../SettingsPages/AboutApp';


const Footer = ({ children }) => (
  <View style={styles.footer}>
    {children}
  </View>
);


export default function SettingsPgOfficer({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({
    notifications: true,
  });

  useEffect(() => {
    // Set up a listener for incoming notifications when this screen is focused
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log("Notification received:", notification);
      // Handle the notification as needed, for example, navigate to another screen
    });

    // Clean up the subscription when the component unmounts
    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Background />
      <ScrollView>

      <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <FeatherIcon name="arrow-left" size={30} color="black" />
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={styles.headerText}>APP Settings</Text>
          <FeatherIcon name="settings" style={styles.mainIcon} />
        </View>


        <View style={styles.section}>


          <Language visible={modalVisible} onClose={() => setModalVisible(false)} />
          <PasswordChange visible={modalVisible} onClose={() => setModalVisible(false)} />
          <RateUsModal visible={modalVisible} onClose={() => setModalVisible(false)} />

          <AboutApp />




          {/* White Container */}
          <View style={styles.whiteContainer}>

            <LogOut visible={modalVisible} onClose={() => setModalVisible(false)} />

          </View>

          <Footer>
            <Text style={{ textAlign: 'center', marginTop: height * 0.1, color: 'black', fontWeight: 'bold' }}>© 2025 SparkM6 Solutions Pvt Ltd.{'\n'} All rights reserved</Text>
          </Footer>

        </View>


      </ScrollView>

    </SafeAreaView>
  )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  headerText: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },

  mainIcon: {
    fontSize: 60,
    color: 'black',
    marginTop: height * 0.02,
  },

  section: {
    paddingHorizontal: width * 0.1,
    paddingTop: height * 0.05,
  },

  icon: {
    fontSize: 30,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 55,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    marginBottom: 30,
    paddingHorizontal: 12,
  },

  rowLabel: {
    fontSize: width * 0.05,
    paddingLeft: width * 0.02,
    fontWeight: 'bold',
    color: '#0c0c0c',
  },

  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  whiteContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    width: "100%",


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

  backButton: {
    marginTop: height * 0.07,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },

});
