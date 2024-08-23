import React, { useState, useEffect } from "react";
import { fetchCurrentWeatherData } from "@/lib/weatherData";
import css from "./weather-card.module.css";

export default function WeatherCard() {
  return (
    <div className={css.card}>
      <div className={css.hourlyWeather}>
        <p>Weather icon</p>
        <p>Time</p>
        <p>Temperature</p>
        {/* Cards here where we need to get weather at certain times in front of current time
                    Horizontal cards (scroll?) with:
                    - Image (reflecting the weather condition)
                    - Time
                    - Temperature
        */}
      </div>
      <div className={css.weeklyWeather}>
        <p>
          Day - Humidity - Weather icon day - Weather icon night - High Temp -
          Low Temp
        </p>
        {/* Vertical list of weather for the coming days of the week (scroll?) */}
        {/* Format is: Day - Humidity - Weather icon(day) - Weather icon (night) - High Temp - Low Temp */}
      </div>
    </div>
  );
}
