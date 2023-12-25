// models/menuItem.js
const mongoose = require('mongoose');

const mainMenuItemSchema = new mongoose.Schema({
    label: { type: String, required: true },
    subitems: [{ type: String }], // Change the type to String
});

const MainMenuItem = mongoose.model('MainMenuItem', mainMenuItemSchema);

module.exports = MainMenuItem;
