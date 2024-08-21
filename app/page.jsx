"use client";
import React, { useState, useEffect } from "react";
import WeatherNow from "./components/weather-now";
import WeatherCard from "./components/weather-card";
import WeatherImage from "./components/weather-image";

export default function Home() {
  const [location, setLocation] = useState({ lat: null, lon: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Error getting location", error);
        }
      );
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  return (
    <div>
      <div className="leftContainer">
        {/* Get rid of this h1 when the lat and long are used in API successfully */}
        <h1>
          {location.lat}, {location.lon}
        </h1>
        <WeatherNow location={location} />
        <WeatherCard location={location} />
      </div>
      <div className="rightContainer">
        <WeatherImage location={location} />
      </div>
    </div>
  );
}

//TODO
// 1. Create Skeleton for the page
// 2. Initial Weather information in the top left (Component)
// 3. Card with further information in the bottom left (Component)
// 4. 3D image takes up the right side of the page (Component)
