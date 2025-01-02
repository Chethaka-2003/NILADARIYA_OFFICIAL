import React from "react";
import { StyleSheet,View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function WelcomeScreen(){
    return (
        <View style = {styles.container}>
            <View>
                <Text style={styles.text}>Welcome to the App</Text>
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
    text:{
        fontSize: 20,
        color: 'white',
    },

});

