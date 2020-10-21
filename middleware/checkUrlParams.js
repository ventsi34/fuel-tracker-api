const ErrorResponse = require('../utils/errorResponse');

const checkUrlParams = (rules) => (req, res, next) => {
  const requests = [];

  Object.entries(rules).forEach(async ([field, model]) => {
    requests.push(model.countDocuments({ _id: req.params[field] }));
  });

  Promise.all(requests).then(data => {
    const result = data.filter(num => num !== 1);
    if(result.length > 0) {
      return next(new ErrorResponse(`Wrong id param in the url`, 404));
    }

    next();
  }).catch(() => {
    return next(new ErrorResponse(`Wrong id param in the url`, 404));
  });
};

module.exports = checkUrlParams;
