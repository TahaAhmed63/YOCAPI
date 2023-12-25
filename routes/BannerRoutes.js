const express = require('express');
const multer = require('multer');
const router = express.Router();
const Banner = require('./../models/BannerItem');
const MainMenuItem = require('../models/menuItems');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set your upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get('/banners', async (req, res) => {
    try {
        const BannerItem = await Banner.find();
        res.json(BannerItem);
    } catch (error) {
        console.error('Error fetching main menu items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Create a new banner with file uploads
router.post('/banners', upload.fields([{ name: 'mainBannerImage', maxCount: 1 }, { name: 'backgroundImage', maxCount: 1 }, { name: 'backgroundVideo', maxCount: 1 }]), async (req, res) => {
  try {


    console.log('req.body:', req.body);
    console.log('req.files:', req.files);
    const menuItemId = req.body.menuItem; // Extract menuItem ID from the request body

    const menuItem = await MainMenuItem.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ error: 'MenuItem not found' });
    }
    const banner = new Banner({
      backgroundVideo: req.files['backgroundVideo'] ? req.files['backgroundVideo'][0].path : undefined,
      backgroundImage: req.files['backgroundImage'] ? req.files['backgroundImage'][0].path : undefined,
      mainBannerImage: req.files['mainBannerImage'][0].path,
      bannerText: req.body.bannerText,
      menuItem: req.body.menuItem,
      menuItemName:menuItem,
    }); 

console.log(banner)
    await banner.save();
    res.status(200).json({ banner, menuItem: menuItem.label });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.put('/banners/:id', upload.fields([
  { name: 'mainBannerImage', maxCount: 1 },
  { name: 'backgroundImage', maxCount: 1 },
  { name: 'backgroundVideo', maxCount: 1 }
]), async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);
    const menuItemId = req.body.menuItem; // Extract menuItem ID from the request body
    const menuItem = await MainMenuItem.findById(menuItemId);
    
    if (!menuItem) {
      return res.status(404).json({ error: 'MenuItem not found' });
    }

    const updateFields = {
      mainBannerImage: req.files['mainBannerImage'] ? req.files['mainBannerImage'][0].path : undefined,
      bannerText: req.body.bannerText,
      menuItem: req.body.menuItem,
      menuItemName:menuItem,
    };

    // Conditionally set backgroundImage and backgroundVideo
    if (req.files['backgroundImage']) {
      updateFields.backgroundImage = req.files['backgroundImage'][0].path;
      // Set backgroundVideo to null if there's a backgroundImage
      updateFields.backgroundVideo = null;
    } else if (req.files['backgroundVideo']) {
      updateFields.backgroundVideo = req.files['backgroundVideo'][0].path;
      // Set backgroundImage to null if there's a backgroundVideo
      updateFields.backgroundImage = null;
    }

    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true } // Return the updated document
    );

    res.status(200).json({ banner });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
  
router.delete('/banners/:id', async (req, res) => {
    try {
        const deleteBannerData = await Banner.findByIdAndDelete(req.params.id);
        res.json(deleteBannerData);
    } catch (error) {
        console.error('Error deleting main menu item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Other CRUD operations remain the same
module.exports = router;