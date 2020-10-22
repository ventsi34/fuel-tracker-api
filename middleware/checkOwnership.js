const ErrorResponse = require('../utils/errorResponse');

const checkOwnership = (rules) => (req, res, next) => {
  const requests = [];

  Object.entries(rules).forEach(async ([field, model]) => {
    requests.push(model.findById(req.params[field]));
  });

  Promise.all(requests).then((responses) => {
    const res = responses.find(response => response.user.toString() !== req.user.id);

    if(res) {
      return next(new ErrorResponse(`You can not reach this route!`, 403));
    }

    next();
  });
};

module.exports = checkOwnership;
