const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let requests = [];

// Create a new request
app.post('/requests', (req, res) => {
    const request = req.body;
    request.id = requests.length + 1;
    requests.push(request);
    res.status(201).send(request);
});

// Get all requests
app.get('/requests', (req, res) => {
    res.send(requests);
});

// Get a request by ID
app.get('/requests/:id', (req, res) => {
    const request = requests.find(r => r.id === parseInt(req.params.id));
    if (!request) return res.status(404).send('Request not found');
    res.send(request);
});

// Update a request by ID
app.put('/requests/:id', (req, res) => {
    const request = requests.find(r => r.id === parseInt(req.params.id));
    if (!request) return res.status(404).send('Request not found');

    request.name = req.body.name;
    request.description = req.body.description;
    res.send(request);
});

// Delete a request by ID
app.delete('/requests/:id', (req, res) => {
    const requestIndex = requests.findIndex(r => r.id === parseInt(req.params.id));
    if (requestIndex === -1) return res.status(404).send('Request not found');

    const deletedRequest = requests.splice(requestIndex, 1);
    res.send(deletedRequest);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});