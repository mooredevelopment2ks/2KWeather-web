import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";

const defaultGLB = "/sunny.glb";
const weatherToGLBMap = {
  "sunny": "/sunny.glb",
  "clear": "/clear-night.glb",
  "partly cloudy": "/cloudy-day.glb",
  "cloudy": "/cloudy-day.glb",
  "overcast": "/overcast-day.glb",
  "mist": "/cloudy-day.glb",
  "patchy rain nearby": "/rain-day.glb",
  "patchy snow nearby": "/snow-day.glb",
  "patchy sleet nearby": "/snow-day.glb",
  "patchy freezing drizzle nearby": "/snow-day.glb",
  "thundery outbreaks in nearby": "/apocalypse-day.glb",
  "blowing snow": "/blizzard-day.glb",
  "blizzard": "/blizzard-day.glb",
  "fog": "/cloudy-day.glb",
  "freezing fog": "/cloudy-day.glb",
  "patchy light drizzle": "/rain-day.glb",
  "light drizzle": "/rain-day.glb",
  "freezing drizzle": "/snow-day.glb",
  "heavy freezing drizzle": "/snow-day.glb",
  "patchy light rain": "/rain-day.glb",
  "light rain": "/rain-day.glb",
  "moderate rain at times": "/rain-day.glb",
  "moderate rain": "/rain-day.glb",
  "heavy rain at times": "/rain-day.glb",
  "heavy rain": "/rain-day.glb",
  "light freezing rain": "/snow-day.glb",
  "moderate or heavy freezing rain": "/snow-day.glb",
  "light sleet": "/snow-day.glb",
  "moderate or heavy sleet": "/snow-day.glb",
  "patchy light snow": "/snow-day.glb",
  "light snow": "/snow-day.glb",
  "patchy moderate snow": "/snow-day.glb",
  "moderate snow": "/snow-day.glb",
  "patchy heavy snow": "/snow-day.glb",
  "heavy snow": "/snow-day.glb",
  "ice pellets": "/snow-day.glb",
  "light rain shower": "/rain-day.glb",
  "moderate or heavy rain shower": "/rain-day.glb",
  "torrential rain shower": "/rain-day.glb",
  "light sleet showers": "/snow-day.glb",
  "moderate or heavy sleet showers": "/snow-day.glb",
  "light snow showers": "/snow-day.glb",
  "moderate or heavy snow showers": "/snow-day.glb",
  "light showers of ice pellets": "/snow-day.glb",
  "moderate or heavy showers of ice pellets": "/snow-day.glb",
  "patchy light rain in area with thunder": "/apocalypse-day.glb",
  "moderate or heavy rain in area with thunder": "/apocalypse-day.glb",
  "patchy light snow in area with thunder": "/apocalypse-day.glb",
  "moderate or heavy snow in area with thunder": "/apocalypse-day.glb",
};

export default function Model({ weatherData }) {
  const condition = weatherData.current.condition.text.toLowerCase();
  const group = useRef<Group>(null);
  const glbPath = weatherToGLBMap[condition] || defaultGLB;
  const { nodes, materials, animations, scene } = useGLTF(glbPath);
  return (
    <group useRef={group}>
      <primitive object={scene} />
    </group>
  );
}
