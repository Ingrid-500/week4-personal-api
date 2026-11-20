const express = require('express');
const requestLogger = require('./middleware/requestLogger');
const aboutRoutes = require('./routes/aboutRoutes');
const skillRoutes = require('./routes/skillRoutes');
const contactRoutes = require('./routes/contactRoutes');
const searchRoutes = require('./routes/searchRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandlers');

const app = express();

// Middleware order matters: parse JSON before routes that read req.body.
app.use(requestLogger);
app.use(express.json({ limit: '10kb' }));

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Personal Information API.',
    endpoints: {
      about: 'GET /about',
      skills: 'GET /skills',
      skillById: 'GET /skills/:id',
      contact: 'POST /contact',
      search: 'GET /search?q=keyword'
    }
  });
});

app.use('/about', aboutRoutes);
app.use('/skills', skillRoutes);
app.use('/contact', contactRoutes);
app.use('/search', searchRoutes);

// Keep these handlers after every route so unmatched paths and errors return JSON.
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
