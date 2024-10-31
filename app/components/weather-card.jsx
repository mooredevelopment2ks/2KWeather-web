import css from "./weather-card.module.css";

export default function WeatherCard({ weatherData }) {
  if (!weatherData) {
    return <h1>Loading...</h1>;
  }

  const { forecast, current } = weatherData;

  if (!forecast || !current) {
    console.error("Incomplete data:", weatherData); // Log incomplete data
    return <h1>Error: Incomplete data</h1>;
  }

  const isDay = current.is_day;
  const textClass = isDay !== 1 ? css.whiteText : "";

  const hourlyForecast = forecast.forecastday[0].hour;
  const dailyForecast = forecast.forecastday.slice(1, 3);

  const specificHours = hourlyForecast.filter((hourData) => {
    const hour = new Date(hourData.time).getHours();
    return [8, 12, 16, 20].includes(hour);
  });

  return (
    <div className={`${css.card} ${textClass}`}>
      <div className={css.hourlyWeather}>
        {specificHours.map((hourData, index) => (
          <div key={index} className={css.hourlyCard}>
            <img src={hourData.condition.icon} alt={hourData.condition.text} />
            <p className={textClass}>
              {new Date(hourData.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <p className={`${css.hourlyTemps} ${textClass}`}>{hourData.temp_c}</p>
          </div>
        ))}
      </div>
      <div className={css.weeklyWeather}>
        {dailyForecast.map((dayData, index) => (
          <div key={index}>
            <span className={textClass}>
              {new Date(dayData.date).toLocaleDateString([], {
                weekday: "short",
              })}{" "}
            </span>
            <span className={`${css.avghumidity} ${textClass}`}>{dayData.day.avghumidity}</span>
            <img
              src={dayData.day.condition.icon}
              alt={dayData.day.condition.text}
            />
            <span className={`${css.tempRanges} ${textClass}`}>High: {dayData.day.maxtemp_c}</span>
            <span className={`${css.tempRanges} ${textClass}`}>Low: {dayData.day.mintemp_c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
