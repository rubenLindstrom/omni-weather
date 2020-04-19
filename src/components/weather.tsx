import React, { useContext } from "react";
import WeatherContext from "../weatherContext";

import Date from "./date";

const Weather: React.FC = () => {
  const { weather } = useContext(WeatherContext);

  return (
    <>
      {weather.valid ? (
        <>
          <div className="location-box">
            <div className="location">
              {weather.name}, {weather.country}
            </div>
            <Date />
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.temperature ? weather.temperature : 0)} °C
            </div>
            <div className="weather">{weather.weather}</div>
          </div>
        </>
      ) : (
        // TODO: Style this
        <div className="welcome-message">
          <h2>Welcome!</h2>
          <p>Submit a location to get the weather from anywhere!</p>
        </div>
      )}
    </>
  );
};

export default Weather;
