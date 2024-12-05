import { configureStore } from "@reduxjs/toolkit";
import { openWeatherApi } from "@store/services/openWeatherApi.ts";

import weatherReducer from "@/components/WeatherCard/weather.slice.ts";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    [openWeatherApi.reducerPath]: openWeatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(openWeatherApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
