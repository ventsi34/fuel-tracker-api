const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// @desc      Create new account
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  sendTokenResponse(user, 201, res);
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return next(new ErrorResponse(`Please provide an email and password`, 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if(!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc      Logout user
// @route     GET /api/v1/auth/logout
// @access    Public
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Reset account password
// @route     POST /api/v1/auth/reset-password
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getJWTtoken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production' && process.env.HTTPS_REQUESTS === 'true') {
    options.secure = true;
  }

  return res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
    });
};
