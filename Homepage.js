import React from "react";
import {View, Text, Textinput, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';

const HomePage = () => {
    return (
        <Scrollview style={StyleSheet.container}>
           <view style={style.header}>
             <Image> source={require('./Logo.png')}
                     style={Styles.logo}
             </Image>
             <Text style={styles.title}> NILADHARIYA SRI LANKA </Text>
             <Text style={styles.subtitle}>One Click. Save your Time </Text>
        </view>
        </Scrollview>
    )
}