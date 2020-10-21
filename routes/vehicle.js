const express = require('express');
const {
  getVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle
} = require('../controllers/vehicle');
const trips = require('./trips');

const { protect } = require('../middleware/auth');

// Models
const Vehicle = require('../models/Vehicle');

// Middleware
const urlFilter = require('../middleware/urlFilter');
const responseDecorator = require('../middleware/responseDecorator');

const router = express.Router();

// Define subroutes
router.use('/:vehicleId/trips', trips);

router
  .route('/')
  .get(urlFilter(Vehicle), responseDecorator(Vehicle))
  .post(protect, createVehicle);

router
  .route('/:id')
  .get(urlFilter(Vehicle), getVehicle)
  .put(protect, updateVehicle)
  .delete(protect, deleteVehicle);

module.exports = router;
