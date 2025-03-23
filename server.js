const express = require('express');
const app = express();
 
// Use PORT from environment variables or default to 3000
const PORT = process.env.PORT || 3000;
 
// Sample route
app.get('/', (req, res) => {
    res.send('Express server is running!');
});
 
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});