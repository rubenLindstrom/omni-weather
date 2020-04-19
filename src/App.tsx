import React, { useState, useContext } from "react";
import WeatherContext from "./weatherContext";

const App = () => {
  // TODO: Set types
  const [query, setQuery] = useState("");
  const { weather, search } = useContext(WeatherContext);

  const handleKeyPress: (e: React.KeyboardEvent) => void = (e) => {
    if (e.key === "Enter") search(query);
  };

  const dateBuilder: (d: Date) => string = (d) => {
    const mapMonthToNiceName = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const mapDayToNiceName = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const month = mapMonthToNiceName[d.getMonth()];
    const date = d.getDate();
    const day = mapDayToNiceName[d.getDay()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={`app ${
        weather.temperature && weather.temperature > 16 ? "warm" : "cold"
      }`}
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={handleKeyPress}
          />
        </div>
        {weather.valid ? (
          <>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.temperature ? weather.temperature : 0)} °C
              </div>
              <div className="weather">{weather.weather}</div>
            </div>
          </>
        ) : (
          <></>
        )}
      </main>
    </div>
  );
};

export default App;
