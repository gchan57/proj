const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows your React app to make requests to this server
app.use(express.json()); // Allows the server to accept JSON in the request body

// Connect to MongoDB using the URI from the .env file
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// --- API Routes will be added here later ---
// ... after the mongoose.connect block

// --- API Routes ---
const gigRoutes = require('./routes/gigs');
// You can create auth.js for login/signup routes as well
// const authRoutes = require('./routes/auth');

app.use('/api/gigs', gigRoutes);
// app.use('/api/auth', authRoutes);

// ... app.listen should be the last part
// Basic Route
app.get('/', (req, res) => {
  res.send('GigHub API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});