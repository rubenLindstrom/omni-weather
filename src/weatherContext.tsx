import React, { createContext, useState } from "react";

interface Weather {
  temperature: number;
  weather: string;
  name: string;
  country: string;
  valid: boolean;
}

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
};

const WeatherContext = createContext<ContextValue>({
  weather: initialWeather,
  search: initialSearch,
  error: null,
});

const api = {
  key: process.env.REACT_APP_API_KEY,
  baseUrl: "https://api.openweathermap.org/data/2.5",
};

interface Props {
  children: React.ReactNode;
}

const mapErrorCodeToMessage: (code: number) => string = (code) => {
  switch (code) {
    case 401:
      return "The API key is invalid. Please supply another key";
    case 404:
      return "Location not found. Check your spelling and try again!";
    default:
      return "Woops, something went wrong!";
  }
};

const WeatherProvider: React.FC<Props> = ({ children }) => {
  const [weatherState, setWeather] = useState<Weather>(initialWeather);
  const [error, setError] = useState<string | null>(null);

  const search: (query: string) => void = (query) => {
    fetch(`${api.baseUrl}/weather?q=${query}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (+res.cod >= 400) {
          setWeather(initialWeather);
          setError(mapErrorCodeToMessage(+res.cod));
        } else {
          setError(null);
          setWeather({
            temperature: res.main.temp,
            weather: res.weather[0].main,
            name: res.name,
            country: res.sys.country,
            valid: true,
          });
        }
      });
  };

  return (
    <WeatherContext.Provider value={{ weather: weatherState, search, error }}>
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherProvider };
export default WeatherContext;
