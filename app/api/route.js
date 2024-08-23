//Cant make a const for the env variable API key here... it would be out of scope.

const options = {
  headers: {
    accept: "application/json",
  },
};

const getWeatherUrl = (lat, lon, apiKey) => {
  //could put env variable API key here
  return `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=3`;
};

export async function GET(request) {
  //but we put it here intsead
  const API_KEY_C = process.env.CURRENT_WEATHER_DATA;
  const { searchParams } = new URL(request.url);

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const url = getWeatherUrl(lat, lon, API_KEY_C);

  try {
    const apiResponse = await fetch(url, options);
    const data = await apiResponse.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify([]), { status: 500 });
  }
}
