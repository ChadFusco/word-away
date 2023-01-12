// REQUIRE STATEMENTS
require('dotenv').config();
const express = require('express');
const path = require('path');
// const axios = require('axios');
const morgan = require('morgan');
const cors = require('cors');
const favicon = require('serve-favicon');
const compression = require('compression');
const Answers = require("./db.js");
// const sessionHandler = require('./session-handler');

const app = express();

// APP-WIDE MIDDLEWARE
app.use(morgan('dev'));

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
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
app.get('/answers/:answerID', (req, res) => {
  const answerID = req.params.answerID;
  Answers.findOne({ answerID: answerID }, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(results);
    }
  })
})

// PORT AND SERVER LISTEN
const PORT = process.env.PORT || 3200;
app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
