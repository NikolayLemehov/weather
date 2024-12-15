import { createSelector } from "@reduxjs/toolkit";
import { WeatherType } from "@store/slices/cities/cities.slice.ts";

import { RootState } from "@/store";
import { kelvinToCelsius, kelvinToFahrenheit } from "@/utils";

export const selectCityKeysMap = (state: RootState) => state.cities.citiesMap;
export const selectCityKeys = (state: RootState) => state.cities.cityKeys;

// reselect
export const selectCityMapItem = (ciyKey: string) =>
  createSelector([selectCityKeysMap], (cityKeysMap) => {
    const city = cityKeysMap[ciyKey];
    if (!city) return null;

    return city;
  });
export const selectIsWarmWeather = (ciyKey: string) =>
  createSelector([selectCityMapItem(ciyKey)], (city) => {
    const weather = city?.weather;
    if (!weather) return null;

    return weather.isWarm;
  });
export const selectWeatherByCurrentType = (ciyKey: string) =>
  createSelector([selectCityMapItem(ciyKey)], (city) => {
    const weather = city?.weather;
    if (!city || !weather) return null;

    const celsiusWeather: WeatherType = {
      temperatureInKelvin: kelvinToCelsius(weather.temperatureInKelvin),
      feelTemperatureInKelvin: kelvinToCelsius(weather.feelTemperatureInKelvin),
      chartList: weather.chartList.map((item) => ({ ...item, pv: kelvinToCelsius(item.pv) })),
      isWarm: weather.isWarm,
    };

    const fahrenheitWeather: WeatherType = {
      temperatureInKelvin: kelvinToFahrenheit(weather.temperatureInKelvin),
      feelTemperatureInKelvin: kelvinToFahrenheit(weather.feelTemperatureInKelvin),
      chartList: weather.chartList.map((item) => ({ ...item, pv: kelvinToFahrenheit(item.pv) })),
      isWarm: weather.isWarm,
    };

    return city.temperatureType === "celsius" ? celsiusWeather : fahrenheitWeather;
  });
