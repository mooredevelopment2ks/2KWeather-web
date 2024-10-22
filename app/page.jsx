"use client";
import React, { useState, useEffect } from "react";
import WeatherNow from "./components/weather-now";
import WeatherCard from "./components/weather-card";
import WeatherImage from "./components/weather-image";
import css from "./page.module.css";

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
    <div className={css.container}>
      <div className={css.leftContainer}>
        <WeatherNow location={location} />
        <WeatherCard location={location} />
      </div>
      <div className={css.rightContainer}>
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
