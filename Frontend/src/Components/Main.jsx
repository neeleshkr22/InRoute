import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import one from "../../public/1.png";  
import two from "../../public/2.png";  
import three from "../../public/3.png";  
import four from "../../public/4.png"; 
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
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[-1] brightness-50"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1
              ref={headingRef}
              className="text-6xl font-extrabold text-grey mb-10 drop-shadow-lg animate-pulse"
            >
              InRoute
            </h1>
            <div className="imgdiv flex -mt-36 z-50">
              <div>
                <img className="w-80 z-50" src={one} alt="" />
              </div>
              <div>
                <img className="w-80" src={two} alt="" />
              </div>
              <div>
                <img className="w-80" src={three} alt="" />
              </div>
              <div>
                <img className="w-80" src={four} alt="" />
              </div>
            </div>
            <div className="flex justify-between w-[75vw] mt-6 mx-auto">
              <p className="text-xl border-b ml-8">
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
            <div className="grid grid-cols-2 gap-6">
              {[ 
                "/images/wheelchair-navigation.jpg",
                "/images/inroute-app.jpg",
                "/images/community-support.jpg",
                "/images/chatbot-assistance.jpg",
              ].map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Feature ${index + 1}`}
                  className="rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 transform hover:scale-[1.02]"
                />
              ))}
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

          <div
            className="mt-20 bg-white/20 backdrop-blur-lg rounded-3xl p-12 shadow-2xl relative z-10"
            ref={(el) => (sectionsRef.current[1] = el)}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Join the Movement
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Become a part of the InRoute community today and make a lasting impact. Whether you’re a user, a contributor, or a partner, your involvement can help us create a more inclusive world.
            </p>
            <button className="mt-6 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
              Learn More
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-lg text-gray-300 py-8 text-center relative z-10">
        <p>&copy; 2025 InRoute. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Main;
