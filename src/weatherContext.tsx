import React, { createContext, useState } from "react";
import weatherSearch from "./api/openWeatherData";
import imageSearch from "./api/unsplash";
import defaultBg from "./images/cold-bg.jpg";

const initialWeather = {
  temperature: -1,
  weather: "",
  name: "",
  country: "",
  valid: false,
};

type Search = (query: string) => void;
const initialSearch = () => {
  throw new Error("Search not declared");
};

type ContextValue = {
  weather: Weather;
  search: Search;
  error: string | null;
  bgUrl: string;
};

const WeatherContext = createContext<ContextValue>({
  weather: initialWeather,
  search: initialSearch,
  error: null,
  bgUrl: defaultBg,
});

interface Props {
  children: React.ReactNode;
}

const WeatherProvider: React.FC<Props> = ({ children }) => {
  const [weatherState, setWeather] = useState<Weather>(initialWeather);
  const [error, setError] = useState<string | null>(null);
  const [bgUrl, setBgUrl] = useState(defaultBg);

  const search: (query: string) => void = async (query) => {
    const [{ weather, error }, bgUrl] = await Promise.all([
      weatherSearch(query),
      imageSearch(query),
    ]);

    console.log(bgUrl);

    if (bgUrl && bgUrl.length) setBgUrl(bgUrl);
    else setBgUrl(defaultBg);

    if (error) {
      setWeather(initialWeather);
      setError(error);
    } else if (weather) {
      setWeather(weather);
      setError(null);
    }
  };

  return (
    <WeatherContext.Provider
      value={{ weather: weatherState, search, error, bgUrl }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherProvider };
export default WeatherContext;
