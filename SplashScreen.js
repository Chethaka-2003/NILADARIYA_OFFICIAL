import React, { useEffect } from 'react';
import { Image,StyleSheet,View,ImageBackground, SafeAreaView } from "react-native";
import Icon from "./assets/icon.png";
import LottieView from "lottie-react-native"
import Background from "./Background";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen(){
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
        navigation.navigate('Screen');
        }, 4000);
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <SafeAreaView style = {{flex:1}}>
            <Background type = "type1"/>
                <View style = {styles.container}>
                    <View>
                    <Image source={Icon} style={styles.image}/>
                    <LottieView source={require('./assets/Animation - 1735760151144.json')} autoPlay loop style = {styles.animation}/>
                    </View>
                </View>
        </SafeAreaView>
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

