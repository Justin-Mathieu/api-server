// Express Stuff 
const express = require('express');
const server = express();

// Error Handling Imports
const { notFound } = require('./error-handlers/404');
const { error500 } = require('./error-handlers/500');
//Middleware Imports
const { logger } = require('./middleware/logger');
const { validator } = require('./middleware/validator');

//Route Imports
const { carRoutes } = require('./routes/car');
const { driverRoutes } = require('./routes/driver');
const { insuranceRoutes } = require('./routes/insurance');



// Middleware 
server.use(logger);
server.use(validator);

// Routes
server.use(carRoutes);
server.use(driverRoutes);
server.use(insuranceRoutes);


// Error Handling
server.use(error500);
server.use(notFound);

module.exports = {
    server
}