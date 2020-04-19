import React, { createContext, useState } from "react";
import weatherSearch from "./api/openWeatherData";
import imageSearch from "./api/unsplash";

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

const intitialBg =
  "https://images.unsplash.com/photo-1550825406-7e94dcee0b68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1491&q=80";

const WeatherContext = createContext<ContextValue>({
  weather: initialWeather,
  search: initialSearch,
  error: null,
  bgUrl: intitialBg,
});

interface Props {
  children: React.ReactNode;
}

const WeatherProvider: React.FC<Props> = ({ children }) => {
  const [weatherState, setWeather] = useState<Weather>(initialWeather);
  const [error, setError] = useState<string | null>(null);
  const [bgUrl, setBgUrl] = useState(intitialBg);

  const search: (query: string) => void = async (query) => {
    const [{ weather, error }, bgUrl] = await Promise.all([
      weatherSearch(query),
      imageSearch(query),
    ]);

    console.log(bgUrl);

    if (bgUrl && bgUrl.length) setBgUrl(bgUrl);
    else setBgUrl(intitialBg);

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
