const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Essential for Unity WebGL iframe embedding, applied ONLY to the spaces directory 
// otherwise COEP blocks Tailwind and Google fonts on the main site.
app.use('/spaces', (req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/spaces', express.static(path.join(__dirname, 'spaces')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const spacesRouter = require('./routes/spaces');
const uploadRouter = require('./routes/upload');

app.use('/api/spaces', spacesRouter);
app.use('/api/upload', uploadRouter);

// Database initialization
require('./db');

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
