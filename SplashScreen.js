import React, { useEffect , useRef} from 'react';
import { StyleSheet,View, SafeAreaView, Animated } from "react-native";
import LottieView from "lottie-react-native"
import Background from "./GradientBackground";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen(){
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    useEffect(() => {
        const timer = setTimeout(() => {
        navigation.navigate('Screen');
        }, 4000);
        return () => clearTimeout(timer);
    }, [navigation]);

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 5000,
                useNativeDriver: true,
            }
        ).start();
    }, [fadeAnim]);

    return (
        <SafeAreaView style = {{flex:1}}>
            <Background/>
                <View style = {styles.container}>
                    <View>
                    <Animated.Image
                        source={require('../assets/Logo.png')}
                        style={[styles.image, { opacity: fadeAnim }]}
                    />
                        <LottieView source={require('../assets/Animation - 1735760151144.json')} autoPlay loop style = {styles.animation}/>
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
        marginTop: -50,
        width: 250,
        height: 250,
    }
});

