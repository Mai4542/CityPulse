const express = require('express');
const router = express.Router();
const riskController = require('../controllers/riskIndex.controller');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/', protect, restrictTo('admin'), riskController.getAllDistrictsRisk);
router.get('/:district', protect, restrictTo('admin'), riskController.getDistrictRisk);

module.exports = router;