import css from "./weather-now.module.css";

export default function WeatherNow({ weatherData }) {

  if (!weatherData) {
    return <h1>Loading...</h1>;
  }

  const { current, location: loc, forecast } = weatherData;

  if (!current || !loc) {
    console.error("Incomplete data:", weatherData); // Log incomplete data
    return <h1>Error: Incomplete data</h1>;
  }

  // Converting temp to Celcius
  const temperature = current.temp_c;

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
      <h2 className={css.suburb}>{loc.name}</h2>
      <h1 className={css.temperature}>{temperature}°C</h1>
      <h3 className={css.weatherCondition}>{current.condition.text}</h3>
      <p className={css.weatherData}>{formattedLocaltime}</p>
      <p className={css.weatherData}>Sunrise: {sunrise}</p>
      <p className={css.weatherData}>Sunset: {sunset}</p>
    </div>
  );
}
