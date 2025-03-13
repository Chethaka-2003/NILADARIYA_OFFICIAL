import { io } from 'socket.io-client';

// Connect to the backend server
const socket = io('http://192.168.8.124:5000'); // Use your backend IP in real devices

export const sendMessage = (message) => {
  socket.emit('sendMessage', message);
};

export const listenForMessages = (callback) => {
  socket.on('receiveMessage', (message) => {
    callback(message);
  });
};

export default socket;
