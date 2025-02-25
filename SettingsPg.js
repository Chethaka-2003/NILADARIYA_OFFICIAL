import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function SettingsPage({ navigation }) {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>App Settings</Text>
        <FeatherIcon name="settings" style={styles.headerIcon} />
      </View>

      {/* Settings List */}
      <View style={styles.settingsContainer}>
        <View style={styles.settingItem}>
          <FeatherIcon name="bell" style={styles.settingIcon} />
          <Text style={styles.settingText}>Notification</Text>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={setIsNotificationsEnabled}
          />
        </View>

        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('Security')}>
          <FeatherIcon name="shield" style={styles.settingIcon} />
          <Text style={styles.settingText}>Security</Text>
          <FeatherIcon name="chevron-right" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('Language')}>
          <FeatherIcon name="globe" style={styles.settingIcon} />
          <Text style={styles.settingText}>Language</Text>
          <FeatherIcon name="chevron-right" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('AboutUs')}>
          <FeatherIcon name="info" style={styles.settingIcon} />
          <Text style={styles.settingText}>About App</Text>
          <FeatherIcon name="chevron-right" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('Rate')}>
          <FeatherIcon name="thumbs-up" style={styles.settingIcon} />
          <Text style={styles.settingText}>Rate Us</Text>
          <FeatherIcon name="chevron-right" style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b55427',
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcon: {
    fontSize: 40,
    marginTop: 10,
  },
  settingsContainer: {
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    marginTop: 30,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  settingText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrowIcon: {
    fontSize: 24,
    color: '#555',
  },
});
