require('dotenv').config()
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 2424;
const { authenticateToken } = require('./utils/utils');

// Middleware for parsing JSON bodies
app.use(express.json());

app.post('/login', (req, res) => {
    // For demo purposes - replace with actual user authentication
    const user = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com'
    };

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Protected route example
app.get('/', authenticateToken, (req, res) => {
    try {
        res.json({
            message: 'Hello! Welcome To Atithya Catering App! You are authenticated successfully',
            user: req.user
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something broke!',
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});