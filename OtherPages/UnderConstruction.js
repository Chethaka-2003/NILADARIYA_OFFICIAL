import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Background from "../Required/GradientBackground";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');


export default function UnderConstruction() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Background />
      <View style={styles.container}>
        
        <LottieView
          source={require('../assets/UpdatedMenuOption/Animation - 1742597139352.json')}
          autoPlay
          loop
          style={styles.animation}
        />
        <Text style={styles.text}>UNDER </Text>
        <Text style={styles.text1}>DEVELOPMENT </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    top: height * 0.02,
    left: width * 0.2,
    position: 'absolute',
    width: width * 0.8,
    height: height * 0.8,
    
  },
  text: {
    color: 'red',
    fontSize: width * 0.08,
    fontWeight: "bold",
    marginTop: height * 0.15,
  },
  text1: {
    color: 'red',
    fontSize: width * 0.08,
    fontWeight: "bold",
    marginTop: height * 0.45,
    fontStyle: 'italic',
  },
});
