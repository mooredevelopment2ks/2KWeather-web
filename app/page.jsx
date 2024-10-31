"use client";

import React, { useState, useEffect } from "react";
import { fetchCurrentWeatherData } from "@/lib/weatherData";
import WeatherNow from "./components/weather-now";
import WeatherCard from "./components/weather-card";
import WeatherImage from "./components/weather-image";
import css from "./page.module.css";

export default function Home() {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [weatherData, setWeatherData] = useState(null);
  const [daytimeClass, setDaytimeClass] = useState(css.daytime);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (location.lat !== null && location.lon !== null) {
      fetchCurrentWeatherData(location.lat, location.lon)
        .then((data) => {
          setWeatherData(data);
          const isDay = data.current.is_day;

          // Determine the class based on the is_day value
          if (isDay === 1) {
            setDaytimeClass(css.daytime);
          } else {
            setDaytimeClass(css.nighttime);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch current weather data", error);
          setLoading(false);
        });
    }
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${css.container} ${daytimeClass}`}>
      <div className={css.leftContainer}>
        {weatherData && <WeatherNow weatherData={weatherData} />}
        {weatherData && <WeatherCard weatherData={weatherData} />}
      </div>
      <div className={css.rightContainer}>
        {weatherData && <WeatherImage weatherData={weatherData} />}
      </div>
    </div>
  );
}
