import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Main() {
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const cardsRef = useRef([]);
  const sectionsRef = useRef([]);

  useEffect(() => {
    
    gsap.fromTo(
      headingRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

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
    <div className="min-h-screen flex flex-col relative overflow-hidden">
     
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>

      <Navbar />
      <main className="flex-1 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1
              ref={headingRef}
              className="text-6xl font-extrabold text-white mb-4 drop-shadow-lg animate-pulse"
            >
              Welcome to InRoute
            </h1>
            <p
              ref={textRef}
              className="text-2xl text-gray-200 mb-8 drop-shadow-md"
            >
              Empowering mobility for everyone, everywhere.
            </p>
            <button
              ref={buttonRef}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-md hover:shadow-lg transform transition-transform duration-200 hover:scale-105"
            >
              Get Started
            </button>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-white drop-shadow-lg">
                Accessible Navigation Made Easy
              </h2>
              <p className="text-gray-200 leading-relaxed">
                InRoute provides real-time, accessible navigation and assistance
                for people with disabilities. Our platform offers customized
                routes, voice-guided navigation, and a supportive community to
                ensure everyone can travel with confidence.
              </p>
              <ul className="list-disc list-inside text-gray-200">
                <li>Customized routes for various accessibility needs</li>
                <li>Real-time updates on accessibility of locations</li>
                <li>Community-driven information and support</li>
                <li>24/7 chatbot assistance for instant help</li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/images/wheelchair-navigation.jpg"
                alt="Person using a wheelchair navigating city streets"
                className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              />
              <img
                src="/images/inroute-app.jpg"
                alt="Close-up of the InRoute app showing an accessible route"
                className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              />
              <img
                src="/images/community-support.jpg"
                alt="Group of diverse people using the InRoute app together"
                className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              />
              <img
                src="/images/chatbot-assistance.jpg"
                alt="InRoute chatbot providing assistance on a mobile device"
                className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              />
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div
            className="mt-16 bg-blue-100 rounded-lg p-8 shadow-md"
            ref={(el) => (cardsRef.current[0] = el)}
          >
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Why Choose InRoute?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-200 hover:scale-105"
                ref={(el) => (cardsRef.current[1] = el)}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Personalized Experience
                </h3>
                <p className="text-gray-700">
                  Tailored navigation and assistance based on your specific
                  needs and preferences.
                </p>
              </div>
              <div
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-200 hover:scale-105"
                ref={(el) => (cardsRef.current[2] = el)}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Community Support
                </h3>
                <p className="text-gray-700">
                  Connect with others, share experiences, and contribute to a
                  more accessible world.
                </p>
              </div>
              <div
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-200 hover:scale-105"
                ref={(el) => (cardsRef.current[3] = el)}
              >
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

          {/* Additional Content Section */}
          <div
            className="mt-16 bg-gray-900 text-white rounded-lg p-8 shadow-md"
            ref={(el) => (sectionsRef.current[0] = el)}
          >
            <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
            <p className="leading-relaxed">
              At InRoute, we believe in a world where mobility is not a
              privilege but a fundamental right. Our mission is to empower
              individuals with disabilities by providing tools, resources, and
              a supportive community to overcome barriers and achieve their
              goals.
            </p>
          </div>

          <div
            className="mt-16 bg-white rounded-lg p-8 shadow-md"
            ref={(el) => (sectionsRef.current[1] = el)}
          >
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Join the Movement
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Become a part of the InRoute community today and make a lasting
              impact. Whether you’re a user, a contributor, or a partner, your
              involvement can help us create a more inclusive world.
            </p>
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transform transition-transform duration-200 hover:scale-105">
              Learn More
            </button>
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
