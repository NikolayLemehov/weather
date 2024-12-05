import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { envKey } from "@common/constants.ts";

type GeoCity = {
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
    searchCities: builder.query<GeoCity[], string>({
      query: (cityName) => `geo/1.0/direct?q=${cityName}&limit=5&appid=${OPENWEATHER_API_KEY}`,
    }),
  }),
});

export const { useSearchCitiesQuery } = openWeatherApi;
