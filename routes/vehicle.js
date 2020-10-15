const express = require('express');
const {
  getVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle
} = require('../controllers/vehicle');
const trips = require('./trips');

const router = express.Router();

router
  .route('/')
  .get(getVehicles)
  .post(createVehicle);

router
  .route('/:id')
  .get(getVehicle)
  .put(updateVehicle)
  .delete(deleteVehicle);

// Define subroutes
router.use('/:vehicleId/trips', trips);

module.exports = router;
