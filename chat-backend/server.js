const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a message schema and model
const messageSchema = new mongoose.Schema({
  text: String,
  sender: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');

  // Send all messages to the client
  Message.find().then((messages) => {
    socket.emit('initialMessages', messages);
  });

  // Listen for new messages
  socket.on('sendMessage', (message) => {
    const newMessage = new Message(message);
    newMessage.save().then(() => {
      io.emit('receiveMessage', newMessage);
    });
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});