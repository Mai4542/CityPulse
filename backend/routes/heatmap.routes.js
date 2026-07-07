const express = require('express');
const router = express.Router();
const heatmapController = require('../controllers/heatmap.controller');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/data', protect, restrictTo('admin'), heatmapController.getHeatmapData);

module.exports = router;