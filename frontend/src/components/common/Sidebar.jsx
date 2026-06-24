import { useState } from 'react'
import BarChartIcon from '@mui/icons-material/BarChart'
import ArticleIcon from '@mui/icons-material/Article'
import MapIcon from '@mui/icons-material/Map'
import GroupsIcon from '@mui/icons-material/Groups'
import SettingsIcon from '@mui/icons-material/Settings'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate, useLocation } from 'react-router-dom'

const navItems = [
  { icon: <BarChartIcon />, label: 'نظرة عامة', path: '/admin' },
  { icon: <ArticleIcon />,  label: 'إدارة البلاغات', badge: 13, path: '/admin/reports' },
  { icon: <MapIcon />,      label: 'الخريطة الحية', path: '/admin/map' },
  { icon: <GroupsIcon />,   label: 'فرق العمل', path: '/admin/teams' },
  { icon: <SettingsIcon />, label: 'الإعدادات', path: '/admin/settings' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 right-0 z-30
        bg-gray-900 text-white flex flex-col h-screen shrink-0
        transition-all duration-300
        ${isOpen ? 'w-64' : 'w-16 lg:w-64'}
      `}>

        {/* Logo */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0 lg:opacity-100 lg:w-auto'}`}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg text-white shrink-0"
              style={{ backgroundColor: 'var(--color-primary)' }}>
              C
            </div>
            <div>
              <div className="font-bold text-sm whitespace-nowrap">نبض المدينة</div>
              <div className="text-xs text-gray-400 whitespace-nowrap">لوحة القيادة</div>
            </div>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white transition lg:hidden"
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          {/* Logo icon only on desktop collapsed */}
          <div className={`lg:hidden ${isOpen ? 'hidden' : 'flex'} w-10 h-10 rounded-lg items-center justify-center font-bold text-lg text-white`}
            style={{ backgroundColor: 'var(--color-primary)' }}>
            C
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <div
              key={item.path}
              onClick={() => { navigate(item.path); setIsOpen(false) }}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all
                ${location.pathname === item.path
                  ? 'text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              style={location.pathname === item.path ? { backgroundColor: 'var(--color-primary)' } : {}}
              title={item.label}
            >
              <div className="flex items-center gap-3 text-sm">
                <span className="shrink-0">{item.icon}</span>
                <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 lg:opacity-100 lg:w-auto'}`}>
                  {item.label}
                </span>
              </div>
              {item.badge && (isOpen || true) && (
                <span className={`text-white text-xs rounded-full px-2 py-0.5 shrink-0 ${isOpen ? 'block' : 'hidden lg:block'}`}
                  style={{ backgroundColor: 'var(--color-primary-dark)' }}>
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-gray-700">
          <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0 lg:opacity-100 lg:w-auto'}`}>
            <div className="text-sm font-semibold text-white whitespace-nowrap">م. خالد حسن</div>
            <div className="text-xs text-gray-400 whitespace-nowrap">مدير غرفة العمليات</div>
          </div>
        </div>

      </div>
    </>
  )
}