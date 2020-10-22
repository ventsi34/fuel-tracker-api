const express = require('express');
// Models
const Vehicle = require('../models/Vehicle');
const Trip = require('../models/Trip');
// Middleware 
const paramsChecker = require('../middleware/checkUrlParams');
const checkOwnership = require('../middleware/checkOwnership');
const urlFilter = require('../middleware/urlFilter');
const responseDecorator = require('../middleware/responseDecorator');
const { protect } = require('../middleware/auth');
// Controller methods
const {
  getTripsByVehicle,
  getTripByVehicle,
  createTrip,
  updateTrip,
  deleteTrip
} = require('../controllers/trips');

const router = express.Router({ mergeParams: true });

const paramsMatcher = {
  vehicleId: Vehicle
};

const paramsMatcherExtended = {
  ...paramsMatcher,
  tripId: Trip
};

router
  .route('/')
  .get(
    paramsChecker(paramsMatcher),
    urlFilter(Trip),
    getTripsByVehicle,
    responseDecorator(Trip)
  )
  .post(
    protect, 
    paramsChecker(paramsMatcher),
    checkOwnership(paramsMatcher),
    createTrip
  );

router
  .route('/:tripId')
  .get(
    paramsChecker(paramsMatcherExtended),
    getTripByVehicle
  )
  .put(
    protect,
    paramsChecker(paramsMatcherExtended),
    checkOwnership(paramsMatcherExtended),
    updateTrip
  )
  .delete(
    protect,
    paramsChecker(paramsMatcherExtended),
    checkOwnership(paramsMatcherExtended),
    deleteTrip
  );

module.exports = router;
