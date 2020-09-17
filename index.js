const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const CONSTS = require('./utils/constants');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config({ path: './config/config.env' });

//Db connection
connectDB();

//Route files
const vehicle = require('./routes/vehicle');

const app = express();

// Body parser
app.use(express.json());

// Dev middlewares
if (process.env.NODE_ENV === CONSTS.ENVS.DEV) {
  app.use(morgan('dev'));
}

//Mount routers
app.use('/api/v1/vehicles', vehicle);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(
  PORT,
  console.log(
    `Fuel Tracker API working on ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

// Handle unhandled rejections
process.on('unhandledRejection', err => {
  console.log(`ERROR: ${err.message}`);
  //Close server and exit process
  server.close(() => process.exit(1));
});
