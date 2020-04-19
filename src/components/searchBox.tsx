import React, { useContext, useState } from "react";
import WeatherContext from "../weatherContext";

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState("");
  const { search } = useContext(WeatherContext);

  const handleKeyPress: (e: React.KeyboardEvent) => void = (e) => {
    if (e.key === "Enter") {
      search(query);
      setQuery("");
    }
  };

  return (
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
  );
};

export default SearchBox;
