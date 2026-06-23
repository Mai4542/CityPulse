const Report = require('../models/Report');


const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371000;
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

const PROXIMITY_THRESHOLD_METERS = 100; 


const clusterNearbyReports = async () => {
  const reports = await Report.find({
    status: { $ne: 'Closed' },
    'location.lat': { $exists: true },
    'location.lng': { $exists: true },
  }).sort({ createdAt: 1 }); 

  const processedIds = new Set();
  const clusters = [];

  for (let i = 0; i < reports.length; i++) {
    const baseReport = reports[i];


    if (processedIds.has(baseReport._id.toString())) continue;

    const similarReports = [];

    for (let j = i + 1; j < reports.length; j++) {
      const candidate = reports[j];

      if (processedIds.has(candidate._id.toString())) continue;
      if (candidate.category !== baseReport.category) continue;

      const distance = calculateDistance(
        baseReport.location.lat,
        baseReport.location.lng,
        candidate.location.lat,
        candidate.location.lng
      );

      if (distance <= PROXIMITY_THRESHOLD_METERS) {
        similarReports.push(candidate);
        processedIds.add(candidate._id.toString());
      }
    }

    
    if (similarReports.length > 0) {
      baseReport.reportsCount = 1 + similarReports.length;

     
      const calculatePriority = require('../utils/priorityScore');
      baseReport.priorityScore = calculatePriority(baseReport);

      await baseReport.save();

      clusters.push({
        baseReportId: baseReport._id,
        baseReportNumber: baseReport.reportNumber,
        mergedCount: similarReports.length,
        mergedReportNumbers: similarReports.map((r) => r.reportNumber),
        newReportsCount: baseReport.reportsCount,
      });

      processedIds.add(baseReport._id.toString());
    }
  }

  return {
    clustersFound: clusters.length,
    clusters,
  };
};

module.exports = { clusterNearbyReports, calculateDistance };