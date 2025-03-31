import React, { useRef } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Dimensions, Image, Linking, ScrollView } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import FeatherIcon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

const AboutApp = () => {
  const bottomSheetRef = useRef();

  const openBottomSheet = () => {
    bottomSheetRef.current.open();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current.close();
  };

  const handlePress = () => {
    Linking.openURL('https://sparkm6.com');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openBottomSheet} style={styles.row}>
        <View style={styles.box}>
          <FeatherIcon name="info" style={styles.icon} />
        </View>

        <Text style={styles.rowLabel}>About App</Text>
        <View style={styles.rowSpacer} />

        <FeatherIcon color='black' name='chevron-right' size={30} />
      </TouchableOpacity>

      <RBSheet
        ref={bottomSheetRef}
        height={700}
        openDuration={250}
        closeDuration={200}
        customStyles={{
          container: {
            padding: 20,
            alignItems: 'center',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#FFFFFF',
          },
        }}
      >
        <ScrollView contentContainerStyle={styles.sheetContent}>
          <Text style={styles.title}>About App</Text>
          <Image source={require('../assets/LOGO.png')} style={styles.logo} />
          <Text style={styles.appName}>NILADARIYA</Text>
          <Text style={styles.subtitle}>Government Officer Consulting Application</Text>
          <Text style={styles.description}>
            This app is designed to save time for users and strengthen the connection between the government and the public.
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Developed By</Text>
            <TouchableOpacity onPress={handlePress}>
              <Image source={require('../assets/LOGOCOM.png')} style={styles.devLogo} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <View style={styles.separator} />
            <Text style={styles.sectionTitle}>App Version</Text>
            <Text style={styles.versionText}>1.0.1</Text>
          </View>
        </ScrollView>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 60,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    marginBottom: 30,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },



  icon: {
    fontSize: 30,
   
  },

  rowLabel: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },

  rowSpacer: {
    flexGrow: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0C4A6E',
    marginBottom: 15,
  },

  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    color: 'blue',
    marginBottom: 15,
  },

  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    textAlign: 'justify',
    marginHorizontal: 30,
    marginBottom: 30,
  },

  section: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  devLogo: {
    width: 170,
    height: 30,
    marginTop: 20,
    borderRadius: 5,
  },

  separator: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 20,
    width: '80%',
  },

  versionText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#555',
  },

  logo: {
    width: 180,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },

  sheetContent: {
    paddingBottom: 30,
  },
});

export default AboutApp;
