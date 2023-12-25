const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  newsletter: {
    head: {
      type: String,
      required: true,
    },
    para: {
      type: String,
      required: true,
    },
  },
  Socailmedialink: {
    facebook: {
      type: String,
      required: true,
    },
    twitter: {
      type: String,
      required: true,
    },
    instagram: {
      type: String,
      required: true,
    },
    pintrest: {
      type: String,
      required: true,
    },
  },
  footermenuname: [
    {
 
        type: String,
        required: true,
      },

  ],
  quickLinks: [
    {
      type: String,  // Change this to String if quickLinks is an array of strings
      required: true,
    },
  ],
});

const Footer = mongoose.model('Footer', footerSchema);

module.exports = Footer;
