const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { pagination } = require('../utils/pagination');
const Vehicle = require('../models/Vehicle');

// @desc      Get all vehicles
// @route     GET /api/v1/vehicles
// @access    Public
exports.getVehicles = asyncHandler(async (req, res, next) => {
  // Initialize pagination
  const paging = await pagination(req, Vehicle);
  
  let query = Vehicle.find();
  query = paging.queryModerator(query);
  const vehicles = await query;

  const response = paging.responseModerator({
    success: true,
    data: vehicles
  });

  res.status(200).json(response);
});

// @desc      Get single vehicle
// @route     GET /api/v1/vehicles/:id
// @access    Public
exports.getVehicle = asyncHandler(async (req, res, next) => {
    const vehicle = await Vehicle.findById(req.params.id);
    
    if(!vehicle) {
      return next(new ErrorResponse(`Vehicle not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: vehicle });
});

// @desc      Add new vehicle
// @route     POST /api/v1/vehicles
// @access    Private
exports.createVehicle = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.create(req.body);
  res.status(201).json({ success: true, data: vehicle });
});

// @desc      Update existing vehicle
// @route     PUT /api/v1/vehicles/:id
// @access    Private
exports.updateVehicle = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if(!vehicle) {
    return next(new ErrorResponse(`Vehicle with id of ${req.params.id} can not be updated`, 400));
  }

  res.status(200).json({ success: true, data: vehicle });
});

// @desc      DELETE vehicle
// @route     DELETE /api/v1/vehicles/:id
// @access    Private
exports.deleteVehicle = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

  if(!vehicle) {
    return next(new ErrorResponse(`Vehicle with id of ${req.params.id} can not be deleted`, 400));
  }

  res.status(200).json({ success: true, data: {} });
});
