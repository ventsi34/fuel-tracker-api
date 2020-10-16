const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { pagination } = require('../utils/pagination');
const Trip = require('../models/Trip');
const Vehicle = require('../models/Vehicle');

// @desc      Get all trips of vehicle
// @route     GET /api/v1/vehicle/:vehicleId/trips
// @access    Private
exports.getTripsByVehicle = asyncHandler(async (req, res, next) => {
  // Initialize pagination
  const paging = await pagination(req, Trip);

  let query = Trip.find({ vehicle: req.query.vehicleId });
  query = paging.queryModerator(query);
  const data = await query;

  const response = paging.responseModerator({
    success: true,
    data
  });

  res.status(200).json(response);
});

// @desc      Get single trip of vehicle
// @route     GET /api/v1/vehicle/:vehicleId/trips/:tripId
// @access    Private
exports.getTripByVehicle = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {
      params: req.params
    }
  });
});

// @desc      Create a trip of vehicle
// @route     POST /api/v1/vehicle/:vehicleId/trips
// @access    Private
exports.createTrip = asyncHandler(async (req, res, next) => {
  req.body.vehicle = req.query.vehicleId;
  const data = await Trip.create(req.body);
  res.status(201).json({ success: true, data });
});

// @desc      Update a trip of vehicle
// @route     PUT /api/v1/vehicle/:vehicleId/trips/:tripId
// @access    Private
exports.updateTrip = asyncHandler(async (req, res, next) => {
  return res.status(200).json({
    success: true,
    data: {
      params: req.params
    }
  });
});

// @desc      Delete a trip of vehicle
// @route     DELETE /api/v1/vehicle/:vehicleId/trips/:tripId
// @access    Private
exports.deleteTrip = asyncHandler(async (req, res, next) => {
  return res.status(200).json({
    success: true,
    data: {
      params: req.params
    }
  });
});
