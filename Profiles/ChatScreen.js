import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const flatListRef = useRef(null);

  // Send a message
  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { text: message, type: 'text', sender: 'user', timestamp: new Date() };
      setMessages((prev) => [...prev, newMessage]);
      setMessage('');
      scrollToBottom();
      setTimeout(() => receiveMessage('This is a received message'), 1000);
    }
  };

  // Receive a message
  const receiveMessage = (text) => {
    const receivedMessage = { text, type: 'text', sender: 'other', timestamp: new Date() };
    setMessages((prev) => [...prev, receivedMessage]);
    scrollToBottom();
  };

  // Scroll to the latest message
  const scrollToBottom = () => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <View style={styles.container}>

        {/* Back button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#1E90FF" />
        </TouchableOpacity>

        <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.otherMessage]}>
                    {item.type === 'text' ? (
                        <Text style={styles.messageText}>{item.text}</Text>
                    ) : null}
                    <Text style={styles.timestamp}>{item.timestamp.toLocaleTimeString()}</Text>
                </View>
            )}
        />
      
        <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.uploadButton}>
                <Ionicons name="attach" size={24} color="#1E90FF" />
            </TouchableOpacity>
            <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message"
                style={styles.input}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#E0F7FA',
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '80%',
        padding: 10,
        borderRadius: 20,
        marginVertical: 5,
    },
    userMessage: {
        backgroundColor: '#87CEFA',
        alignSelf: 'flex-end',
    },
    otherMessage: {
        backgroundColor: '#B0E0E6',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
        color: '#333',
    },
    timestamp: {
        fontSize: 12,
        color: '#666',
        marginLeft: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        backgroundColor: '#B0E0E6',
    },
    uploadButton: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
        backgroundColor: '#E0FFFF',
    },
    sendButton: {
        backgroundColor: '#1E90FF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ChatScreen;