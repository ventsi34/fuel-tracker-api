const express = require('express');
const {
  getTripsByVehicle,
  getTripByVehicle,
  createTrip,
  updateTrip,
  deleteTrip
} = require('../controllers/trips');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getTripsByVehicle)
  .post(createTrip);

router
  .route('/:tripId')
  .get(getTripByVehicle)
  .put(updateTrip)
  .delete(deleteTrip);

module.exports = router;
