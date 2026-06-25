const Report = require('../models/Report');


const getRiskLevel = (riskIndex) => {
  if (riskIndex >= 80) return 'عالي جداً';
  if (riskIndex >= 60) return 'عالي';
  if (riskIndex >= 40) return 'متوسط';
  if (riskIndex >= 20) return 'منخفض';
  return 'آمن';
};


const calculateDistrictRisk = async (district) => {
  const reports = await Report.find({ 'location.district': district });

  if (reports.length === 0) {
    return {
      district,
      totalReports: 0,
      openReports: 0,
      avgPriorityScore: 0,
      avgResolutionDays: 0,
      riskIndex: 0,
    };
  }

  const totalReports = reports.length;
  const openReports = reports.filter(
    (r) => r.status !== 'Closed' && r.status !== 'Fixed'
  ).length;

  const avgPriorityScore =
    reports.reduce((sum, r) => sum + (r.priorityScore || 0), 0) / totalReports;

  const closedReports = reports.filter(
    (r) => r.status === 'Closed' || r.status === 'Fixed'
  );

  let avgResolutionDays = 0;
  if (closedReports.length > 0) {
    const totalDays = closedReports.reduce((sum, r) => {
      const days = (new Date(r.updatedAt) - new Date(r.createdAt)) / (1000 * 60 * 60 * 24);
      return sum + days;
    }, 0);
    avgResolutionDays = totalDays / closedReports.length;
  }

  // معادلة حساب المخاطر (من 0 إلى 100)
  const countScore = Math.min(totalReports * 2, 40);
  const priorityScore = (avgPriorityScore / 100) * 30;
  const openRatioScore = (openReports / totalReports) * 20;
  const slowResolutionScore = Math.min(avgResolutionDays * 1, 10);

  const riskIndex = Math.round(
    countScore + priorityScore + openRatioScore + slowResolutionScore
  );

  return {
    district,
    totalReports,
    openReports,
    avgPriorityScore: Math.round(avgPriorityScore),
    avgResolutionDays: Math.round(avgResolutionDays * 10) / 10,
    riskIndex: Math.min(riskIndex, 100), 
  };
};


const calculateAllDistrictsRisk = async () => {

  const districts = await Report.distinct('location.district');

 
  const validDistricts = districts.filter(
    (d) => d && d !== 'undefined' && d !== 'null' && d.trim() !== ''
  );

  if (validDistricts.length === 0) {
    return [];
  }


  const results = await Promise.all(
    validDistricts.map((district) => calculateDistrictRisk(district))
  );


  const formattedResults = results.map((item) => ({
    name: item.district, 
    percent: item.riskIndex,
    level: getRiskLevel(item.riskIndex),
  }));


  return formattedResults.sort((a, b) => b.percent - a.percent);
};

module.exports = {
  calculateDistrictRisk,
  calculateAllDistrictsRisk,
};