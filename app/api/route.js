//Cant make a const for the env variable API key here... it would be out of scope.

const options = {
  headers: {
    accept: "application/json",
  },
};

const getWeatherUrl = (lat, lon, apiKey) => {
  //could put env variable API key here
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
};

const getDailyWeatherUrl = (lat, lon, apiKey) => {
  return `api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=5&appid=${apiKey}`;
};

export async function GET(request) {
  //but we put it here intsead
  const API_KEY_C = process.env.CURRENT_WEATHER_DATA;
  const { searchParams } = new URL(request.url);
  const url = getWeatherUrl(
    searchParams.get("lat"),
    searchParams.get("lon"),
    API_KEY_C
  );
  try {
    const apiResponse = await fetch(url, options);
    const data = await apiResponse.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify([]), { status: 500 });
  }
}
