import React, { useState, useEffect } from "react";
import { fetchCurrentWeatherData } from "@/lib/weatherData";
import css from "./weather-now.module.css";

export default function WeatherNow({ location }) {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);

  useEffect(() => {
    if (location.lat && location.lon) {
      fetchCurrentWeatherData(location.lat, location.lon)
        .then((data) => {
          console.log("Fetched data:", data);
          setCurrentWeatherData(data);
        })
        .catch((error) =>
          console.error("Failed to fetch current weather data", error)
        );
    }
  }, [location]);

  if (!currentWeatherData) {
    return <h1>Loading...</h1>;
  }

  const { weather, main, sys } = currentWeatherData;

  if (!weather || !main || !sys) {
    console.error("Incomplete data:", currentWeatherData); // Log incomplete data
    return <h1>Error: Incomplete data</h1>;
  }

  //Converting temp to Celcius
  const temperature = (main.temp - 273.15).toFixed(1);
  const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(sys.sunset * 1000).toLocaleTimeString();

  return (
    <div className={css.weatherNow}>
      <h2>
        Location = {location.lat}, {location.lon}
      </h2>
      <h1>Temperature: {temperature}°C</h1>
      <h3>Weather Condition: {weather[0].description}</h3>
      <p>Date and Time</p>
      <p>Sunrise {sunrise}</p>
      <p>Sunset {sunset}</p>
    </div>
  );
}

//TODO
// 1. Location is Suburb gotten from Get Current Location and needed for the API call
// 2. Temperature is the current temperature in Celsius - From weather API
// 3. Weather Condition is the current weather condition - From weather API
// 4. Date and Time format: DD/MM - Day - Current Time
// 5. Sunrise is the time the sun rises - From weather API
// 6. Sunset is the time the sun sets - From weather API

//on page load get the current location
//use current location to make an API call to get the weather information
