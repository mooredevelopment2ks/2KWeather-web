import WeatherNow from "./components/weather-now";
import WeatherCard from "./components/weather-card";
import WeatherImage from "./components/weather-image";

export default function Home() {
  return (
    <div>
      <div className="leftContainer">
        <WeatherNow />
        <WeatherCard />
      </div>
      <div className="rightContainer">
        <WeatherImage />
      </div>
    </div>
  );
}

//TODO
// 1. Create Skeleton for the page
// 2. Initial Weather information in the top left (Component)
// 3. Card with further information in the bottom left (Component)
// 4. 3D image takes up the right side of the page (Component)
