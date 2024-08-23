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

  const { current, location: loc, forecast } = currentWeatherData;

  if (!current || !loc) {
    console.error("Incomplete data:", currentWeatherData); // Log incomplete data
    return <h1>Error: Incomplete data</h1>;
  }

  //Converting temp to Celcius
  const temperature = current.temp_c;
  //Covert time into format I want
  // Parse loc.localtime to a Date object
  const localtimeDate = new Date(loc.localtime.replace(" ", "T"));

  // Format the date and time
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "numeric",
  }).format(localtimeDate);

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(localtimeDate);

  const dayOfWeek = localtimeDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const formattedLocaltime = `${formattedDate} - ${dayOfWeek} - ${formattedTime}`;

  const sunriseTime = forecast.forecastday[0].astro.sunrise;
  const sunsetTime = forecast.forecastday[0].astro.sunset;
  const sunrise = new Date(`2000-01-01 ${sunriseTime}`).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const sunset = new Date(`2000-01-01 ${sunsetTime}`).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className={css.weatherNow}>
      <h2>{loc.name}</h2>
      <h1>{temperature}°C</h1>
      <h3>{current.condition.text}</h3>
      <p>{formattedLocaltime}</p>
      <p>Sunrise: {sunrise}</p>
      <p>Sunset: {sunset}</p>
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
