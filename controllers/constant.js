const ErrorResponse = require('../utils/errorResponse');
const { MODELS_ENUMS } = require('../utils/constants');

// @desc      Get constants by model or whole list of constants
// @route     GET /api/v1/constants
// @access    Public
exports.getConstantList = (req, res, next) => {
  const { model } = req.query;
  let data = MODELS_ENUMS;

  if(model) {
    const modelName = model.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1_$2').toUpperCase();
    data = MODELS_ENUMS[modelName];
    
    if(!data) {
      return next(new ErrorResponse(`Can not find model with this name!`, 400));
    }
  }

  res.status(200).json({ success: true, data });
};
