import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
  const location = useLocation();
    const handleNavClick = (sectionId) => {
    setIsOpen(false);
    
    
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }
    
  
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <nav dir="rtl" className=" fixed top-0 right-0 left-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary-dark rounded-lg flex items-center justify-center text-white font-black text-lg">
            CP
          </div>
          <div className="leading-tight">
            <span className="font-black text-primary-darker text-lg block leading-none">CityPulse</span>
            <span className="text-[10px] text-slate-400 tracking-wider">محافظة القليوبية</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
           <button 
          onClick={() => handleNavClick('features')}
          className="text-sm font-bold text-slate-600 hover:text-primary-dark transition-colors cursor-pointer"
        >          المميزات
        </button>
         <button 
          onClick={() => handleNavClick('testimonials')}
          className="text-sm font-bold text-slate-600 hover:text-primary-dark transition-colors cursor-pointer"
        >
          آراء المواطنين
        </button>
          <Link to="/faq" className="text-sm font-bold text-slate-600 hover:text-primary-dark transition-colors">
            الأسئلة الشائعة
          </Link>
          <Link to="/contact" className="text-sm font-bold text-slate-600 hover:text-primary-dark transition-colors">
            تواصل معنا
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="px-5 py-2 text-sm font-bold text-primary-dark border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors">
            تسجيل الدخول
          </Link>
          <Link to="/register" className="px-5 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors shadow-sm">
            ابدأ الآن
          </Link>
        </div>

        <button className="md:hidden text-slate-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3">
           <button 
            onClick={() => handleNavClick('features')}
            className="block text-sm font-bold text-slate-700 py-1 w-full text-right"
          >
            المميزات
          </button>
           <button 
            onClick={() => handleNavClick('testimonials')}
            className="block text-sm font-bold text-slate-700 py-1 w-full text-right"
          >
            آراء المواطنين
          </button>
          <Link to="/faq" onClick={() => setIsOpen(false)} className="block text-sm font-bold text-slate-700 py-1">
            الأسئلة الشائعة
          </Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-sm font-bold text-slate-700 py-1">
            تواصل معنا
          </Link>
          <div className="flex gap-3 pt-2">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex-1 text-center py-2 text-sm font-bold text-primary-dark border border-primary/30 rounded-lg"
            >
              تسجيل الدخول
            </Link>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="flex-1 text-center py-2 text-sm font-bold text-white bg-primary rounded-lg"
            >
              ابدأ الآن
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;