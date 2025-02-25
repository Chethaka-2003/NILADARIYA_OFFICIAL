import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FeedbackSubmitted = ({ navigation }) => {
  useEffect(() => {
    // Automatically navigate back to SettingsPg after 3 seconds
    const timer = setTimeout(() => {
      navigation.navigate('SettingsPg');
    }, 3000); // 3 seconds

    // Cleanup the timer on unmount
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.whiteContainer}>
        <Icon name="check-circle" size={100} color="#4CAF50" />
        <Text style={styles.title}>Feedback Submitted</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  whiteContainer: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#4CAF50',
  },
});

export default FeedbackSubmitted;
