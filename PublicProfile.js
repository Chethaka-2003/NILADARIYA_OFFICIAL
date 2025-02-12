import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Modal
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';

const PublicProfile = () => {
    const [isSwitchOn, setSwitchOn] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleSwitch = () => setSwitchOn(!isSwitchOn);
    const toggleModal = () => setModalVisible(!isModalVisible);

    return (
        <ImageBackground
            source={require('./assets/background2.jpg')} 
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconLeft}>
                        <Icon name="arrow-back" size={24} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Icon name="list" size={20} color="black" />
                        <Text style={styles.buttonText}>Activity</Text>
                        <Icon name="chevron-right" size={20} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.accessSection}>
                    <Text style={styles.sectionTitle}>Access</Text>
                    <TouchableOpacity style={styles.managePrivacyButton}>
                        <Text style={styles.managePrivacyText}>Manage Privacy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.logoutText}>LOG OUT</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomNavigation}>
                    <TouchableOpacity>
                        <Icon name="home" size={28} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="person" size={28} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="settings" size={28} color="black" />
                    </TouchableOpacity>
                </View>

                <Modal visible={isModalVisible} animationType="slide" transparent>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                                <Icon name="close" size={24} color="black" />
                            </TouchableOpacity>

                            <View style={styles.profileImageContainer}>
                                <View style={styles.profileImageCircle}>
                                    <Icon name="person" size={40} color="black" />
                                </View>
                            </View>

                            <Text style={styles.inputLabel}>Name In Full</Text>
                            <TextInput style={styles.input} value="Savini Perera" />

                            <Text style={styles.inputLabel}>Contact Number</Text>
                            <TextInput style={styles.input} value="+94 76 9997498" />

                            <Text style={styles.inputLabel}>Email Address</Text>
                            <TextInput style={styles.input} value="savini@gmail.com" />

                            <Text style={styles.inputLabel}>District</Text>
                            <TextInput style={styles.input} value="Puttalam" />

                            <TouchableOpacity style={styles.saveButton}>
                                <Text style={styles.saveButtonText}>Save Changes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        paddingInline: 110,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        paddingVertical: 10,
    },
    iconLeft: {
        position: 'absolute',
        right: 220,
        transform: [{ translateY: -120 }], 
    },
    iconRight: {
        position: 'absolute',
        left: 220,
        transform: [{ translateY: -120 }], 
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 200,
        alignContent:'center',
    },
    profileImageContainer: {
        width: 220, 
        height: 220, 
        borderRadius: 110, 
        backgroundColor: 'white', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    profileImageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImageCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f4f4f4',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#333',
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 15,
        fontSize: 16,
        color: '#333',
    },
    saveButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        width: '100%',
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
    },
});

export default PublicProfile;
