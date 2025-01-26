import React, { useState } from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground} from 'react-native';
import {Picker} from '@react-native-picker/picker';
// import { WebView } from 'react-native-webview';
// import Draggable from 'react-native-draggable';

const districts = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 'Hambantota',
  'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale',
  'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
];

export default function MenuOptions()  {
  const [selectedDistrict,setSelectedDistrict] = useState(districts[0]);

return (
    <ImageBackground source={require('./assets/background.png')} style={styles.background}>
       <View style={styles.textContainer}>
        
      <View style={styles.header}>
             <Image source={require("./assets/Logo.png")}
                     style={styles.Logo}/>
      </View>

      <Picker
        selectedValue = {selectedDistrict}
        style  =  {styles.picker} 
        onValueChange={(itemValue,itemIndex) => setSelectedDistrict(itemValue)}
      >
        {districts.map((district,index) => (
          <Picker.Item key = {index} label={district} value={district}/>
        ))}
      </Picker>  

      </View>
    </ImageBackground>        
   
          );
        }


    const styles = StyleSheet.create({
        background: {
          flex: 1,
          
        },
        header: {
            padding: 40,
            alignItems: "center",
          },
        Logo: {
            width: 150,
            height: 100,
            marginBottom: 20,
            resizeMode:'contain',
          },
          textContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          picker: {
            height: 50,
            width: 250,
            backgroundColor: '#ffffff',
            borderColor: '#000000',
            borderWidth: 1,
            borderRadius: 5,
          },
        }
    )          
   
