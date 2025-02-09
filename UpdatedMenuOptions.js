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
        <ScrollView contentContainerStyle={styles.scrollView}>
        
      <View style={styles.logoAndTextContainer}>
             <Image source={require("./assets/Logo.png")}
                     style={styles.logo}/>
      </View>
      
      <View style={styles.pickerContainer}> 
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
          <ImageBackground source={require('./assets/flag.png')} style={styles.buttonBackground}>
          <Text style={styles.buttonText}> DIVISIONAL COUNCIL</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <ImageBackground source={require('./assets/MunicipalCoun.jpg')} style={styles.buttonBackground}>
          <Text style={styles.buttonText}> MUNICIPAL COUNCIL</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={styles.iconsGrid}>
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
      </ScrollView>
    </ImageBackground>        
   
          );
        }


    const styles = StyleSheet.create({
        background: {
          flex: 1,
          
        },
        scrollView: {
          flexGrow: 1,
          justifyContent: 'space-between',
        },
        logoAndTextContainer: {
          alignItems: 'center',
         // marginVertical: 20,
        },
        logo: {
          width: 200,
          height: 150,
          resizeMode: 'contain',
          marginTop:23,
          marginBottom:0,
          
        },
          // textContainer: {
          //   flex: 1,
          //   justifyContent: 'center',
          //   marginTop: 1,
          //   marginBottom:1,
          //   alignItems: 'center',
          // },
          picker: {
            height: 50,
            width: 250,
            backgroundColor: '#ffffff',
            borderColor: '#000000',
            borderWidth: 1,
            borderRadius: 5,
            marginTop:0,
          },
          pickerContainer: {
            alignItems: 'center',
            marginTop:2,
            //marginVertical:1,
          },
          buttonsContainer: {
            flexDirection:'colomn',
            justifyContent:'space-between',
            marginBottom: 10,
            marginTop:5,
            borderRadius:50,
          },
          button: {
            height:190,
            //width:400,
            margin:10,
            borderRadius:10,
            padding:10,
            alignItems:'center',
            flex:1,
            marginHorizontal:5,
            marginBottom:20,
            marginTop:10,
          },
          buttonBackground:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            //padding: 10,
            width:300,
          },
          buttonText:{
            fontSize:20,
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
          },
          iconsGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginBottom: 20,
          },
          icon:{
            backgroundColor:'#FFFFFF',
            borderRadius:5,
            padding:10,
            alignItems:'center',
            width: '48%',
            marginVertical: 10, 
          },  
          iconImage:{
            width:50,
            height:50,
            marginBottom: 10,
          }
        }
    )          
   
