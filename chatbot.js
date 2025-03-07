import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    try {
      const res = await axios.post('http://YOUR_NODE_SERVER_IP:3000/chat', { message });
      setResponse(JSON.stringify(res.data.intent));
    } catch (err) {
      console.error(err);
      setResponse('Error connecting to chatbot.');
    }
  };

  return (
    <View>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message"
      />
      <Button title="Send" onPress={sendMessage} />
      <Text>Response: {response}</Text>
    </View>
  );
};

export default Chatbot;