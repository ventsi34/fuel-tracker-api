const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// @desc      Create new account
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  await User.create(req.body);
  res.status(200).json({ success: true });
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});

// @desc      Logout user
// @route     POST /api/v1/auth/logout
// @access    Public
exports.logout = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});

// @desc      Reset account password
// @route     POST /api/v1/auth/reset-password
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});
