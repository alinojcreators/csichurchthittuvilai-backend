// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // Load environment variables

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
