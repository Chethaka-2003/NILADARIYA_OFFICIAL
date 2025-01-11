import React, { useState } from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground} from 'react-native';
import { WebView } from 'react-native-webview';
import Draggable from 'react-native-draggable';


export default function MenuOptions()  {
  const [searchQuery, setSearchQuery] = useState("");
  const [showChatbot, setShowChatbot] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); //Track the current theme

  const handleSearch = (text) => setSearchQuery(text);

  const openChatbot = () => {
    setShowChatbot(true);
  };
  const closeChatbot = () => {
    setShowChatbot(false);
  };
  const toggleTheme = () => {
    setIsDarkMode ((preMode) => !preMode);
  };
    return (
      <ImageBackground source={require('./assets/background.png')} style={styles.background}>
       <View style={isDarkMode ? styles.darkContainer : styles.LightContainer}>
        
      <View style={styles.header}>
             <Image source={require("./assets/Logo.png")}
                     style={styles.logo}/>

              <TouchableOpacity onPress={toggleTheme} style={styles.themeIcon}>
               <Image source={isDarkMode ? require('./assets/sun.png') : require('./assets/moon.png')} styles={styles.themeImage}/>
             </TouchableOpacity>         
             
              <TextInput style= {styles.searchBar}
                          placeholder="Search..." 
                          placeholderTextColor={isDarkMode? '#aaa' : '#555'}
                          value={searchQuery} 
                          onChangeText={handleSearch}
             />  
             
      </View>  
      <View style={styles.content}>     
        <Image source={require('./assets/glogo-.png')} style={styles.image}/>
        <View style={styles.textContainer}>
             <Text style={isDarkMode? styles.darkTitle:styles.lightTitle}> NILADHARIYA SRI LANKA </Text>
             <Text style={isDarkMode? styles.darkSubTitle:styles.lightSubTitle}>One Click. Save your Time </Text>
        </View>   
      </View>
           <View style={styles.grid}>
              <TouchableOpacity style={styles.gridItem} >
                <Image source = {require('./assets/District.png')}
                    style={styles.gridImage}
                />
                <Text style={isDarkMode ? styles.darkGridText : styles.lightGridText}>District Secretariat</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <Image source = {require('./assets/Municipal.png')}
                    style={styles.gridImage}
                />
                <Text style={isDarkMode ? styles.darkGridText : styles.lightGridText}>Municipal Council</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <Image source = {require('./assets/Grama_niladhari.png')}
                    style={styles.gridImage}
                />
                <Text style={isDarkMode ? styles.darkGridText : styles.lightGridText}>Grama Niladhari</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <Image source = {require('./assets/Samurdhi.png')}
                    style={styles.gridImage}
                />
                <Text style={isDarkMode ? styles.darkGridText : styles.lightGridText}>Samurdhi Niladhari</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <Image source = {require('./assets/electricity.png')}
                    style={styles.gridImage}
                />
                <Text style={isDarkMode ? styles.darkGridText : styles.lightGridText}>Electricity Board</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <Image source = {require('./assets/water_board.png')}
                    style={styles.gridImage}
                />
                <Text style={isDarkMode ? styles.darkGridText : styles.lightGridText}>Water Board</Text>
              </TouchableOpacity>
            </View> 
            <Draggable x={300} y={500} renderSize={50} renderColor="transparent" renderText="" isCircle={false}>
            <TouchableOpacity style={styles.chatbotIcon} onPress={openChatbot}>
              <Image source={require('./assets/chatbotIcon.png')} style={styles.chatbotImage}/>
            </TouchableOpacity>  
            </Draggable>
            {showChatbot && (
              <View style = {styles.chatbotContainer}>
                <TouchableOpacity onPress={()=> setShowChatbot(false)} style={styles.closeButton}>
                  <Text style = {styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
                <WebView
                   source={{uri:'https:-chatbot-url.com'}}
                   style={styles.webview}
                />       
            </View>
            )}
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
    logo: {
      width: 150,
      height: 100,
      marginBottom: 20,
      resizeMode:'contain',
    },
    themeIcon:{
      width : 0.00000000000000020,
      height :0.00000000000000020,
      marginLeft:10,
      marginTop: 10,
      marginBottom: 10,
    },
    themeImage:{
      width : '0.000000005%',
      height : '0.00000005%',
      
    },
    searchBar: {
      height: 40,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
      width: "80%",
    },
    content:{
      flexDirection : 'row',
      alignItems:'center',
      paddingHorizontal:'20',
      paddingBottom:'20',
      paddingTop:'20',
      backgroundColor:'white',
      borderBlockColor:'black',
      borderRadius:10,
      overflow: 'hidden',
    },
    image:{
      width:80,
      height:80,
      marginRight:20,
      resizeMode:'contain',
    },
    lightTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: "red",  
      textAlign:'center',
    },
    darktTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",  
      textAlign:'center',
    },
    lightSubTitle: {
      fontSize: 16,
      color: "grey",
      marginBottom: 20,
      textAlign: 'center',
      fontWeight: "bold",
    },
    darkSubTitle: {
      fontSize: 16,
      color: "lightgrey",
      marginBottom: 20,
      textAlign: 'center',
      fontWeight: "bold",
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    
    },
    gridItem: {
      width: "40%",
      margin: 20,
      alignItems: "center",
      backgroundColor:'#FFFFED',
      borderRadius:10,
      overflow: 'hidden',
      
    },
    gridImage: {
      width: 80,
      height: 80,
      marginBottom: 10,
    },
    lightGridText: {
      textAlign: "center",
      fontSize: 18,
      color: "black",
      fontWeight: "bold",
    },
    darkGridText: {
      textAlign: "center",
      fontSize: 18,
      color: "black",
      fontWeight: "bold",
    },
    chatbotIcon: {
      position : 'absolute',
      bottom : 20,
      right : 20,
      width :50,
      height : 50, 
    },
    chatbotImage: {
      width : '100%',
      height : '100%',
      resizeMode : 'contain',
    },
    chatbotContainer : {
      position : 'absolute',
      bottom : 80,
      left : 0,
      right : 0,
      top : 0,
      backgroundColor : 'rgba(0, 0, 0, 0.5)',
      justifyContent : 'center',
      alignItems : 'center',
    },
    closeButton: {
      position: 'absolute',
      top: 40,
      right : 20,
      backgroundColor : '#fff',
      padding : 10,
      borderRadius : 5,
    },
    closeButtonText : {
      color : '#000',
    },
    webview : {
      width : '90%',
      height : '80%',
      backgroundColor: '#fff',
    },
    LightContainer: {
      backgroundColor : '#FFD580',
    },
    darkContainer: {
      backgroundColor: 'balck',
    },
  });