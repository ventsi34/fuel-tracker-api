const urlFilter = () => async (req, res, next) => {
  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  if(Object.keys(reqQuery).length > 0) {
    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    res.queryFilter = JSON.parse(queryStr);
  }

  // Select Fields
  if (req.query.select) {
    const select = req.query.select.split(',').join(' ');

    res.querySelect = select;
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');

    res.querySort = sortBy;
  }

  next();
};

module.exports = urlFilter;
