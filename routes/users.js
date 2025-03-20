const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../utils/utils');

app.post('/users', (req, res) => {
    // For demo purposes - replace with actual user authentication
    const user = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com'
    };

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});