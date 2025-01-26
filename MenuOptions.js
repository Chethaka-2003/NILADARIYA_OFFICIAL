import React, { useState } from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground} from 'react-native';
import { WebView } from 'react-native-webview';
import Draggable from 'react-native-draggable';


export default function MenuOptions()  {
  const [searchQuery, setSearchQuery] = useState("");
  const [showChatbot, setShowChatbot] = useState(false);
  // const [isDarkMode, setIsDarkMode] = useState(false); //Track the current theme
  const [showNavBar, setShowNavBar] = useState(false); // State for navigation bar visibility

  const handleSearch = (text) => setSearchQuery(text);

  const openChatbot = () => {
    setShowChatbot(true);
  };
  const closeChatbot = () => {
    setShowChatbot(false);
  };
  const toggleNavBar = () => {
    setShowNavBar (!showNavBar);
  };
  // const toggleTheme = () => {
  //   setIsDarkMode ((preMode) => !preMode);
  
    return (
      <ImageBackground source={require('./assets/background.png')} style={styles.background}>
       <View style={styles.textContainer}>
        
      <View style={styles.header}>
             <Image source={require("./assets/Logo.png")}
                     style={styles.logo}/>
              {/* <TouchableOpacity style={styles.menuIcon} onPress={toggleNavBar}>
                  <Image source={require('./assets/MenuIcon.png')} style={styles.menuImage}/>
              </TouchableOpacity>         */}
      </View>
                    
            <View style={styles.grid}>
              <TextInput style= {styles.searchBar}
                          placeholder="Search..." 
                          placeholderTextColor= '#555'
                          value={searchQuery} 
                          onChangeText={handleSearch}
             />  
              {/* <TouchableOpacity onPress={toggleTheme} style={styles.themeIcon}>
               <Image source={isDarkMode ? require('./assets/sun.png') : require('./assets/moon.png')} styles={styles.themeImage}/>
              </TouchableOpacity> 
              <Text style={styles.modeText}>
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </Text> */}

      </View>  
      <View style={styles.content}>     
        <Image source={require('./assets/glogo-.png')} style={styles.image}/>
        <View style={styles.textContainer}>
             <Text style={styles.title}> NILADHARIYA SRI LANKA </Text>
             <Text style={styles.subTitle}>One Click. Save your Time </Text>
        </View>   
      </View>
           <View style={styles.grid}>
              <TouchableOpacity style={styles.gridItem} >
                <Image source = {require('./assets/District.png')}
                    style={styles.gridImage}
                />
                <Text style={styles.gridText}>District Secretariat</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <Image source = {require('./assets/Municipal.png')}
                    style={styles.gridImage}
                />
                <Text style={styles.gridText}>Municipal Council</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <Image source = {require('./assets/Grama_niladhari.png')}
                    style={styles.gridImage}
                />
                <Text style={styles.gridText}>Grama Niladhari</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <Image source = {require('./assets/Samurdhi.png')}
                    style={styles.gridImage}
                />
                <Text style={styles.gridText}>Samurdhi Niladhari</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <Image source = {require('./assets/electricity.png')}
                    style={styles.gridImage}
                />
                <Text style={styles.gridText}>Electricity Board</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <Image source = {require('./assets/water_board.png')}
                    style={styles.gridImage}
                />
                <Text style={styles.gridText}>Water Board</Text>
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
    // themeIcon:{
    //   width :5,
    //   height :5,
    //   // marginRight: 10,
    //   // marginLeft: 0,

      
    // },
    // themeImage:{
    //   width : 5,
    //   height : 5,
    //   resizeMode: 'contain',
      
    // },
    searchBar: {
      height: 40,
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 60,
      width: "60%",
      marginLeft: 10,
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
   title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "red",  
      textAlign:'center',
    },
    
   subTitle: {
      fontSize: 16,
      color: "grey",
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
    gridText: {
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
    container: {
      backgroundColor : '#FFD580',
    },
    // //Menu Icon 
    // menuIcon:{
    //   position : 'absolute',
    //   bottom : 20,
    //   right :0,
    //   width:50,
    //   height:50,
    //   marginRight: 20,
    //   marginBottom:20,
    // },
    // menuImage:{
    //   width:'100%',
    //   height: '100%',
    //   resizeMode:'contain',
    // },
    // //Navigation bar
    // navBar: {
    //   position :'absolute',
    //   bottom : 80,
    //   right:20,
    //   width:200,
    //   backgroundColor:'#FFF',
    //   borderRadius:5,
    //   padding:10,
    //   // ADD SHADOW..
    //   shadowColor:'#000',
    //   shadowOffset:{width:0, height:2},
    //   shadowOpacity:0.8,
    //   shadowRadius:2,
    //   elevation: 5,
    // },
    // navItem: {
    //   padding: 10,
    // },
    // navText: {
    //   fontSize: 18,
    //   color: '#000',
    //   textAlign: 'center',
    // },
  }
)

  