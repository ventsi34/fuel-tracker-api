const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const CONSTS = require('./util/constants');

//Route files
const vehicle = require('./routes/vehicle');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

// Dev middlewares
if (process.env.NODE_ENV === CONSTS.ENVS.DEV) {
  app.use(morgan('dev'));
}

//Mount routers
app.use('/api/v1/vehicles', vehicle);

const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  console.log(
    `Fuel Tracker API working on ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
