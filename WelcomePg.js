import React from "react";
import { StyleSheet,View, Text,ImageBackground } from "react-native";
import LinearGradient from "react-native-linear-gradient";


export default function WelcomeScreen(){
    return (
        <ImageBackground source={require('./assets/Background.jpg')} style={styles.background} resizeMode="cover">
        <View style = {styles.container}>
            <View>
                <Text style={styles.text}>Welcome to the App</Text>
            </View>
        </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    background: {
        flex: 1, // Makes the background fill the screen
        justifyContent: 'center', // Centers content vertically
        alignItems: 'center',
    },

    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center', 
        
    },
    text:{
        fontSize: 20,
        color: 'white',
    },

});

