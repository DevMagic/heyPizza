const express = require('express');
const routes = require('./routes');
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(routes);

module.exports = server;