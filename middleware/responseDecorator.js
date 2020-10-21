const { PAGINATION } = require('../utils/constants');

const responseDecorator = (model) => async (req, res, next) => {
  let pagination;
  let paginationParams;

  // Add pagination data if it is needed
  if(req.query.page || req.query.limit) {
    paginationParams = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || PAGINATION.DEFAULT_LIMIT || 20
    };

    // Set default value on wrong params
    if(paginationParams.page < 1) {
      paginationParams.page = 1;
    }

    if(paginationParams.limit < 1) {
      paginationParams = PAGINATION.DEFAULT_LIMIT || 20;
    }
  }

  const totalDocuments = await model.countDocuments(res.queryFilter || {});

  let query = model.find(res.queryFilter || {});

  if (res.querySelect) {
    query = query.select(res.querySelect);
  }

  if (res.querySort) {
    query = query.sort(res.querySort);
  }

  if(paginationParams) {
    const lastPage = Math.ceil(totalDocuments / paginationParams.limit);
    paginationParams.page = paginationParams.page > lastPage ? lastPage : paginationParams.page;

    const startIndex = (paginationParams.page - 1) * paginationParams.limit;

    query.skip(startIndex).limit(paginationParams.limit);

    pagination = {
      lastPage,
      currentPage: paginationParams.page,
      limit: paginationParams.limit
    };

    if(paginationParams.page < lastPage) {
      pagination.nextPage = paginationParams.page + 1;
    }

    if(paginationParams.page > 1) {
      pagination.prevPage = paginationParams.page - 1;
    }
  }

  const data = await query;

  res.status(200).json({
    success: true,
    pagination,
    data
  });
}

module.exports = responseDecorator;
