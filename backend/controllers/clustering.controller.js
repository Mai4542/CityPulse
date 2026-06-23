const { clusterNearbyReports } = require('../services/clustering.service');

exports.runClustering = async (req, res, next) => {
  try {
    const result = await clusterNearbyReports();

    res.status(200).json({
      success: true,
      message: `تم العثور على ${result.clustersFound} مجموعة بلاغات متشابهة`,
      data: result.clusters,
    });

  } catch (error) {
    next(error);
  }
};