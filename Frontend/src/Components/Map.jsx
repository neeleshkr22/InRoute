import React from "react";
import { MapPin } from "lucide-react";

const Maps = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-beige flex flex-col">
      <header className="bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <a href="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-black">InRoute</span>
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Accessible Maps</h1>
          <p className="text-xl text-gray-600 mb-8">Find accessible routes and locations tailored to your needs.</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center justify-center mb-8">
            <MapPin className="w-12 h-12 text-black mr-4" />
            <input
              type="text"
              placeholder="Enter your destination"
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="aspect-w-16 aspect-h-9 bg-beige rounded-lg">
            {/* Placeholder for map */}
            <div className="flex items-center justify-center h-full">
              <p className="text-black text-lg">Interactive Map Coming Soon</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-beige p-4 rounded-md">
              <h3 className="font-semibold text-black mb-2">Accessibility Features</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Wheelchair accessible routes</li>
                <li>Audio descriptions</li>
                <li>High-contrast mode</li>
                <li>Braille-friendly locations</li>
              </ul>
            </div>
            <div className="bg-beige p-4 rounded-md">
              <h3 className="font-semibold text-black mb-2">Community Insights</h3>
              <p className="text-gray-600">
                Get real-time updates and tips from our community of users to ensure the most accessible and enjoyable
                experience at your destination.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white shadow-md mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">© 2023 InRoute. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Maps;
