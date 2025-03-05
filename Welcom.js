import React from "react";
import { StyleSheet,View, Text,ImageBackground } from "react-native";



export default function WelcomeScreen(){
    return (
        <SafeAreaView style = {{flex:1}}>
        <Background type = "type2"/>
        <View style = {styles.container}>
            <View>
                
                <Text style={styles.text}>UNDER CONSTRUCTION...!!!</Text>
            </View>
        </View>
        </SafeAreaView>
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

