import React from "react";
import { Text, StyleSheet,View, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function Linear(){
    return (
        <View style={styles.container}>
            <Image source={require('./assets/Background.jpg')} style={styles.backgroundImage} />
        </View>
    )
}
const styles = StyleSheet.create({
    backgroundImage: {
        position: 'fixed',
        width: '100%',
        height: '100%',
      },
});

