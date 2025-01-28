import React from "react";
import Navbar from "./Navbar";

function Main() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
              Welcome to InRoute
            </h1>
            <p className="text-2xl text-gray-700 mb-8">
              Empowering mobility for everyone, everywhere.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-md hover:shadow-lg transform transition-transform duration-200 hover:scale-105">
              Get Started
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-gray-900">
                Accessible Navigation Made Easy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                InRoute provides real-time, accessible navigation and assistance
                for people with disabilities. Our platform offers customized
                routes, voice-guided navigation, and a supportive community to
                ensure everyone can travel with confidence.
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Customized routes for various accessibility needs</li>
                <li>Real-time updates on accessibility of locations</li>
                <li>Community-driven information and support</li>
                <li>24/7 chatbot assistance for instant help</li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/placeholder.svg"
                alt="Person using a wheelchair navigating city streets"
                className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              />
              <img
                src="/placeholder.svg"
                alt="Close-up of the InRoute app showing an accessible route"
                className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              />
              <img
                src="/placeholder.svg"
                alt="Group of diverse people using the InRoute app together"
                className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              />
              <img
                src="/placeholder.svg"
                alt="InRoute chatbot providing assistance on a mobile device"
                className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              />
            </div>
          </div>

          <div className="mt-16 bg-blue-100 rounded-lg p-8 shadow-md">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Why Choose InRoute?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-200 hover:scale-105">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Personalized Experience
                </h3>
                <p className="text-gray-700">
                  Tailored navigation and assistance based on your specific
                  needs and preferences.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-200 hover:scale-105">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Community Support
                </h3>
                <p className="text-gray-700">
                  Connect with others, share experiences, and contribute to a
                  more accessible world.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-200 hover:scale-105">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Cutting-edge Technology
                </h3>
                <p className="text-gray-700">
                  Leveraging AI and real-time data to provide the most
                  up-to-date and accurate information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-900 text-gray-100 py-6 text-center">
        <p>&copy; 2025 InRoute. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Main;
