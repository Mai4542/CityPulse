const Report = require('../models/Report');
const AppError = require('../utils/AppError');

const getRiskLevel = (riskIndex) => {
  if (riskIndex >= 80) return { label: 'حرج جداً', color: '#DC2626', fillOpacity: 0.6 };
  if (riskIndex >= 60) return { label: 'مرتفع', color: '#D97706', fillOpacity: 0.5 };
  if (riskIndex >= 40) return { label: 'متوسط', color: '#EAB308', fillOpacity: 0.4 };
  if (riskIndex >= 20) return { label: 'منخفض', color: '#16A34A', fillOpacity: 0.3 };
  return { label: 'آمن', color: '#0d9488', fillOpacity: 0.2 };
};

exports.getHeatmapData = async (req, res, next) => {
  try {
    const { timeRange } = req.query;
    
    let dateFilter = {};
    const now = new Date();
    
    if (timeRange === '24h') {
      dateFilter = { createdAt: { $gte: new Date(now - 24 * 60 * 60 * 1000) } };
    } else if (timeRange === '7d') {
      dateFilter = { createdAt: { $gte: new Date(now - 7 * 24 * 60 * 60 * 1000) } };
    }

    const districts = await Report.distinct('location.district');
    
    const validDistricts = districts.filter(
      (d) => d && d !== 'undefined' && d !== 'null' && d.trim() !== ''
    );

    if (validDistricts.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    const areaData = await Promise.all(
      validDistricts.map(async (district) => {
        const filter = {
          'location.district': district,
          ...dateFilter,
        };

        const reports = await Report.find(filter);
        
        const totalReports = reports.length;
        const openReports = reports.filter(
          (r) => r.status !== 'Closed' && r.status !== 'Fixed'
        ).length;
        
        const closedReports = reports.filter(
          (r) => r.status === 'Closed' || r.status === 'Fixed'
        ).length;
        
        const resolutionRate = totalReports > 0 
          ? Math.round((closedReports / totalReports) * 100) 
          : 0;

        const avgPriorityScore = totalReports > 0
          ? reports.reduce((sum, r) => sum + (r.priorityScore || 0), 0) / totalReports
          : 0;

        let avgResolutionDays = 0;
        if (closedReports.length > 0) {
          const totalDays = closedReports.reduce((sum, r) => {
            const days = (new Date(r.updatedAt) - new Date(r.createdAt)) / (1000 * 60 * 60 * 24);
            return sum + days;
          }, 0);
          avgResolutionDays = Math.round((totalDays / closedReports.length) * 10) / 10;
        }

        const countScore = Math.min(totalReports * 2, 40);
        const priorityScore = (avgPriorityScore / 100) * 30;
        const openRatioScore = totalReports > 0 ? (openReports / totalReports) * 20 : 0;
        const slowResolutionScore = Math.min(avgResolutionDays * 1, 10);

        const riskIndex = Math.min(
          Math.round(countScore + priorityScore + openRatioScore + slowResolutionScore),
          100
        );

        const riskLevel = getRiskLevel(riskIndex);

        return {
          id: district,
          name: district,
          reports: totalReports,
          openReports,
          resolutionRate,
          avgResolutionDays,
          riskIndex,
          risk: riskLevel.label,
          color: riskLevel.color,
          fillOpacity: riskLevel.fillOpacity,
        };
      })
    );

    const sortedData = areaData.sort((a, b) => b.riskIndex - a.riskIndex);

    res.status(200).json({
      success: true,
      count: sortedData.length,
      data: sortedData,
    });
  } catch (error) {
    next(error);
  }
};