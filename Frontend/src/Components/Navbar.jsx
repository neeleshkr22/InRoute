import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, MessageSquare, Users, LogIn, UserPlus } from "lucide-react"; // Import Users icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-b from-white to-gray-100 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-indigo-600 transition duration-200">
              InRoute
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/maps"
              className="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-200"
            >
              <MapPin className="w-4 h-4 mr-1" /> Maps
            </Link>

            <Link
              to="/chatbot"
              className="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-200"
            >
              <MessageSquare className="w-4 h-4 mr-1" /> Chatbot
            </Link>

            <Link
              to="/community/Community"
              className="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-200"
            >
              <Users className="w-4 h-4 mr-1" /> Community
            </Link>

            <Link
              to="/login"
              className="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-200"
            >
              <LogIn className="w-4 h-4 mr-1" /> Login
            </Link>

            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 shadow-md transition duration-200 flex items-center"
            >
              <UserPlus className="w-4 h-4 mr-1" /> Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-indigo-600 focus:outline-none"
              aria-label="Toggle navigation"
            >
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-white shadow-lg`}>  
        <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
          <Link
            to="/maps"
            className="block text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium transition duration-200 flex items-center"
          >
            <MapPin className="w-4 h-4 mr-1" /> Maps
          </Link>

          <Link
            to="/chatbot"
            className="block text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium transition duration-200 flex items-center"
          >
            <MessageSquare className="w-4 h-4 mr-1" /> Chatbot
          </Link>

          <Link
            to="/community/Community"
            className="block text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium transition duration-200 flex items-center"
          >
            <Users className="w-4 h-4 mr-1" /> Community
          </Link>

          <Link
            to="/login"
            className="block text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium transition duration-200 flex items-center"
          >
            <LogIn className="w-4 h-4 mr-1" /> Login
          </Link>

          <Link
            to="/signup"
            className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-indigo-500 shadow-md transition duration-200 flex items-center justify-center"
          >
            <UserPlus className="w-4 h-4 mr-1" /> Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
