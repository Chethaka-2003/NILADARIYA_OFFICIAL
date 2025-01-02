import React from "react";
import { Image,StyleSheet,View } from "react-native";
import Icon from "../testing/assets/icon.png"
import LinearGradient from "react-native-linear-gradient";
    import LottieView from "lottie-react-native"

export default function SplashScreen(){
    return (
        <View style = {styles.container}>
            <View>
                <Image source={Icon} style={styles.image}/>
                <LottieView source={require('../testing/assets/Animation - 1735760151144.json')} autoPlay loop style = {styles.animation}/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:  '#550000'  
        
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

