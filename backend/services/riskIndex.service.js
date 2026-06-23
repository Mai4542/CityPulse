const Report = require('../models/Report');


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

  const results = await Promise.all(
    districts
      .filter((d) => d && d !== 'undefined' && d !== 'null')
      .map((district) => calculateDistrictRisk(district))
  );

  return results.sort((a, b) => b.riskIndex - a.riskIndex);
};

module.exports = {
  calculateDistrictRisk,
  calculateAllDistrictsRisk,
};