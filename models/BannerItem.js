const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  backgroundVideo: { type: String, required: false },
  backgroundImage: { type: String, required: false },
  mainBannerImage: { type: String, required: true },
  bannerText: { type: String, required: true },
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  menuItemName: { type: Array, required: true },
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
