const express = require('express');
const {
  getTripsByVehicle,
  getTripByVehicle,
  createTrip,
  updateTrip,
  deleteTrip
} = require('../controllers/trips');
const router = express.Router();

router
  .route('/')
  .get(getTripsByVehicle)
  .post(createTrip);

router
  .route('/:trip_id')
  .get(getTripByVehicle)
  .put(updateTrip)
  .delete(deleteTrip);

module.exports = router;
