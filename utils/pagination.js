const { PAGINATION } = require('./constants');
const FIELDS_FOR_REMOVE = ['page', 'limit'];

class Pagination {
  constructor(req, totalDocuments) {
    this.disablePagination = !(req.query.page || req.query.limit);
    this.totalDocuments = totalDocuments;

    //If pagination is not disabled
    if(!this.disablePagination) {
      this.limit = req.query && req.query.limit && parseInt(req.query.limit, 10) || PAGINATION.DEFAULT_LIMIT;
      this.page = req.query && req.query.page && parseInt(req.query.page, 10) || 1;

      this.limit = this.correctMinValue(this.limit, PAGINATION.DEFAULT_LIMIT);
      this.page = this.correctMinValue(this.page);
      this.page = this.correctMaxPageValue(this.page);
    
      this.removePaginationQueryParams(req);
    }
  }

  getLimit() {
    if(this.disablePagination) {
      return null;
    }

    return this.limit;
  }

  getStartItem() {
    if(this.disablePagination) {
      return null;
    }

    return (this.page - 1) * this.limit;
  }

  queryModerator(query) {
    if(this.disablePagination) {
      return query;
    }

    return query
      .skip(this.getStartItem())
      .limit(this.getLimit());
  }

  responseModerator(data) {
    if(this.disablePagination) {
      return data;
    }

    return {
      pagination: this.getResponseData(),
      ...data
    };
  }

  getResponseData() {
    if(this.disablePagination) {
      return null;
    }

    const totalPages = Math.ceil(this.totalDocuments / this.limit);
    const data = {
      limit: this.limit,
      totalPages,
      currentPage: this.page
    };

    if(totalPages > this.page) {
      data.nextPage = this.page + 1;
    }

    if(this.page > 1) {
      data.prevPage = this.page - 1;
    }

    return data;
  }

  correctMinValue(value, correctValue) {
    if(value < 1) {
      return correctValue || 1;
    }

    return value;
  }

  correctMaxPageValue(page) {
    if(page > Math.ceil(this.totalDocuments / this.limit)) {
      return Math.ceil(this.totalDocuments / this.limit);
    }

    return page;
  }

  removePaginationQueryParams(req) {
    FIELDS_FOR_REMOVE.forEach(el => {
      delete req.query[el];
    });
  }
}

exports.pagination = async (req, model) => {
  const totalDocuments = await model.countDocuments();
  return new Pagination(req, totalDocuments);
};
