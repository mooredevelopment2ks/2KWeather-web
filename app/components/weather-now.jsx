export default function WeatherNow() {
  return (
    <div className="weather-now">
      <h2>Location</h2>
      <h1>Temperature</h1>
      <h3>Weather Condition</h3>
      <p>Date and Time</p>
      <p>Sunrise</p>
      <p>Sunset</p>
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
