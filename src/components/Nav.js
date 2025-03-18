import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import communityLogo from "../images/community.png";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setIsOpen(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className="w-full fixed top-0 left-0 z-50 flex justify-center items-center p-2"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.7)", 
      }}
    >
      <div className="w-11/12 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src={communityLogo}
            alt="Community Logo"
            className="h-10 mr-2"
            style={{ filter: "invert(1)" }} // Invert the logo color to white
          />
          <h1 className="text-white text-2xl font-bold m-0">CommunionHub</h1>
        </Link>

        {/* Navigation Links */}
        <ul
          className={`absolute md:static top-16 right-4 text-center md:flex gap-6 p-3 md:p-0 rounded-md transition-all duration-300 ${
            isOpen ? "flex flex-col bg-gray-800" : "hidden md:flex"
          }`}
        >
          <li className="w-full">
            <Link
              to="/"
              className="text-white text-lg hover:text-gray-200 block py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>

          {/* Events Dropdown */}
          <li className="relative w-full" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-white text-lg hover:text-gray-200 focus:outline-none block py-2"
            >
              Events
            </button>

            {dropdownOpen && (
              <ul
                className="absolute mt-2 bg-black text-white shadow-md rounded-md py-2 w-48"
                style={{ right: 0 }}
              >
                <li>
                  <Link
                    to="/events"
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
                    onClick={() => {
                      setDropdownOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    Upcoming Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-event"
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
                    onClick={() => {
                      setDropdownOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    Create Event
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="w-full">
            <Link
              className="text-white text-lg hover:text-gray-200 block py-2"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>

          <li className="w-full">
            <button
              className="bg-white text-blue-400 px-4 py-1.5 rounded-md text-lg font-medium hover:bg-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Login
            </button>
          </li>
        </ul>

        {/* Hamburger Menu */}
        <div
          className="md:hidden flex flex-col cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="bg-white h-1 w-6 mb-1"></span>
          <span className="bg-white h-1 w-6 mb-1"></span>
          <span className="bg-white h-1 w-6"></span>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
