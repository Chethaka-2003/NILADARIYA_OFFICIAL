import React, {useState} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    ImageBackground,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';

const PublicProfile = () => {
    const [fullName, setFullName] = useState ('Savini Perera');
    const [email, setEmail] = useState ('savini@gmail.com');
    const [password, setPassword] = useState ('********');
    const [location, setLocation] = useState ('Wennapuwa, Sri lanka');
    const ProfileImage = require('./assets/ProfileImage.jpeg');

    return(
    
        <ImageBackground
            source={require('./assets/background.jpg')}
            style={styles.background}>
           
            <View style={styles.container}> 

            <View style={styles.background}>
                {/* Your existing UI code here */}
            </View>

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

                <View style={styles.formFieldContainer}>
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
                    secureTextEntry={true}
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
        </ImageBackground>    
    );
};

const styles = StyleSheet.create({

    background: {
        flex: 1,
        resizeMode: 'cover',
    },

    container: {
        flex:1,
        paddingInline:110,
        fontSize:50,
        alignItems:'center',
        justifyContent:'center',
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 200,
        alignContent:'center',

    },
    profileImageContainer: {
        justifyContent: 'center',
        flex: 1,
        marginBottom:200,
    },
    profileImage: {
        width:200,
        height:200,
        borderRadius:100,
        alignItems:'center',
    },
    editIcon: {
        position: 'absolute',
        bottom:-75,
        right:10,
        backgroundColor:'green',
        padding:5,
        borderRadius:50,
    },
    inputContainer: {
        marginBottom:30,
    },
    formFieldContainer: {
        alignSelf: 'stretch', 
        marginBottom: 15, 
    },
    label: {
        fontSize:16,
        marginBottom:5,
        color:'white',
        alignSelf:'flex-start',
        textAlign: 'left',
    },
    input: {
        borderWidth:1,
        borderColor:'white',
        borderRadius:8,
        padding:10,
        marginBottom:15,
        fontSize: 16,
        width: '100%', 
        textAlign: 'left',
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
        minHeight: 40,
    },
    saveButton: {
        flex:1,
        marginRight:10,
        backgroundColor:'green',
        padding:15,
        borderRadius:8,
        minWidth: 50, 
        minHeight: 40,
    },
    buttonText: {
        color:'white',
        textAlign:'center',
        fontWeight:'bold',
    },
});

export default PublicProfile;