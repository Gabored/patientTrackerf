const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const verifyToken = require('./src/middleware/verifyToken');
require('dotenv').config();

const appRoutes = require('./src/routes');

const cookieParser = require('cookie-parser');


const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());  // Middleware to parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware to protect routes except for login and root
app.use((req, res, next) => {
    if (req.path !== '/' && req.path !== '/api/login') {
        verifyToken(req, res, next);
    } else {
        next();  // Skip verifyToken if the route is "/" or "/login"
    }
});

// Static files route
app.use(express.static(path.join(__dirname, 'html')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/html', 'log-in.html'));
});

app.get('/dashboard', verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'src/html',  'main.html'));
});

app.use('/api', appRoutes);



// Listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
