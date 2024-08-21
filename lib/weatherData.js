const getWeatherUrl = (lat, lon) => {
  return `http://localhost:3000/api?lat=${lat}&lon=${lon}`;
};

export const fetchCurrentWeatherData = async (lat, lon) => {
  const url = getWeatherUrl(lat, lon);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch current weather data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch current weather data", error);
    throw error;
  }
};
