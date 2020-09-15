// @desc      Get all vehicles
// @route     GET /api/v1/vehicles
// @access    Public
exports.getVehicles = (req, res, next) => {
  res.json({ msg: 'List all vehicles in the system' });
};

// @desc      Get single vehicle
// @route     GET /api/v1/vehicles/:id
// @access    Public
exports.getVehicle = (req, res, next) => {
  res.json({ msg: 'Get single vehicle' });
};

// @desc      Add new vehicle
// @route     POST /api/v1/vehicles
// @access    Private
exports.createVehicle = (req, res, next) => {
  res.json({ msg: 'Create vehicle' });
};

// @desc      Update existing vehicle
// @route     PUT /api/v1/vehicles/:id
// @access    Private
exports.updateVehicle = (req, res, next) => {
  res.json({ msg: 'Update vehicle' });
};

// @desc      DELETE vehicle
// @route     DELETE /api/v1/vehicles/:id
// @access    Private
exports.deleteVehicle = (req, res, next) => {
  res.json({ msg: 'Delete vehicle' });
};
