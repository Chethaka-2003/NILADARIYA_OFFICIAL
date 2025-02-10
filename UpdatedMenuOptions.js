import React, { useState } from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground,Modal} from 'react-native';
import {Picker} from '@react-native-picker/picker';
// import { WebView } from 'react-native-webview';
 import Draggable from 'react-native-draggable';

const districts = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 'Hambantota',
  'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale',
  'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
];

export default function MenuOptions()  {
  const [selectedDistrict,setSelectedDistrict] = useState(districts[0]);
  const [isModalVisible,setModalVisible] = useState(false);

  const handleChatbotPress = () => {
    setModalVisible (true);
  };
  const handleCloseModal = () => {
    setModalVisible (false);
  };

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
      
      <View style= {styles.iconsContainer}>
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
      </View>
      
      <Draggable x={100} y={100}>
      <TouchableOpacity style={styles.Chatbot} onPress={handleChatbotPress}>
         <Image source = {require('./assets/chatbotIcon.png')} style={styles.chatbotImage}/>
      </TouchableOpacity>
      </Draggable>
      

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={require('./assets/chatbotIcon.png')} style={styles.modalImage} />
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>   
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
            marginBottom:10,
            marginTop:10,
          },
          buttonBackground:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            //padding: 10,
            width:300,
            borderRadius:10,
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
            marginBottom: 10,
            marginTop:2,
            width:250,
            alignItems:'center',
            marginLeft: 5,
          },
          icon:{
            backgroundColor:'gray',
            borderRadius:50,
            padding:10,
            alignItems:'center',
            width: '50%',
            marginVertical: 10, 
          },  
          iconImage:{
            width:70,
            height:55,
            marginBottom: 1,
          },
          iconsContainer: { // New style for the icons container
            backgroundColor: 'black', // Set the background color for the container
            //padding: 10,
            borderRadius: 10,
            alignItems: 'center',
            marginVertical: 20,
            width:290,
            marginLeft:65,
          },
          Chatbot: {
             resizeMode:'contain',
             height:50,
             width:200,
          },
          chatbotImage :{
             height:60,
             width:200,
             resizeMode:'contain',
          },
        
        modalContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10,
          alignItems: 'center',
          height:600,
          width:350,
        },
        modalImage: {
          width: 60,
          height: 50,
          resizeMode: 'contain',
        },
        closeButton: {
          marginTop: 10,
          padding: 10,
          backgroundColor: 'gray',
          borderRadius: 5,
        },
        closeButtonText: {
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        },
        draggableChatbot: {
          position: 'absolute',
          bottom: 20,
          right: 20,
        },
        draggableChatbotImage: {
          height: 60,
          width: 200,
          resizeMode: 'contain',
        },
      },
    )          
   
