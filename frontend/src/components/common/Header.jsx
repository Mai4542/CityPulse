import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'

export default function Navbar() {
  const [search, setSearch] = useState('')

  return (
    
    <header className="bg-white px-6 py-4 flex items-center gap-5 shadow-sm shrink-0">

      {/* Title */}
      <div className="text-xl font-bold text-gray-800">
        محافظة القليوبية
      </div>

      {/* Search */}
      <div className="relative">
        <SearchIcon className="absolute right-3 top-2.5 text-gray-400" fontSize="small" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث برقم البلاغ، المنطقة..."
          className="bg-gray-100 rounded-lg pr-10 pl-4 py-2 text-sm w-72 outline-none transition"
          onFocus={e => e.target.style.outline = '2px solid var(--color-primary)'}
          onBlur={e => e.target.style.outline = 'none'}
        />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Notifications */}
      <div className="relative cursor-pointer">
        <NotificationsIcon className="text-gray-500" />
        <span
          className="absolute -top-1 -right-1 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-danger)' }}
        >
          ٣
        </span>
      </div>

      {/* Date */}
      <div className="text-sm text-gray-400">
        الثلاثاء، ١٥ مايو ٢٠٢٤
      </div>

    </header>
  )
}