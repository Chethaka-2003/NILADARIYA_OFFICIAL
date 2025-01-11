import React from 'react';
import { StyleSheet, View } from 'react-native';
import PublicProfile from './PublicProfile';

export default function App() {
  return (
    <View style={styles.container}>
      <PublicProfile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent: 'center',
  },
});




