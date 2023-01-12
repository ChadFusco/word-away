// REQUIRE STATEMENTS
require('dotenv').config();
const express = require('express');
const path = require('path');
// const axios = require('axios');
const morgan = require('morgan');
const cors = require('cors');
const favicon = require('serve-favicon');
const compression = require('compression');
// const sessionHandler = require('./session-handler');

const app = express();

// APP-WIDE MIDDLEWARE
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
// app.use(sessionHandler);
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// STATIC SERVICE OF ASSETS
app.use(express.static(path.join(__dirname, '../build')));
app.use(favicon(path.join(__dirname, '../build/favicon.ico')));

// ROUTES

// PORT AND SERVER LISTEN
const PORT = process.env.PORT || 3010;
app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
