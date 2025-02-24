const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongodb = require('../rent');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();
const usersCollection = mongodb.collection('users');

// Register
router.post('/register', async (req, res) => {
    const { fullName, email, username, password } = req.body;

    if (!fullName || !email || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await usersCollection.insertOne({ fullName, email, username, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await usersCollection.findOne({ username });

    if (!user) return res.status(400).json({ message: 'User not found' });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Profile (Protected)
const authenticate = require('../middleware/authMiddleware');

router.get('/my-profile', authenticate, async (req, res) => {
    const user = await usersCollection.findOne({ username: req.user.username }, { projection: { password: 0 } });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

module.exports = router;
