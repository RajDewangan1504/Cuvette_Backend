const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Import the cors package
const config = require('./config');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use(cookieParser()); // Use cookie-parser middleware

// Enable CORS for all origins
app.use(cors()); // This allows all origins to access the API

// Home route
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the API. Navigate to /api/auth for authentication and /api/jobs for job management.');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Database connection and server start
mongoose.connect(config.DB_URI)
    .then(() => {
        app.listen(config.PORT, () => {
            console.log(`Server is running on port ${config.PORT}`);
        });
    })
    .catch((err) => console.error('Database connection error:', err));
