import dynamic from "next/dynamic";
import css from "./weather-image.module.css";

const Scene = dynamic(() => import("./threedee/scene"), {
  ssr: false,
});

export default function WeatherImage({ weatherData }) {
  return (
    <div className={css.canvas}>
      <Scene weatherData={weatherData} />
    </div>
  )
}
