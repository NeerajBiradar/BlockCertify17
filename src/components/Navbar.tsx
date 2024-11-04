import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context12 } from "./ContextProvide";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const context = useContext(Context12);
  const loggedIn = context?.loggedIn || false;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from local storage
    context?.setLoggedIn(false); // Set loggedIn to false in context
  };

  return (
    <nav className="w-full bg-[#060B0F] py-4">
      <div className="container mx-auto px-4 flex items-center">
        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Spacer for centered links */}
        <div className="flex-grow" />

        {/* Desktop menu centered */}
        <div className="hidden md:flex justify-center space-x-16 flex-grow-0">
          <Link to="/" className="text-white text-lg">
            Home
          </Link>
          <Link to="/fetch" className="text-white text-lg">
            Fetch All
          </Link>
          {loggedIn && (
            <Link to="/generate" className="text-white text-lg">
              Generate
            </Link>
          )}
          <Link to="/about" className="text-white text-lg">
            About Us
          </Link>
        </div>

        {/* Spacer to push buttons to the right */}
        <div className="flex-grow" />

        {/* Desktop buttons on the right */}
        <div className="hidden md:flex space-x-4">
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-[#202d37] hover:bg-[#94a3ad] hover:text-[#202d37] text-white py-2 px-4 rounded-xl"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-[#202d37] hover:bg-[#94a3ad] hover:text-[#202d37] text-white py-2 px-4 rounded-xl"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-[#202d37] hover:bg-[#94a3ad] hover:text-[#202d37] text-white py-2 px-4 rounded-xl"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-white block px-3 py-2 text-base font-medium">
              Home
            </Link>
            <Link to="/fetch" className="text-white block px-3 py-2 text-base font-medium">
              Fetch All
            </Link>
            {loggedIn && (
              <Link to="/generate" className="text-white block px-3 py-2 text-base font-medium">
                Generate
              </Link>
            )}
            <Link to="/about" className="text-white block px-3 py-2 text-base font-medium">
              About Us
            </Link>
            {!loggedIn && (
              <>
                <Link to="/signup" className="text-white block px-3 py-2 text-base font-medium">
                  Sign Up
                </Link>
                <Link to="/login" className="text-white block px-3 py-2 text-base font-medium">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
