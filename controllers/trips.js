const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Trip = require('../models/Trip');

// @desc      Get all trips of vehicle
// @route     GET /api/v1/vehicle/:vehicleId/trips
// @access    Public
exports.getTripsByVehicle = asyncHandler(async (req, res, next) => {
  res.queryFilter = {
    ...res.queryFilter,
    vehicle: req.params.vehicleId
  };

  next();
});

// @desc      Get single trip of vehicle
// @route     GET /api/v1/vehicle/:vehicleId/trips/:tripId
// @access    Private
exports.getTripByVehicle = asyncHandler(async (req, res, next) => {
  const data = await Trip.findById(req.params.tripId).populate('vehicle', 'mark model');

  res.status(200).json({ success: true, data });
});

// @desc      Create a trip of vehicle
// @route     POST /api/v1/vehicle/:vehicleId/trips
// @access    Private
exports.createTrip = asyncHandler(async (req, res, next) => {
  req.body.vehicle = req.params.vehicleId;
  req.body.user = req.user.id;
  const data = await Trip.create(req.body);

  res.status(201).json({ success: true, data });
});

// @desc      Update a trip of vehicle
// @route     PUT /api/v1/vehicle/:vehicleId/trips/:tripId
// @access    Private
exports.updateTrip = asyncHandler(async (req, res, next) => {
  const data = await Trip.findByIdAndUpdate(req.params.tripId, req.body, {
    new: true,
    runValidators: true
  });
  
  if(!data) {
    return next(new ErrorResponse(`Trip with id of ${req.params.id} can not be updated`, 400));
  }

  res.status(200).json({ success: true, data });
});

// @desc      Delete a trip of vehicle
// @route     DELETE /api/v1/vehicle/:vehicleId/trips/:tripId
// @access    Private
exports.deleteTrip = asyncHandler(async (req, res, next) => {
  const trip = await Trip.findByIdAndRemove(req.params.tripId);

  if(!trip) {
    return next(new ErrorResponse(`Trip with id of ${req.params.id} can not be deleted`, 400));
  }

  res.status(200).json({ success: true, data: {} });
});
