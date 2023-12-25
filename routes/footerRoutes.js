const express = require('express');
const   router = express.Router();
const Footer =require('./../models/FooterItem')
const authenticateToken = require('../middleware/authenticateToken'); 

router.get('/mainfooter', async (req, res) => {
    try {
        const footertems = await Footer.find();
        res.json(footertems);
    } catch (error) {
        console.error('Error fetching main menu items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/mainfooter', async (req, res) => {
    try {
        console.log('Received data:', req.body); // Log the received data

        const { phone, email, location, newsletter, footermenuname,quickLinks, Socailmedialink} = req.body;
        const { head, para } = newsletter; 
      
     const {  facebook,
        twitter,
        instagram,
        pintrest}=Socailmedialink

        const newFooter = new Footer({
            phone,
            email,
            location,
            newsletter: {
                head,
                para,
            },
            Socailmedialink: {
                facebook,
                twitter,
                instagram,
                pintrest,
            },
            footermenuname: footermenuname,
            quickLinks: quickLinks,
        });

        const savedFooter = await newFooter.save();
        
        // Send the saved data in the response
        res.json(savedFooter);
    } catch (error) {
        console.error('Error creating footer:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});
router.put('/mainfooter/:id', async (req, res) => {
    try {
        const { phone, email, location, newsletter, footermenuname, quickLinks, Socailmedialink} = req.body;
        const { head, para } = newsletter; 
        const {  facebook,
            twitter,
            instagram,
            pintrest}=Socailmedialink
        const updatedFooter = await Footer.findByIdAndUpdate(
            req.params.id,
            {
                phone,
                email,
                location,
                newsletter: {
                    head,
                    para,
                },
                Socailmedialink: {
                    facebook,
                    twitter,
                    instagram,
                    pintrest,
                },
                footermenuname: footermenuname,
                quickLinks: quickLinks,
            }
        );
        res.json(updatedFooter);
    } catch (error) {
        console.error('Error updating main menu item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a main menu item with subitems
router.delete('/mainfooter/:id', async (req, res) => {
    try {
        const deletedFooterData = await Footer.findByIdAndDelete(req.params.id);
        res.json(deletedFooterData);
    } catch (error) {
        console.error('Error deleting main menu item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router;

