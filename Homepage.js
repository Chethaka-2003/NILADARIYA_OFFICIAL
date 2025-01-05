import React from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';

const HomePage = () => {
    return (
        <Scrollview style={StyleSheet.container}>
           <view style={style.header}>
             <Image> source={require('./assets/Logo.png')}
                     style={Styles.logo}
             </Image>
             <TextInput> style= {styles.searchBar}placeholder="Search..." 
                        value={searchQuery} 
                        onChangeText={handleSearch}
             </TextInput>          
             <Text style={styles.title}> NILADHARIYA SRI LANKA </Text>
             <Text style={styles.subtitle}>One Click. Save your Time </Text>
           </view>

           <view style={style.grid}>
              <TouchableOpacity style={styles.gridItem}>
                <Image>source={require('./assets/District.png')}
                    style={styles.gridImage}
                </Image>
                <Text style={styles.gridText}District Secretariat></Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <Image>source={require('./assets/Municipal.png')}
                    style={styles.gridImage}
                </Image>
                <Text style={styles.gridText}Municipal Council></Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <Image>source={require('./assets/Samurdhi.png')}
                    style={styles.gridImage}
                </Image>
                <Text style={styles.gridText}Samurdhi Niladhari></Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <Image>source={require('./assets/electricity.png')}
                    style={styles.gridImage}
                </Image>
                <Text style={styles.gridText}Electricity Board></Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <Image>source={require('./assets/water_board.png')}
                    style={styles.gridImage}
                </Image>
                <Text style={styles.gridText}Water Board></Text>
              </TouchableOpacity>

            </view>


        </Scrollview> 
    )
}