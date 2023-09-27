

import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbmessages.js';

// Create an Express application
const app = express();
const port = process.env.PORT || 9000;
const connection_url = "mongodb+srv://user123:user123@projects.xfmdcao.mongodb.net/Whatsapp-backend?retryWrites=true&w=majority";

// Middleware to parse JSON requests
app.use(express.json());

// Connect to the MongoDB database
(async () => {
    try {
        await mongoose.connect(connection_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
})();

// Define a GET route for the root URL
app.get('/', (req, res) => res.status(200).send('Hello world'));


// Define a GET route for getting all messages
app.get('/messages/sync', async (req, res) => {
    try {
        const data = await Messages.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Define a POST route for creating messages
app.post('/messages/new', async (req, res) => {
    try {
        const dbMessage = req.body;
        const createdMessage = await Messages.create(dbMessage);
        res.status(201).json(createdMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
});

