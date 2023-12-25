// routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const MainMenuItem = require('./../models/menuItems');
const authenticateToken = require('../middleware/authenticateToken'); // Import the authentication middleware

router.get('/mainmenu', async (req, res) => {
    try {
        const mainMenuItems = await MainMenuItem.find();
        res.json(mainMenuItems);
    } catch (error) {
        console.error('Error fetching main menu items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.use(authenticateToken);

// Create a new main menu item with subitems
router.post('/mainmenu', async (req, res) => {
    try {
        console.log('Received data:', req.body); // Add this line to log the received data

        const { label, subitems } = req.body;
        const subitemsToSave = Array.isArray(subitems) && subitems.length > 0 ? subitems : undefined;

        const mainMenuItem = new MainMenuItem({ label, subitems: subitemsToSave });
        const savedMainMenu = await mainMenuItem.save();
        res.json(savedMainMenu);
    } catch (error) {
        console.error('Error creating main menu item:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

// Get all main menu items with subitems


// Update a main menu item with subitems
router.put('/mainmenu/:id', async (req, res) => {
    try {
        const { label, subitems } = req.body;
        const updatedMainMenu = await MainMenuItem.findByIdAndUpdate(
            req.params.id,
            { label, subitems },
            { new: true }
        );
        res.json(updatedMainMenu);
    } catch (error) {
        console.error('Error updating main menu item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a main menu item with subitems
router.delete('/mainmenu/:id', async (req, res) => {
    try {
        const deletedMainMenu = await MainMenuItem.findByIdAndDelete(req.params.id);
        res.json(deletedMainMenu);
    } catch (error) {
        console.error('Error deleting main menu item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
