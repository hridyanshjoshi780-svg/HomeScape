// import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, X } from "lucide-react";

// const NAV_LINKS = [
//   { label: "Home", to: "/" },
//   { label: "Properties", to: "/properties" },
//   { label: "Add Property", to: "/add-property" },
// ];
// function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // Close the mobile menu on route change
//   useEffect(() => {
//     setMenuOpen(false);
//   }, [location.pathname]);

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
//         scrolled
//           ? "bg-white/80 backdrop-blur-xl shadow-md py-3"
//           : "bg-black/20 backdrop-blur-md py-5"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8">
//         <Link
//           to="/"
//           className={`text-2xl md:text-3xl font-bold transition-colors ${
//             scrolled ? "text-[#36454F]" : "text-white"
//           }`}
//         >
//           Home<span className="text-[#0066CC]">Scape</span>
//         </Link>

//         {/* Desktop links */}
//         <div className="hidden md:flex gap-8 items-center">
//           {NAV_LINKS.map((link) => (
//             <Link
//               key={link.label}
//               to={link.to}
//               className={`relative font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-[#0066CC] after:transition-all after:duration-300 ${
//   location.pathname === link.to
//     ? "text-[#0066CC] after:w-full"
//     : scrolled
//     ? "text-[#36454F] hover:text-[#0066CC] after:w-0 hover:after:w-full"
//     : "text-white hover:text-white after:w-0 hover:after:w-full"
// }`}
//             >
//               {link.label}
//             </Link>
//           ))}

//           <Link
//             to="/login"
//             className={`font-medium transition-colors ${
//               scrolled ? "text-[#36454F] hover:text-[#0066CC]" : "text-white/90 hover:text-white"
//             }`}
//           >
//             Login
//           </Link>

//           <Link
//             to="/register"
//             className="bg-[#0066CC] text-white px-6 py-2.5 rounded-lg hover:bg-[#0052A3] transition"
//           >
//             Register
//           </Link>
//         </div>

//         {/* Mobile hamburger */}
//         <button
//           aria-label="Toggle menu"
//           aria-expanded={menuOpen}
//           onClick={() => setMenuOpen((o) => !o)}
//           className={`md:hidden p-2 rounded-lg transition-colors ${
//             scrolled ? "text-[#36454F]" : "text-white"
//           }`}
//         >
//           {menuOpen ? <X size={26} /> : <Menu size={26} />}
//         </button>
//       </div>

//       {/* Mobile menu panel */}
//       <div
//         className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${
//           menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         <div className="mx-4 mt-3 mb-2 rounded-2xl bg-white shadow-xl p-4 flex flex-col gap-1">
//           {NAV_LINKS.map((link) => (
//             <Link
//               key={link.label}
//               to={link.to}
//               className="px-4 py-3 rounded-lg text-[#36454F] font-medium hover:bg-[#F8F4FF] hover:text-[#0066CC] transition-colors"
//             >
//               {link.label}
//             </Link>
//           ))}
//           <div className="flex gap-3 px-4 pt-3">
//             <Link
//               to="/login"
//               className="flex-1 text-center py-2.5 rounded-lg border border-[#36454F]/15 text-[#36454F] font-medium"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="flex-1 text-center py-2.5 rounded-lg bg-[#0066CC] text-white font-medium"
//             >
//               Register
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import useCompare from "../hooks/useCompare";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Properties", to: "/properties" },
  { label: "Add Property", to: "/add-property" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const compare = useCompare();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-md py-3"
          : "bg-black/20 backdrop-blur-md py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8">
        <Link
          to="/"
          className={`text-2xl md:text-3xl font-bold transition-colors ${
            scrolled ? "text-[#36454F]" : "text-white"
          }`}
        >
          Home<span className="text-[#0066CC]">Scape</span>
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`relative font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-[#0066CC] after:transition-all after:duration-300 ${
                location.pathname === link.to
                  ? "text-[#0066CC] after:w-full"
                  : scrolled
                  ? "text-[#36454F] hover:text-[#0066CC] after:w-0 hover:after:w-full"
                  : "text-white hover:text-white after:w-0 hover:after:w-full"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            to="/compare"
            data-testid="nav-compare-link"
            className={`relative font-medium transition-colors flex items-center gap-1.5 ${
              location.pathname === "/compare"
                ? "text-[#0066CC]"
                : scrolled
                ? "text-[#36454F] hover:text-[#0066CC]"
                : "text-white hover:text-white"
            }`}
          >
            Compare
            {compare.count > 0 && (
              <span
                data-testid="nav-compare-badge"
                className="inline-flex items-center justify-center min-w-[20px] h-5 rounded-full bg-[#0066CC] text-white text-[11px] font-bold px-1.5"
              >
                {compare.count}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <>
              <span className={`font-medium ${scrolled ? "text-[#36454F]" : "text-white"}`}>
                {user?.name || "User"}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="bg-[#0066CC] text-white px-6 py-2.5 rounded-lg hover:bg-[#0052A3] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`font-medium transition-colors ${
                  scrolled ? "text-[#36454F] hover:text-[#0066CC]" : "text-white/90 hover:text-white"
                }`}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-[#0066CC] text-white px-6 py-2.5 rounded-lg hover:bg-[#0052A3] transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? "text-[#36454F]" : "text-white"
          }`}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 mt-3 mb-2 rounded-2xl bg-white shadow-xl p-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="px-4 py-3 rounded-lg text-[#36454F] font-medium hover:bg-[#F8F4FF] hover:text-[#0066CC] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/compare"
            className="px-4 py-3 rounded-lg text-[#36454F] font-medium hover:bg-[#F8F4FF] hover:text-[#0066CC] transition-colors flex items-center justify-between"
          >
            <span>Compare</span>
            {compare.count > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 rounded-full bg-[#0066CC] text-white text-[11px] font-bold px-1.5">
                {compare.count}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <>
              <div className="px-4 py-3 text-[#36454F] font-medium">{user?.name || "User"}</div>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-lg bg-[#0066CC] text-white font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-3 px-4 pt-3">
              <Link
                to="/login"
                className="flex-1 text-center py-2.5 rounded-lg border border-[#36454F]/15 text-[#36454F] font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="flex-1 text-center py-2.5 rounded-lg bg-[#0066CC] text-white font-medium"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;