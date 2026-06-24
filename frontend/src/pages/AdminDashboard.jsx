import Sidebar from '../components/common/Sidebar'
import Navbar from '../components/common/Navbar'
import StatsCards from '../components/common/StatsCards'
import ReportsTable from '../components/reports/ReportsTable'
import UrbanRiskIndicator from '../components/common/UrbanRiskIndicator'

export default function AdminDashboard() {
  return (
    <div className="flex flex-row-reverse h-screen overflow-hidden relative">

      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="p-6 flex flex-col gap-6 flex-1 overflow-auto">
          <StatsCards />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
            <div className="col-span-2 flex flex-col">
              <ReportsTable />
            </div>
            <div className="flex flex-col">
              <UrbanRiskIndicator />
            </div>
          </div>

        </main>
      </div>

    </div>
  )
}