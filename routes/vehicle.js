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

// Define subroutes
router.use('/:vehicleId/trips', trips);

router
  .route('/')
  .get(getVehicles)
  .post(createVehicle);

router
  .route('/:id')
  .get(getVehicle)
  .put(updateVehicle)
  .delete(deleteVehicle);

module.exports = router;
