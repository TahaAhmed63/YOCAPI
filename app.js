// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const footerRoutes = require('./routes/footerRoutes');
const BannerRoutes = require('./routes/BannerRoutes');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 8000;

// Load environment variables from .env file
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods',
   
  'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  
// Middleware to parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); //this line is already mentioned above

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/menu', menuRoutes);
app.use('/footer', footerRoutes);
app.use('/banner', BannerRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});
