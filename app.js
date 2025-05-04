const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('node:path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');

// Logger middleware in development
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// API Routes
app.use('/incidents', require('./routes/incidentRoutes'));

// Web Routes for UI
app.get('/', (req, res) => {
  res.render('index', { title: 'HumanChain AI Safety Incident Log' });
});

app.get('/view/:id', (req, res) => {
  res.render('view', { title: 'View Incident', id: req.params.id });
});

// API documentation route
app.get('/api-docs', (req, res) => {
  res.render('api-docs', { title: 'API Documentation' });
});

// Root API route
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to HumanChain AI Safety Incident Log API & Simulation Platform',
    version: '1.0.0'
  });
});

// 404 page
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Error handler
app.use(errorHandler);

module.exports = app;