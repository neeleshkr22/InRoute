import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import one from "../../public/1.png";
import two from "../../public/2.png";
import three from "../../public/3.png";
import four from "../../public/4.png";
import "../../src/App.css";
gsap.registerPlugin(ScrollTrigger);

function Main() {
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const cardsRef = useRef([]);
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Hero Section Animations
    gsap.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
    );
    gsap.fromTo(
      buttonRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)", delay: 0.6 }
    );

    // Cards Animation
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
        }
      );
    });

    // Sections Animation
    sectionsRef.current.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1
              className="head text-[300px] font-extrabold text-yellow-500 mb-10 -mt-36 drop-shadow-lg z-0"
            >
              InRoute
            </h1>
            <div className="imgdiv flex -mt-36 z-50">
              <div>
                <img className="w-80 z-50" src={one} alt="Accessibility Icon" />
              </div>
              <div>
                <img className="w-80" src={two} alt="Navigation Icon" />
              </div>
              <div>
                <img className="w-80" src={three} alt="Community Support Icon" />
              </div>
              <div>
                <img className="w-80" src={four} alt="Chatbot Assistance Icon" />
              </div>
            </div>
            <div className="flex justify-between w-[75vw] mt-6 mx-auto">
              <p className="text-xl text-gray-200 border-b ml-8">
                Empowering accessible mobility for everyone, everywhere.
              </p>
              <div className="w-1/2 pt-3 pb-3 text-black text-base font-semibold rounded-full border shadow-md border-black cursor-pointer hover:shadow-xl transition">
                Get Started
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mt-16 relative z-10">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white drop-shadow-lg">
                Accessible Navigation Made Easy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                InRoute provides real-time, accessible navigation and assistance
                for people with disabilities. Our platform offers customized
                routes, voice-guided navigation, and a supportive community to
                ensure everyone can travel with confidence.
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Customized routes for various accessibility needs</li>
                <li>Real-time updates on accessibility of locations</li>
                <li>Community-driven information and support</li>
                <li>24/7 chatbot assistance for instant help</li>
              </ul>
            </div>

            {/* Feature Icons Section */}
            <div className="grid grid-cols-2 gap-6">
              <div className="feature-card bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
                <div className="text-center text-yellow-500 mb-4">
                  <i className="fas fa-map-marked-alt text-4xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Custom Routes</h3>
                <p className="text-gray-300">
                  Tailored navigation routes for wheelchair users, seniors, and others with specific accessibility needs.
                </p>
              </div>
              <div className="feature-card bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
                <div className="text-center text-yellow-500 mb-4">
                  <i className="fas fa-headset text-4xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Voice-Guided Navigation</h3>
                <p className="text-gray-300">
                  Get turn-by-turn directions with voice prompts to navigate easily and safely.
                </p>
              </div>
              <div className="feature-card bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
                <div className="text-center text-yellow-500 mb-4">
                  <i className="fas fa-users text-4xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Community Support</h3>
                <p className="text-gray-300">
                  Connect with local users and support each other through shared experiences and tips.
                </p>
              </div>
              <div className="feature-card bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
                <div className="text-center text-yellow-500 mb-4">
                  <i className="fas fa-comments text-4xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">24/7 Assistance</h3>
                <p className="text-gray-300">
                  Access our AI-powered chatbot anytime to help you with questions and concerns.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div
            className="mt-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 shadow-2xl relative z-10"
            ref={(el) => (cardsRef.current[0] = el)}
          >
            <h2 className="text-4xl font-bold text-white mb-8">
              Why Choose InRoute?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[ 
                { title: "Personalized Experience", description: "Tailored navigation and assistance based on your specific needs." },
                { title: "Community Support", description: "Connect with others, share experiences, and contribute to a more accessible world." },
                { title: "Cutting-edge Technology", description: "Leveraging AI and real-time data to provide the most accurate information." },
              ].map(({ title, description }, index) => (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:scale-105"
                  ref={(el) => (cardsRef.current[index + 1] = el)}
                >
                  <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                  <p className="text-gray-300">{description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Content Section */}
          <div
            className="mt-20 bg-gray-900/80 backdrop-blur-lg text-white rounded-3xl p-12 shadow-2xl relative z-10"
            ref={(el) => (sectionsRef.current[0] = el)}
          >
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="leading-relaxed">
              At InRoute, we believe in a world where mobility is not a privilege but a fundamental right. Our mission is to empower individuals with disabilities by providing tools, resources, and a supportive community to overcome barriers and achieve their goals.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
