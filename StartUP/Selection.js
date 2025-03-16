import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '../Required/GradientBackground';

const { width, height } = Dimensions.get('window');

export default function Screen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <GradientBackground />
            <View>
                <Image 
                    source={require('../assets/Logo.png')} 
                />
            </View>

        </SafeAreaView>

    );
}  

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
});