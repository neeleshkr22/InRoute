import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-white hover:text-indigo-400 transition duration-200">
              YourLogo
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <a
                href="/login"
                className="text-gray-300 hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Login
              </a>
              <a
                href="/signup"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 transition duration-200 shadow-lg transform hover:scale-105"
              >
                Sign Up
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-indigo-400 focus:outline-none"
              aria-label="Toggle navigation"
            >
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
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
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-gray-800 bg-opacity-90`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="/login"
            className="block text-gray-300 hover:text-indigo-400 px-3 py-2 rounded-md text-base font-medium transition duration-200"
          >
            Login
          </a>
          <a
            href="/signup"
            className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-indigo-500 transition duration-200 shadow-lg transform hover:scale-105"
          >
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
