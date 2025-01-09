import React, { useState } from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import LinearGradient from "react-native-linear-gradient";

export default function Homepage()  {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (text) => setSearchQuery(text);
    return (
      <LinearGradient
         colors ={["#ff6600", "#ff9966"]}
         style = {styles.background}
      >   
       
      <View style={styles.header}>
             <Image source={require("./assets/Logo.png")}
                     style={styles.logo}/>
             
              <TextInput style= {styles.searchBar}
                          placeholder="Search..." 
                          value={searchQuery} 
                          onChangeText={handleSearch}
             />   
      </View>  
      <View>     
             <Text style={styles.title}> NILADHARIYA SRI LANKA </Text>
             <Text style={styles.subtitle}>One Click. Save your Time </Text>
           
      </View>
           <View style={styles.grid}>
              <TouchableOpacity style={styles.gridItem}>
                <Image source = {require('./assets/District.png')}
                    style={styles.gridImage}
                />
                <Text style={styles.gridText}District Secretariat></Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <Image source = {require('./assets/Municipal.png')}
                    style={styles.gridImage}
                />
                <Text style={styles.gridText}Municipal Council></Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <Image source = {require('./assets/Samurdhi.png')}
                    style={styles.gridImage}
                />
                <Text style={styles.gridText}Samurdhi Niladhari></Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <Image source = {require('./assets/electricity.png')}
                    style={styles.gridImage}
                />
                <Text style={styles.gridText}Electricity Board></Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <Image source = {require('./assets/water_board.png')}
                    style={styles.gridImage}
                />
                <Text style={styles.gridText}Water Board></Text>
              </TouchableOpacity>

            </View> 


 </LinearGradient>      
    );
  } 

  const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
    header: {
      padding: 20,
      backgroundColor: "#fff",
      alignItems: "center",
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 20,
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
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333",
    },
    subtitle: {
      fontSize: 16,
      color: "#666",
      marginBottom: 20,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    gridItem: {
      width: "40%",
      margin: 10,
      alignItems: "center",
    },
    gridImage: {
      width: 80,
      height: 80,
      marginBottom: 10,
    },
    gridText: {
      textAlign: "center",
      fontSize: 14,
      color: "#333",
    },
  });