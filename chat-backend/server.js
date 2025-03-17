const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: './.env' });

// Create an Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongouri = process.env.MONGO_URI;
mongoose.connect(mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// Define a message schema and model
const messageSchema = new mongoose.Schema({
  text: String,
  sender: String,
  timestamp: { type: Date, default: Date.now },
},{
  collection: 'message'
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

