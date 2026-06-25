import { useState, useEffect, useCallback } from "react";
import { adminAPI } from "../api/api";
import api from "../api/api";

import Sidebar from "../components/common/Sidebar";
import Navbar2 from "../components/common/Navbar2";
import StatsCards from "../components/common/StatsCards";
import ReportsTable from "../components/reports/ReportsTable";
import UrbanRiskIndicator from "../components/common/UrbanRiskIndicator";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [statsData, setStatsData] = useState(null);
  const [reportsData, setReportsData] = useState([]);
  const [riskData, setRiskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchDashboardData = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }
    try {
      const [statsRes, reportsRes, riskRes] = await Promise.all([
        adminAPI.getDashboardStats(),
        adminAPI.getAllReports({ limit: 10 }),
        api.get('/risk-index'),
      ]);

      console.log('=== STATS RESPONSE ===', statsRes);
      
  
      const stats = statsRes.data?.data || statsRes.data || statsRes;
      console.log('=== STATS EXTRACTED ===', stats);
      
      setStatsData({
        totalReports: stats.totalReports || 0,
        pendingReports: stats.openReports || 0,
        resolvedThisWeek: stats.closedReports || 0,
        avgResponseTime: stats.avgResponseTime || 0,
        resolutionRate: stats.completionRate || 0,
      });

 
      const reportsList = reportsRes.data?.data || reportsRes.data || [];
      console.log('=== REPORTS LIST ===', reportsList);
      console.log('=== REPORTS LENGTH ===', reportsList.length);
      
      const sortedReports = Array.isArray(reportsList) 
        ? [...reportsList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];
      
      setReportsData(sortedReports);

      const riskList = riskRes.data?.data || riskRes.data || [];
      setRiskData(
        Array.isArray(riskList) ? riskList.slice(0, 5).map(district => ({
          name: district.name || district.district || 'غير محدد',
          level: getRiskLevel(district.percent || district.riskIndex || 0),
          percent: district.percent || district.riskIndex || 0,
        })) : []
      );

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      console.error("Error response:", error.response?.data);
      setReportsData([]);
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchDashboardData(true);
  }, []);

  const handleStatusUpdate = async (reportId, status, note, assignedTo = null) => {
    try {
      setUpdating(true);
      
      if (status === 'Assigned' && assignedTo) {
        await adminAPI.assignReport(reportId, assignedTo, note);
      } else {
        await adminAPI.updateReportStatus(reportId, status, note);
      }
      
      await fetchDashboardData(false);
      
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-row-reverse h-screen overflow-hidden relative bg-[#F8FAFC]">
      {updating && (
        <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-4 shadow-lg flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
            <span className="text-sm text-gray-700">جاري التحديث...</span>
          </div>
        </div>
      )}
      
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Navbar2 onMenuToggle={() => setIsSidebarOpen((prev) => !prev)} />
        
        <main className="hidden lg:flex flex-col flex-1 h-full overflow-hidden">
          <div className="px-6 py-6 shrink-0">
            <StatsCards data={statsData} />
          </div>
          
          <div className="px-6 pb-6 flex-1 overflow-hidden flex flex-row gap-6">
            <div className="flex-[2] min-w-0 overflow-y-auto">
              <ReportsTable 
                data={reportsData} 
                onStatusUpdate={handleStatusUpdate}
              />
            </div>
            <div className="flex-[1] min-w-0">
              <UrbanRiskIndicator data={riskData} />
            </div>
          </div>
        </main>

        <main className="lg:hidden flex-1 overflow-y-auto">
          <div className="px-6 py-6 flex flex-col gap-6">
            <StatsCards data={statsData} />
            
            <div className="flex flex-col gap-6">
              <ReportsTable 
                data={reportsData}
                onStatusUpdate={handleStatusUpdate}
              />
              <UrbanRiskIndicator data={riskData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function getRiskLevel(riskIndex) {
  if (riskIndex >= 80) return 'عالي جداً';
  if (riskIndex >= 60) return 'عالي';
  if (riskIndex >= 40) return 'متوسط';
  if (riskIndex >= 20) return 'منخفض';
  return 'آمن';
}