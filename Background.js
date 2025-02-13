import React from "react";
import { StyleSheet,View, Image } from "react-native";


const Background = ({type}) => {
    const backgroundImage = type === 'type1'
        ?require('./assets/Background.jpg') 
        :require('./assets/Background2.png');
    return (
        <View style={styles.container}>
            <Image source={backgroundImage} style={styles.background} />
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
    background: {  
        width: '100%',
        height: '100%',
      },
});

export default Background;

