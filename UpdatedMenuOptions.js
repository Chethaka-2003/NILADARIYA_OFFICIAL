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
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Image source={require('./assets/PradeshiyaSaba.jpg')} style={styles.buttonImage}/>
          <Text style={styles.buttonText}> Divisional Council</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Image source={require('./assets/PradeshiyaSaba.jpg')} style={styles.buttonImage}/>
          <Text style={styles.buttonText}> MUNICIPAL COUNCIL</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.icon}>
          <Image source={require('./assets/water_board.png')} style={styles.iconImage}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Image source={require('./assets/electricity.png')} style={styles.iconImage}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Image source={require('./assets/police.jpg')} style={styles.iconImage}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Image source={require('./assets/court.png')} style={styles.iconImage}/>
        </TouchableOpacity>
      </View>

    </ImageBackground>        
   
          );
        }


    const styles = StyleSheet.create({
        background: {
          flex: 1,
          
        },
        header: {
            padding: 20,
            alignItems: "center",
          },
        Logo: {
            width: 150,
            height: 100,
            marginBottom: 5,
            marginTop:2,
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
          buttonsContainer: {
            flexDirection:'row',
            justifyContent:'space-between',
            marginBottom: 40,
            marginTop:10,
          },
          button: {
            backgroundColor: '#FFFFFF',
            borderRadius:5,
            padding:10,
            alignItems:'center',
            flex:1,
            marginHorizontal:5,
          },
          buttonImage:{
            width:50,
            height:50,
            marginBottom:10,
          },
          buttonText:{
            fontSize:14,
          },
          iconsContainer:{
            flexDirection:'row',
            justifyContent:'space-between',
            marginBottom:20,
          },
          icon:{
            backgroundColor:'#FFFFFF',
            borderRadius:5,
            padding:10,
            alignItems:'center',
            flex:1,
            marginHorizontal:5, 
          },  
          iconImage:{
            width:50,
            height:50,
          }
        }
    )          
   
