type API = {
  key: string;
  baseUrl: string;
};

type Weather = {
  temperature: number;
  weather: string;
  name: string;
  country: string;
  valid: boolean;
};

type WeatherResponse = Promise<{
  weather: Weather | null;
  error: string | null;
}>;
