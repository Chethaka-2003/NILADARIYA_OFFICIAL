import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Dimensions, Modal, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import Background from '../Required/GradientBackground';
import NavigationBar from '../Required/NavigationBar';
import Background from '../Required/GradientBackground';
import axios from 'axios';
import CustomAlert from '../Alerts/CustomAlert';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const navigation = useNavigation();

    const handleSignIn = () => {
        console.log('Email:', email);
        console.log('Password:', password);

        // Basic form validation
        if (!email || !password) {
            setAlertTitle('ERROR');
            setAlertMessage('Please enter email and password');
            setAlertVisible(true);
            return;

        }
        axios.post('http://192.168.1.136:4000/login', { email, password })
            .then(res => {
                console.log('Response:', res.data);
                if (res.data.status === 'OK') {
                    navigation.navigate(NavigationBar);
                } else {
                    console.log('Error:', res.data.message);
                    setAlertTitle('ERROR');
                    setAlertMessage(res.data.message);
                    setAlertVisible(true);
                }
            })
            .catch(error => {
                console.log('Error:', error);
                setAlertTitle('ERROR');
                setAlertMessage(error.message);
                setAlertVisible(true);
            });

    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Background />
            <View style={styles.container}>
                <Text style={styles.title}>Sign In</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <Button title="Sign In" onPress={handleSignIn} />

                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.row}>
                    <Text style={styles.rowLabel}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Forgot Password Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            {/* Close Button */}
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                                <FeatherIcon name="x-circle" size={30} color="black" />
                            </TouchableOpacity>

                            <Text style={styles.modalTitle}>Forgot Password</Text>
                            <Text style={styles.modalText}>Please submit feedback, and we'll guide you on how to reset your password.</Text>

                            {/* Submit Button */}
                            <TouchableOpacity onPress={handleSubmitFeedback} style={styles.button}>
                                <Text style={styles.buttonText}>Submit Feedback</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <CustomAlert
                        visible={alertVisible}
                        title={alertTitle}
                        message={alertMessage}
                        onClose={() => setAlertVisible(false)}
                    />
                    
                </Modal>

                <View style={styles.registerLink}>
                    <Text>Don't have an account? </Text>
                    <Text style={styles.linkText}>Sign up</Text>
                </View>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: width * 0.05,
    },
    title: {
        fontSize: width * 0.08,
        marginBottom: height * 0.05,
    },
    input: {
        width: width * 0.8,
        padding: width * 0.04,
        marginBottom: height * 0.03,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    rowLabel: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    row: {
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
    },
    modalText: {
        marginBottom: 15,
        fontSize: 18,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        borderRadius: 100,
    },
    registerLink: {
        marginTop: height * 0.03,
        flexDirection: 'row',
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default SignInPage;
