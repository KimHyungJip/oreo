const express = require('express');
const { createServer } = require('http');
const app = express();
const httpServer = createServer(app);

module.exports = httpServer;