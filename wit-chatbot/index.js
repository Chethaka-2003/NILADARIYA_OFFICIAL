require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;  // Use the environment variable PORT or fallback to 3000

// Wit.ai API URL and Server Access Token
const WIT_API_URL = 'https://api.wit.ai/message';
const WIT_TOKEN = `Bearer GT6DWZGEZQIOX6EPXGGMTBUFP7E7R7ZK`;   // Store the token in .env for security

app.use(express.json());  // Middleware to parse JSON request bodies

// Endpoint to process messages
app.post('/chat', async (req, res) => {
    const { message } = req.body;  // Get the message from the request body

    if (!message) {
        return res.status(400).json({ error: 'No message provided' });
    }

    try {
        // Send the message to Wit.ai for processing
        const response = await axios.get(WIT_API_URL, {
            headers: { Authorization: WIT_TOKEN },
            params: { q: message }
        });

        // Respond with the extracted entities (intent) and raw response from Wit.ai
        res.json({
            intent: response.data.entities,
            raw: response.data
        });
    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).json({ error: 'Error processing message' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:3000`);
});
