import { useState } from 'react'
import BarChartIcon from '@mui/icons-material/BarChart'
import ArticleIcon from '@mui/icons-material/Article'
import MapIcon from '@mui/icons-material/Map'
import GroupsIcon from '@mui/icons-material/Groups'
import SettingsIcon from '@mui/icons-material/Settings'

const navItems = [
  { icon: <BarChartIcon />, label: 'نظرة عامة', path: '/' },
  { icon: <ArticleIcon />,  label: 'إدارة البلاغات', badge: 13, path: '/reports' },
  { icon: <MapIcon />,      label: 'الخريطة الحية', path: '/map' },
  { icon: <GroupsIcon />,   label: 'فرق العمل', path: '/teams' },
  { icon: <SettingsIcon />, label: 'الإعدادات', path: '/settings' },
]

export default function Sidebar() {
  const [active, setActive] = useState('/')

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-screen shrink-0">

      {/* Logo */}
      <div className="p-5 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg text-white"
            style={{ backgroundColor: 'var(--color-primary)' }}>
            C
          </div>
          <div>
            <div className="font-bold text-sm">نبض المدينة</div>
            <div className="text-xs text-gray-400">لوحة القيادة</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <div
            key={item.path}
            onClick={() => setActive(item.path)}
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all
              ${active === item.path
                ? 'text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            style={active === item.path ? { backgroundColor: 'var(--color-primary)' } : {}}
          >
            <div className="flex items-center gap-3 text-sm">
              {item.icon}
              {item.label}
            </div>
            {item.badge && (
              <span className="text-white text-xs rounded-full px-2 py-0.5"
                style={{ backgroundColor: 'var(--color-primary-dark)' }}>
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-gray-700">
        <div className="text-sm font-semibold text-white">م. خالد حسن</div>
        <div className="text-xs text-gray-400">مدير غرفة العمليات</div>
      </div>

    </div>
  )
}