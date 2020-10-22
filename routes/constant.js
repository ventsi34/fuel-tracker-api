const express = require('express');
// Controller methods
const { getConstantList } = require('../controllers/constant');

const router = express.Router();

router.route('/').get(getConstantList);

module.exports = router;
