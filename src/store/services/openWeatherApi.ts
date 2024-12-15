import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { envKey } from "@common/constants.ts";
import { WeatherDataApiType } from "@common/types.ts";
import { LanguageCodeType } from "@common/i18n/constants.ts";

export type GeoCityApiType = {
  name: string;
  local_names?: {
    [key: string]: string;
  };
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

const OPENWEATHER_API_KEY = envKey.VITE_WEATHER_API_KEY;

export const openWeatherApi = createApi({
  reducerPath: "openWeatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://api.openweathermap.org/" }),
  endpoints: (builder) => ({
    searchCities: builder.query<GeoCityApiType[], string>({
      query: (cityName) => `geo/1.0/direct?q=${cityName}&limit=5&appid=${OPENWEATHER_API_KEY}`,
    }),
    geoWeather: builder.query<WeatherDataApiType, { lat: number; lon: number; lang: LanguageCodeType }>({
      query: ({ lat, lon, lang }) =>
        `data/2.5/forecast?lat=${lat}&lon=${lon}&lang=${lang}&appid=${envKey.VITE_WEATHER_API_KEY}`,
    }),
  }),
});

export const { useSearchCitiesQuery, useGeoWeatherQuery } = openWeatherApi;
