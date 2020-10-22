const express = require('express');
const {
  getUserVehicle,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle
} = require('../controllers/vehicle');
const trips = require('./trips');

// Models
const Vehicle = require('../models/Vehicle');

// Middleware
const { protect } = require('../middleware/auth');
const paramsChecker = require('../middleware/checkUrlParams');
const checkOwnership = require('../middleware/checkOwnership');
const urlFilter = require('../middleware/urlFilter');
const responseDecorator = require('../middleware/responseDecorator');

const paramsMatcher = {
  id: Vehicle
};

const router = express.Router();

// Define subroutes
router.use('/:vehicleId/trips', trips);

router
  .route('/')
  .get(
    protect,
    urlFilter(Vehicle),
    getUserVehicle,
    responseDecorator(Vehicle)
  )
  .post(protect, createVehicle);

router
  .route('/:id')
  .get(
    paramsChecker(paramsMatcher),
    urlFilter(Vehicle),
    getVehicle
  )
  .put(
    protect,
    paramsChecker(paramsMatcher),
    checkOwnership(paramsMatcher),
    updateVehicle
  )
  .delete(
    protect,
    paramsChecker(paramsMatcher),
    checkOwnership(paramsMatcher),
    deleteVehicle
  );

module.exports = router;
