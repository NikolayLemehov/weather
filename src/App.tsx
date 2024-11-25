import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import "./App.css";
import { envKey } from "./common/constants.ts";
import { WeatherCard } from "./components";
import { WeatherData } from "./components/WeatherCard/types.ts";
import { useIsMounted } from "./hooks";

const apiKey = envKey.VITE_WEATHER_API_KEY;
console.log(apiKey);
const App = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const isMounted = useIsMounted();

  const fetchWeatherData = async () => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${envKey.VITE_WEATHER_API_KEY}`
    );
    const data: WeatherData = await response.json();
    setWeatherData(data);
    localStorage.setItem("weatherData", JSON.stringify(data));
  };

  const loadWeatherData = () => {
    const data = localStorage.getItem("weatherData");
    if (data) {
      setWeatherData(JSON.parse(data));
    } else {
      console.warn("No data found in localStorage");
    }
  };
  useEffect(() => {
    if (isMounted.current) {
      loadWeatherData();
    }
  }, [isMounted]);
  console.log(weatherData);

  return (
    <div>
      <Button onClick={fetchWeatherData}>Fetch Weather Data</Button>
      <Button onClick={loadWeatherData} style={{ marginLeft: "10px" }}>
        Load Weather Data
      </Button>

      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
};

export default App;
