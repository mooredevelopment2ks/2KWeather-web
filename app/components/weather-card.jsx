import React, { useState, useEffect } from "react";
import { fetchCurrentWeatherData } from "@/lib/weatherData";
import css from "./weather-card.module.css";

export default function WeatherCard({ location }) {
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

  const { forecast } = currentWeatherData;

  if (!forecast) {
    console.error("Incomplete data:", currentWeatherData); // Log incomplete data
    return <h1>Error: Incomplete data</h1>;
  }

  const hourlyForecast = forecast.forecastday[0].hour;
  const dailyForecast = forecast.forecastday.slice(1, 3);

  const specificHours = hourlyForecast.filter((hourData) => {
    const hour = new Date(hourData.time).getHours();
    return [8, 12, 16, 20].includes(hour);
  });

  return (
    <div className={css.card}>
      <div className={css.hourlyWeather}>
        {specificHours.map((hourData, index) => (
          <div key={index} className={css.hourlyCard}>
            <img src={hourData.condition.icon} alt={hourData.condition.text} />
            <p>
              {new Date(hourData.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <p>{hourData.temp_c}°C</p>
          </div>
        ))}
      </div>
      <div className={css.weeklyWeather}>
        {dailyForecast.map((dayData, index) => (
          <p key={index}>
            {new Date(dayData.date).toLocaleDateString([], {
              weekday: "short",
            })}{" "}
            &nbsp; &nbsp; &nbsp; 💧% {dayData.day.avghumidity}% &nbsp; &nbsp;
            &nbsp;
            <img
              src={dayData.day.condition.icon}
              alt={dayData.day.condition.text}
            />
            &nbsp; &nbsp;
            <img src={dayData.day.condition.icon} alt="Night icon" />
            &nbsp; &nbsp; &nbsp; High:
            {dayData.day.maxtemp_c}°C &nbsp; &nbsp; Low: {dayData.day.mintemp_c}
            °C
          </p>
        ))}
      </div>
    </div>
  );
}
