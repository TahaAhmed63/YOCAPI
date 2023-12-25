const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const user = await User.findOne({ email });

        if (user) {
            // Compare the provided password with the stored hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                // Calculate expiration time (in seconds)
                const expiresIn = 24 * 60 * 60; // 24 hours

                // Generate a JWT token with the expiration time
                const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn });

                return res.json({ message: 'Login successful!', token, expiresIn });
            } else {
                return res.status(401).json({ error: 'Invalid email or password.' });
            }
        } else {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'email and password are required.' });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'email is already taken.' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashedPassword });
        const savedUser = await newUser.save();

        const token = jwt.sign({ email: savedUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({ message: 'Signup successful!', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
