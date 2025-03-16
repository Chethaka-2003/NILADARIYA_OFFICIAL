import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

const LiveChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello! How can I help you today?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Support",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1, // The current user (you)
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LiveChatScreen;
