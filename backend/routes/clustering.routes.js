const express = require('express');
const router = express.Router();
const clusteringController = require('../controllers/clustering.controller');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.post('/run', protect, restrictTo('admin'), clusteringController.runClustering);

module.exports = router;