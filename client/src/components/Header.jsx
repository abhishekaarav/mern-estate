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

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    navigate(`/search?${urlParams.toString()}`);
  };

  // Update search term when URL changes (syncs with Search page)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    } else {
      setSearchTerm("");
    }
  }, [location.search]); // Added dependency to listen to URL changes

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 h-20 bg-gradient-to-r from-[#1e3a5f] via-[#0f2942] to-[#1e3a5f] shadow-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4">
          {/* LOGO */}
          <Link to="/" className="flex items-center w-fit h-20 overflow-hidden">
            <img
              src={logo}
              alt="PrimeSpace Logo"
              className="h-[300px] w-auto object-contain mt-5 -ml-20 pointer-events-none"
            />
          </Link>

          {/* SEARCH */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-white rounded-md overflow-hidden h-10 w-full max-w-[600px] -ml-20 sm:-ml-30 mx-2"
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
              className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full px-5 flex items-center justify-center hover:from-amber-500 hover:to-yellow-400 transition"
            >
              <FaSearch className="text-[#0f1e33] text-lg" />
            </button>
          </form>

          {/* DESKTOP NAV */}
          <ul className="hidden sm:flex items-center gap-8 text-lg font-bold text-amber-300">
            <Link to="/">
              <li className="transition hover:text-[#27A9FF]">Home</li>
            </Link>

            <Link to="/about">
              <li className="transition hover:text-[#27A9FF]">About</li>
            </Link>

            {currentUser ? (
              <Link to="/profile">
                <img
                  src={currentUser.avatar}
                  alt="profile"
                  className="h-10 w-10 rounded-full object-cover border-2 border-amber-400"
                />
              </Link>
            ) : (
              <li className="flex items-center border border-amber-400 rounded-md overflow-hidden text-sm">
                <Link
                  to="/sign-in"
                  className={`px-4 py-1 transition ${
                    location.pathname === "/sign-in"
                      ? "bg-gradient-to-r from-amber-400 to-yellow-300 text-[#0f1e33]"
                      : "text-amber-300 hover:text-[#27A9FF]"
                  }`}
                >
                  Sign In
                </Link>

                <Link
                  to="/sign-up"
                  className={`px-4 py-1 transition ${
                    location.pathname === "/sign-up"
                      ? "bg-gradient-to-r from-amber-400 to-yellow-300 text-[#0f1e33]"
                      : "text-amber-300 hover:text-[#27A9FF]"
                  }`}
                >
                  Sign Up
                </Link>
              </li>
            )}
          </ul>

          {/* HAMBURGER */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-amber-300 text-2xl"
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
              className="block text-amber-300 text-lg font-bold hover:text-[#27A9FF]"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="block text-amber-300 text-lg font-bold hover:text-[#27A9FF]"
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
                  className="h-10 w-10 rounded-full object-cover border-2 border-amber-400"
                />
                <span className="text-amber-300 font-bold">Profile</span>
              </Link>
            ) : (
              <div className="flex gap-4">
                <Link
                  to="/sign-in"
                  onClick={() => setMenuOpen(false)}
                  className="text-amber-300 border border-amber-400 px-4 py-1 rounded hover:text-[#27A9FF]"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  onClick={() => setMenuOpen(false)}
                  className="text-amber-300 border border-amber-400 px-4 py-1 rounded hover:text-[#27A9FF]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      <div className="pt-20" />
    </>
  );
}
