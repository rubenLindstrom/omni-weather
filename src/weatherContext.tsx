import React, { createContext, useState, useEffect } from "react";

interface WeatherState {}

const initialState: Partial<WeatherState> = {};

const WeatherContext: React.Context<WeatherState> = createContext(initialState);

interface Props {
	children: React.ReactNode;
}

const WeatherProvider: React.FC<Props> = ({ children }) => {
	const [state, setState] = useState(initialState);

	// TODO: Fetch weather data
	useEffect(() => {}, []);

	return (
		<WeatherContext.Provider value={state}>
			{children}
		</WeatherContext.Provider>
	);
};

export { WeatherProvider };
export default WeatherContext;
