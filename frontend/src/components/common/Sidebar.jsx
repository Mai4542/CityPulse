import BarChartIcon from "@mui/icons-material/BarChart";
import ArticleIcon from "@mui/icons-material/Article";
import MapIcon from "@mui/icons-material/Map";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { icon: <BarChartIcon />, label: "نظرة عامة", path: "/admin" },
  { icon: <ArticleIcon />, label: "إدارة البلاغات", badge: 13, path: "/admin/reports" },
  { icon: <MapIcon />, label: "الخريطة الحية", path: "/admin/map" },
  { icon: <GroupsIcon />, label: "فرق العمل", path: "/admin/teams" },
  { icon: <SettingsIcon />, label: "الإعدادات", path: "/admin/settings" },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
 
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

    
      <div
      dir="rtl"
        className={`
          fixed lg:static inset-y-0 right-0 z-30
          bg-gray-900 text-white flex flex-col h-screen shrink-0
          transition-transform duration-300 w-64
          ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
        `}
      >
      
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg text-white shrink-0"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              C
            </div>
            <div>
              <div className="font-bold text-sm whitespace-nowrap">نبض المدينة</div>
              <div className="text-xs text-gray-400 whitespace-nowrap">لوحة القيادة</div>
            </div>
          </div>

       
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition lg:hidden"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <div
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all
                ${
                  location.pathname === item.path
                    ? "text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              style={
                location.pathname === item.path
                  ? { backgroundColor: "var(--color-primary)" }
                  : {}
              }
            >
              <div className="flex items-center gap-3 text-sm">
                <span className="shrink-0">{item.icon}</span>
                <span className="whitespace-nowrap">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className="text-white text-xs rounded-full px-2 py-0.5 shrink-0"
                  style={{ backgroundColor: "var(--color-primary-dark)" }}
                >
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-gray-700">
          <div className="text-sm font-semibold text-white whitespace-nowrap">م. خالد حسن</div>
          <div className="text-xs text-gray-400 whitespace-nowrap">مدير غرفة العمليات</div>
        </div>
      </div>
    </>
  );
}