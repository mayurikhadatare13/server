const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./models/user');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 1307;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.log('❌ MongoDB error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'login.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'login.html'));
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await user.findOne({ username, password });

  if (foundUser) {
    res.send(`<h2>Welcome, ${foundUser.username}!</h2>`);
  } else {
    res.send('<h2>Invalid credentials</h2>');
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
