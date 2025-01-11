import React, {useState} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';

const PublicProfile = () => {
    const [fullName, setFullName] = useState ('Savini Perera');
    const [email, setEmail] = useState ('savini@gmail.com');
    const [password, setPassword] = useState ('********');
    const [location, setLocation] = useState ('Wennapuwa, Sri lanka');
    const ProfileImage = require('./assets/ProfileImage.jpeg');

    return(
        <View style={styles.container}> 
            <Text style={styles.header}>Edit Profile</Text>

            <View style={styles.profileImageContainer}>
                <Image
                source={ProfileImage}
                style={styles.profileImage}
                />
                <TouchableOpacity style={styles.editIcon}>
                    <Icon name="edit" size={25} color="white"/>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>

                <Text style={styles.label}>Full Name</Text>
                <TextInput
                value={fullName}
                onChangeText={setFullName}
                style={styles.input}
                />

                <Text style={styles.label}>E-mail</Text>
                <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
                />

                <Text style={styles.label}>Location</Text>
                <TextInput
                value={location}
                onChangeText={setLocation}
                style={styles.input}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.buttonText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.buttonText}>SAVE</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:20,
        backgroundColor: 'white',
        alignItems:'center',
        fontSize:50,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    profileImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginBottom:20,
    },
    profileImage: {
        width:200,
        height:200,
        borderRadius:100,
    },
    editIcon: {
        position: 'absolute',
        bottom:100,
        right:10,
        backgroundColor:'green',
        padding:5,
        borderRadius:50,
    },
    inputContainer: {
        marginBottom:30,
    },
    label: {
        fontSize:16,
        marginBottom:5,
        color:'gray',
    },
    input: {
        borderWidth:1,
        borderColor:'gray',
        borderRadius:8,
        padding:10,
        marginBottom:15,
    },
    buttonContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
    },
    cancelButton: {
        flex:1,
        marginRight:10,
        backgroundColor:'gray',
        padding:15,
        borderRadius:8,
        minWidth: 60, 
        minHeight: 50,
    },
    saveButton: {
        flex:1,
        marginRight:10,
        backgroundColor:'green',
        padding:15,
        borderRadius:8,
        minWidth: 50, 
        minHeight: 50,
    },
    buttonText: {
        color:'white',
        textAlign:'center',
        fontWeight:'bold',
    },
});

export default PublicProfile;