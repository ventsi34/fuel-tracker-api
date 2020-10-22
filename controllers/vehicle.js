const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Vehicle = require('../models/Vehicle');

// @desc      Get all vehicle for current user
// @route     GET /api/v1/vehicles
// @access    Private
exports.getUserVehicle = (req, res, next) => {
  res.queryFilter = {
    ...res.queryFilter,
    user: req.user.id
  };

  next();
};

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
  req.body.user = req.user.id;
  const vehicle = await Vehicle.create(req.body);
  res.status(201).json({ success: true, data: vehicle });
});

// @desc      Update existing vehicle
// @route     PUT /api/v1/vehicles/:id
// @access    Private
exports.updateVehicle = asyncHandler(async (req, res, next) => {
  const data = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if(!data) {
    return next(new ErrorResponse(`Vehicle with id of ${req.params.id} can not be updated`, 400));
  }

  res.status(200).json({ success: true, data });
});

// @desc      DELETE vehicle
// @route     DELETE /api/v1/vehicles/:id
// @access    Private
exports.deleteVehicle = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if(!vehicle) {
    return next(new ErrorResponse(`Vehicle with id of ${req.params.id} can not be deleted`, 400));
  }

  await vehicle.remove();

  res.status(200).json({ success: true, data: {} });
});
