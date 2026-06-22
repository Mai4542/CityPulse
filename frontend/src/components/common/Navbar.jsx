import { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "المميزات", href: "/#features", type: "anchor" },
  { label: "كيف يعمل", href: "/#how-it-works", type: "anchor" },
  { label: "الأسئلة الشائعة", href: "/faq", type: "route" },
  { label: "تواصل معنا", href: "/contact", type: "route" },
];

const linkClass =
  "relative text-sm font-bold text-slate-600 transition-colors duration-300 hover:text-primary-dark after:absolute after:right-0 after:-bottom-2 after:h-[2px] after:w-0 after:rounded-full after:bg-primary-dark after:transition-all after:duration-300 hover:after:w-full";

const mobileLinkClass =
  "relative block w-fit text-sm font-bold text-slate-700 py-1 transition-colors duration-300 hover:text-primary-dark after:absolute after:right-0 after:bottom-0 after:h-[2px] after:w-0 after:rounded-full after:bg-primary-dark after:transition-all after:duration-300 hover:after:w-full";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav
      dir="rtl"
      className="fixed top-0 right-0 left-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary-dark rounded-lg flex items-center justify-center text-white font-black text-lg">
            CP
          </div>

          <div className="leading-tight">
            <span className="font-black text-primary-darker text-lg block leading-none">
              CityPulse
            </span>
            <span className="text-[10px] text-slate-400 tracking-wider">
              محافظة القليوبية
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.type === "route" ? (
              <Link key={link.label} to={link.href} className={linkClass}>
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className={linkClass}>
                {link.label}
              </a>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-5 py-2 text-sm font-bold text-primary-dark border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors"
          >
            تسجيل الدخول
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
          >
            ابدأ الآن
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden text-slate-600"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3">
          {navLinks.map((link) =>
            link.type === "route" ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                {link.label}
              </a>
            )
          )}

          <div className="flex gap-3 pt-2">
            <Link
              to="/login"
              onClick={closeMenu}
              className="flex-1 text-center py-2 text-sm font-bold text-primary-dark border border-primary/30 rounded-lg"
            >
              تسجيل الدخول
            </Link>

            <Link
              to="/register"
              onClick={closeMenu}
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