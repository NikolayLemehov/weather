import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeoCityApiType } from "@store/services/openWeatherApi.ts";

import { kelvinToCelsius } from "@/utils";

type TemperatureTypeType = "celsius" | "fahrenheit";
type ChartItemType = {
  date: string;
  pv: number;
};
export type WeatherType = {
  temperatureInKelvin: number;
  feelTemperatureInKelvin: number;
  city: { name: string; country: string };
  chartList: ChartItemType[];
  isWarm: boolean;
};
type CityId = string;
export type GeoCityType = {
  cityKey: CityId;
  geo: GeoCityApiType;
  weather: WeatherType | null;
  temperatureType: TemperatureTypeType;
  isAddedByGeoLocation: boolean;
};

type CitiesState = {
  citiesMap: Record<CityId, GeoCityType>;
  cityKeys: CityId[];
  selectedCity: GeoCityApiType | null;
};

const defaultTemperatureType: TemperatureTypeType = "celsius";
const initialState: CitiesState = {
  citiesMap: {},
  cityKeys: [],
  selectedCity: null,
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    addSelectedCity: (state) => {
      const city = state.selectedCity;
      if (!city) return;
      const cityKey = `${city.lat}_${city.lon}`;
      if (state.cityKeys.includes(cityKey)) return;

      state.cityKeys.push(cityKey);
      state.citiesMap[cityKey] = {
        cityKey: cityKey,
        geo: city,
        temperatureType: defaultTemperatureType,
        weather: null,
        isAddedByGeoLocation: false,
      };
    },
    setSelectedCity: (state, action: PayloadAction<GeoCityApiType | null>) => {
      state.selectedCity = action.payload;
    },
    addCityByGeoLocation: (state, action: PayloadAction<GeoCityApiType>) => {
      const city = action.payload;
      const cityKey = `${city.lat}_${city.lon}`;
      if (state.cityKeys.includes(cityKey)) return;

      state.cityKeys.push(cityKey);
      state.citiesMap[cityKey] = {
        cityKey: cityKey,
        geo: city,
        temperatureType: defaultTemperatureType,
        weather: null,
        isAddedByGeoLocation: true,
      };
    },
    removeCity: (state, action: PayloadAction<string>) => {
      const cityId = action.payload;
      const index = state.cityKeys.findIndex((id) => cityId === id);
      if (index === -1) return;

      state.cityKeys.splice(index, 1);
      delete state.citiesMap[cityId];
    },
    toggleTemperatureType(state, action: PayloadAction<CityId>) {
      const cityId = action.payload;
      const city = state.citiesMap[cityId];
      if (!city) return;

      city.temperatureType = city.temperatureType === "celsius" ? "fahrenheit" : "celsius";
    },
    setWeather(state, action: PayloadAction<{ weather: Omit<WeatherType, "isWarm">; cityKey: CityId }>) {
      const { weather, cityKey } = action.payload;
      const city = state.citiesMap[cityKey];
      if (!city) return;

      city.weather = {
        ...city.weather,
        chartList: weather.chartList,
        temperatureInKelvin: weather.temperatureInKelvin,
        feelTemperatureInKelvin: weather.feelTemperatureInKelvin,
        isWarm: kelvinToCelsius(weather.temperatureInKelvin) > 0,
        city: { name: weather.city.name, country: weather.city.country },
      };
    },
  },
});

export const { addSelectedCity, setSelectedCity, addCityByGeoLocation, removeCity, toggleTemperatureType, setWeather } =
  citiesSlice.actions;

export const citiesReducer = citiesSlice.reducer;
