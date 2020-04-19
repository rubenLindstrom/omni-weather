import React, { useState, useContext } from "react";
import WeatherContext from "./weatherContext";

import SearchBox from "./components/searchBox";
import Weather from "./components/weather";

const App = () => {
  const { bgUrl } = useContext(WeatherContext);

  return (
    <div style={{ backgroundImage: `url("${bgUrl}")` }} className="app">
      <main>
        <SearchBox />
        <Weather />
      </main>
    </div>
  );
};

export default App;
