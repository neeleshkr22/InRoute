import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { MapPin, Crosshair } from "lucide-react";

mapboxgl.accessToken = "pk.eyJ1IjoicHJhY2hlc3MxIiwiYSI6ImNtMG94c2JsZTBlaXUyaXFza2QxZDkycnMifQ.2W_lHN72lot9SbKctk4MDA";

const Maps = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const userMarkerRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {   
    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [77.209, 28.6139],
      zoom: 12,
    });

    setMap(mapInstance);
    mapInstance.addControl(new mapboxgl.NavigationControl());

    // Get and show user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setUserLocation([longitude, latitude]);
          
          // Create marker for user location
          const markerElement = document.createElement('div');
          markerElement.className = 'user-marker';
          markerElement.innerHTML = `
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <div class="w-4 h-4 bg-white rounded-full"></div>
            </div>
          `;

          userMarkerRef.current = new mapboxgl.Marker(markerElement)
            .setLngLat([longitude, latitude])
            .addTo(mapInstance);

          // Watch position for updates
          const watchId = navigator.geolocation.watchPosition(
            (pos) => {
              const newLocation = [pos.coords.longitude, pos.coords.latitude];
              setUserLocation(newLocation);
              if (userMarkerRef.current) {
                userMarkerRef.current.setLngLat(newLocation);
              }
            },
            (error) => {
              console.error("Error watching location:", error);
            }
          );

          return () => navigator.geolocation.clearWatch(watchId);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }

    const createGeocoder = (placeholder, callback) => {
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false,
        placeholder: placeholder,
      });

      geocoder.on("result", (e) => {
        callback(e.result.center);
      });

      return geocoder;
    };

    // Add geocoder for start and destination locations
    mapInstance.addControl(createGeocoder("Enter start location", setStartLocation), "top-left");
    mapInstance.addControl(createGeocoder("Enter destination", setEndLocation), "top-left");

    return () => {
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
      }
      mapInstance.remove();
    };
  }, []);

  useEffect(() => {
    if (startLocation && endLocation) {
      getAccessibleRoute(userLocation, endLocation);
    }
  }, [userLocation, endLocation]);

  const getAccessibleRoute = async (start, end) => {
    if (!map) return;

    const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?access_token=${mapboxgl.accessToken}&geometries=geojson`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes.length > 0) {
        const route = data.routes[0].geometry;
        
        // Remove previous route
        if (map.getSource("route")) {
          map.removeLayer("route");
          map.removeSource("route");
        }

        // Add new route
        map.addSource("route", { type: "geojson", data: { type: "Feature", geometry: route } });

        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#ff0000", "line-width": 5 },
        });

        map.flyTo({ center: start, zoom: 14 });
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  const focusCurrentLocation = () => {
    if (map && userLocation) {
      map.flyTo({
        center: userLocation,
        zoom: 15,
        duration: 1000
      });
    }
  };

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
          <p className="text-xl text-gray-600 mb-8">
            Find wheelchair-friendly routes tailored to your needs.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="w-full h-[500px] rounded-lg shadow-lg relative">
            <div ref={mapContainerRef} className="w-full h-full" />
            <button
              onClick={focusCurrentLocation}
              className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none"
            >
              <Crosshair className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-beige p-4 rounded-md">
              <h3 className="font-semibold text-black mb-2">Accessibility Features</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Wheelchair accessible routes</li>
                <li>Voice-assisted navigation</li>
                <li>High-contrast mode</li>
                <li>Braille-friendly locations</li>
              </ul>
            </div>
            <div className="bg-beige p-4 rounded-md">
              <h3 className="font-semibold text-black mb-2">Community Insights</h3>
              <p className="text-gray-600">
                Get real-time updates and tips from our community to ensure the most accessible experience.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white shadow-md mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">© 2025 InRoute. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Maps;