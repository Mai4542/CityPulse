import { useState } from 'react'
import Sidebar from '../components/common/Sidebar'
import Navbar from '../components/common/Navbar'
import HeatMapComponent from '../components/map/HeatMap'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

const timeFilters = ['آخر 24 ساعة', 'آخر 7 أيام', 'تاريخ مخصص']

export default function HeatMapPage() {
  const [activeFilter, setActiveFilter] = useState('آخر 24 ساعة')

  return (
    <div className="flex flex-row-reverse h-screen overflow-hidden">

      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden mr-16 lg:mr-0">
        <Navbar />

        <main className="p-3 md:p-6 flex flex-col gap-3 md:gap-4 flex-1 overflow-hidden">

          {/* Time Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <CalendarTodayIcon className="text-gray-400 hidden sm:block" fontSize="small" />
            <div className="flex items-center gap-2 flex-wrap">
              {timeFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className="px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition"
                  style={{
                    backgroundColor: activeFilter === filter ? 'var(--color-primary)' : '#f3f4f6',
                    color: activeFilter === filter ? '#ffffff' : '#6b7280',
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 min-h-0 rounded-xl overflow-hidden">
            <HeatMapComponent />
          </div>

        </main>
      </div>

    </div>
  )
}