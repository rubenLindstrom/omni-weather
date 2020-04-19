const api: API = {
  key: process.env.REACT_APP_OPEN_WEATHER_DATA_KEY || "",
  baseUrl: "https://api.openweathermap.org/data/2.5",
};

const mapErrorCodeToMessage: (code: number) => string = (code) => {
  switch (code) {
    case 401:
      return "Invalid API key";
    case 404:
      return "Location not found";
    default:
      return "Woops, something went wrong";
  }
};

type Search = (query: string) => WeatherResponse;

const search: Search = async (query) => {
  return fetch(
    `${api.baseUrl}/weather?q=${query}&units=metric&appid=${api.key}`
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (+res.cod >= 400) {
        return { weather: null, error: mapErrorCodeToMessage(+res.cod) };
      } else {
        return {
          weather: {
            temperature: res.main.temp,
            weather: res.weather[0].main,
            name: res.name,
            country: res.sys.country,
            valid: true,
          },
          error: null,
        };
      }
    })
    .catch((err) => ({
      weather: null,
      error: mapErrorCodeToMessage(err.code),
    }));
};

export default search;
