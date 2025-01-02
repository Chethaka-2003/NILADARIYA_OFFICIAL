import React from "react";
import { Image,StyleSheet,View,ImageBackground } from "react-native";
import Icon from "../CHIPS_CODE/assets/icon.png";
import LottieView from "lottie-react-native"

export default function SplashScreen(){
    return (
        <ImageBackground source={require('./assets/Background.jpg')} style={styles.background} resizeMode="cover">
        <View style = {styles.container}>
            <View>
                <Image source={Icon} style={styles.image}/>
                <LottieView source={require('./assets/Animation - 1735760151144.json')} autoPlay loop style = {styles.animation}/>
            </View>
        </View>
        </ImageBackground>
    )
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        width: '100%',
        height: '100%',  
        justifyContent: 'center',
        alignItems: 'center',   
    },

    background: {
        flex: 1, // Makes the background fill the screen
        justifyContent: 'center', // Centers content vertically
        alignItems: 'center',
    },

    
    image:{
        width:250,
        height:250,
        resizeMode: 'contain', 
        },
    animation:{
        marginTop: -145,
        width: 250,
        height: 250,
    }
});

