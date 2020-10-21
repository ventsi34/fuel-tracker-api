const express = require('express');
// Models
const Vehicle = require('../models/Vehicle');
const Trip = require('../models/Trip');
// Middleware 
const paramsChecker = require('../middleware/checkUrlParams');
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

const paramsCheckerConfig = {
  vehicleId: Vehicle
};

router
  .route('/')
  .get(paramsChecker(paramsCheckerConfig), urlFilter(Trip), getTripsByVehicle, responseDecorator(Trip))
  .post(protect, paramsChecker(paramsCheckerConfig), createTrip);

router
  .route('/:tripId')
  .get(paramsChecker(paramsCheckerConfig), getTripByVehicle)
  .put(protect, paramsChecker(paramsCheckerConfig), updateTrip)
  .delete(protect, paramsChecker(paramsCheckerConfig), deleteTrip);

module.exports = router;
