const express = require('express');
const { createServer } = require('http');
const router = require('./routes/index.js');
require('dotenv').config();

const app = express();
const httpServer = createServer(app);

app.use('/api', router);



module.exports = httpServer;