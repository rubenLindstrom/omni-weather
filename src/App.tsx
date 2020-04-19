import React, { useState } from "react";

const api = {
	key: process.env.API_KEY,
	baseUrl: "https://api.openweathermap.org/data/2.5"
};

/* TODO: 
 - Move api to other component
 - Split up into components
 - Add sass
 - Add more background images
 - Create helper functions
 - Sockets?
 - Accessability
*/

interface Weather {
	temperature: number;
	weather: string;
	name: string;
	country: string;
}

const App = () => {
	// TODO: Set types
	const [query, setQuery] = useState("");
	const [weather, setWeather] = useState<Partial<Weather>>({});

	const search: (e: React.KeyboardEvent) => void = (e) => {
		if (e.key === "Enter") {
			fetch(
				`${api.baseUrl}/weather?q=${query}&units=metric&appid=${api.key}`
			)
				.then((res) => res.json())
				.then((res) => {
					if (res.cod === "404") {
						// TODO: Set error message
					} else {
						setWeather({
							temperature: res.main.temp,
							weather: res.weather[0].main,
							name: res.name,
							country: res.sys.country
						});
						setQuery("");
					}
				});
		}
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
			"December"
		];
		const mapDayToNiceName = [
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
			"Sunday"
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
				weather.temperature && weather.temperature > 16
					? "warm"
					: "cold"
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
						onKeyPress={search}
					/>
				</div>
				{weather.weather ? (
					<>
						<div className="location-box">
							<div className="location">
								{weather.name}, {weather.country}
							</div>
							<div className="date">
								{dateBuilder(new Date())}
							</div>
						</div>
						<div className="weather-box">
							<div className="temp">
								{Math.round(
									weather.temperature
										? weather.temperature
										: 0
								)}{" "}
								°C
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
