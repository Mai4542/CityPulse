const { calculateAllDistrictsRisk, calculateDistrictRisk } = require('../services/riskIndex.service');
const AppError = require('../utils/AppError');

exports.getAllDistrictsRisk = async (req, res, next) => {
  try {
    const results = await calculateAllDistrictsRisk();

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });

  } catch (error) {
    next(error);
  }
};

exports.getDistrictRisk = async (req, res, next) => {
  try {
    const { district } = req.params;

    if (!district) {
      return next(new AppError('اسم المنطقة مطلوب', 400));
    }

    const result = await calculateDistrictRisk(district);

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    next(error);
  }
};