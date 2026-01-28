import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  /* 🔍 SEARCH LOGIC — SAME AS OLD */
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    navigate(`/search?${urlParams.toString()}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) setSearchTerm(searchTermFromUrl);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 h-20 bg-[#0f1e33] shadow-md">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4">
          {/* LOGO — LEFT SHIFT */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="PrimeSpace Logo"
              className="h-[300px] w-auto object-contain mt-5 -ml-20"
            />
          </Link>

          {/* SEARCH — LEFT SHIFT BUT RESPONSIVE */}
          <form
            onSubmit={handleSubmit}
            className="
              flex items-center bg-white rounded-md overflow-hidden h-10
              w-full max-w-[600px]
              -ml-20
              sm:-ml-30
              mx-2
            "
          >
            <input
              type="text"
              placeholder="Search..."
              className="px-4 w-full text-base focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 h-full px-5 flex items-center justify-center hover:bg-blue-700 transition"
            >
              <FaSearch className="text-white text-lg" />
            </button>
          </form>

          {/* DESKTOP NAV */}
          <ul className="hidden sm:flex items-center gap-8 text-lg font-bold text-white">
            <Link to="/">
              <li className="hover:text-blue-400 transition">Home</li>
            </Link>
            <Link to="/about">
              <li className="hover:text-blue-400 transition">About</li>
            </Link>

            {currentUser ? (
              <Link to="/profile">
                <img
                  src={currentUser.avatar}
                  alt="profile"
                  className="h-10 w-10 rounded-full object-cover border-2 border-blue-500"
                />
              </Link>
            ) : (
              <li className="flex items-center border border-blue-500 rounded-md overflow-hidden text-sm">
                <Link
                  to="/sign-in"
                  className={`px-4 py-1 transition ${
                    location.pathname === "/sign-in"
                      ? "bg-blue-500 text-white"
                      : "text-white hover:bg-blue-500/20"
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className={`px-4 py-1 transition ${
                    location.pathname === "/sign-up"
                      ? "bg-blue-500 text-white"
                      : "text-white hover:bg-blue-500/20"
                  }`}
                >
                  Sign Up
                </Link>
              </li>
            )}
          </ul>

          {/* HAMBURGER — MOBILE */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-white text-2xl"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="sm:hidden bg-[#0f1e33] px-4 pb-4 space-y-4">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block text-white text-lg font-bold hover:text-blue-400"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="block text-white text-lg font-bold hover:text-blue-400"
            >
              About
            </Link>

            {currentUser ? (
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3"
              >
                <img
                  src={currentUser.avatar}
                  alt="profile"
                  className="h-10 w-10 rounded-full object-cover border-2 border-blue-500"
                />
                <span className="text-white font-bold">Profile</span>
              </Link>
            ) : (
              <div className="flex gap-4">
                <Link
                  to="/sign-in"
                  onClick={() => setMenuOpen(false)}
                  className="text-white border border-blue-500 px-4 py-1 rounded"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  onClick={() => setMenuOpen(false)}
                  className="text-white border border-blue-500 px-4 py-1 rounded"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* PAGE OFFSET */}
      <div className="pt-20" />
    </>
  );
}
