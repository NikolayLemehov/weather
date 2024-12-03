import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@/store";
import { exhaustiveCheck, kelvinToCelsius, kelvinToFahrenheit } from "@/utils";

export const selectTemperatureInKelvin = (state: RootState) => state.weather.temperatureInKelvin;
export const selectTemperatureType = (state: RootState) => state.weather.temperatureType;
export const selectChartList = (state: RootState) => state.weather.chartList;
export const selectFeelTemperatureInKelvin = (state: RootState) => state.weather.feelTemperatureInKelvin;

// reselect
export const selectCelsiusTemperature = createSelector([selectTemperatureInKelvin], (temperatureInKelvin) =>
  kelvinToCelsius(temperatureInKelvin)
);
export const selectFahrenheitTemperature = createSelector([selectTemperatureInKelvin], (temperatureInKelvin) =>
  kelvinToFahrenheit(temperatureInKelvin)
);
export const selectIsWarmWeather = createSelector(
  [selectCelsiusTemperature],
  (celsiusTemperature) => celsiusTemperature > 0
);
export const selectCelsiusFeelTemperature = createSelector([selectFeelTemperatureInKelvin], (feelTemperatureInKelvin) =>
  kelvinToCelsius(feelTemperatureInKelvin)
);
export const selectFahrenheitFeelTemperature = createSelector(
  [selectFeelTemperatureInKelvin],
  (feelTemperatureInKelvin) => kelvinToFahrenheit(feelTemperatureInKelvin)
);

export const selectTemperatureByCurrentType = createSelector(
  [selectTemperatureType, selectCelsiusTemperature, selectFahrenheitTemperature],
  (temperatureType, celsiusTemperature, fahrenheitTemperature) => {
    if (temperatureType === "celsius") return celsiusTemperature;
    if (temperatureType === "fahrenheit") return fahrenheitTemperature;

    return exhaustiveCheck(temperatureType);
  }
);
export const selectFeelTemperatureByCurrentType = createSelector(
  [selectTemperatureType, selectCelsiusFeelTemperature, selectFahrenheitFeelTemperature],
  (temperatureType, celsiusFeelTemperature, fahrenheitFeelTemperature) => {
    if (temperatureType === "celsius") return celsiusFeelTemperature;
    if (temperatureType === "fahrenheit") return fahrenheitFeelTemperature;

    return exhaustiveCheck(temperatureType);
  }
);

export const selectChartListByCelsius = createSelector([selectChartList], (chartList) =>
  chartList.map((item) => ({ ...item, pv: kelvinToCelsius(item.pv) }))
);
export const selectChartListByFahrenheit = createSelector([selectChartList], (chartList) =>
  chartList.map((item) => ({ ...item, pv: kelvinToFahrenheit(item.pv) }))
);

export const selectChartListByCurrentType = createSelector(
  [selectTemperatureType, selectChartListByCelsius, selectChartListByFahrenheit],
  (temperatureType, celsiusChartList, fahrenheitChartList) => {
    if (temperatureType === "celsius") return celsiusChartList;
    if (temperatureType === "fahrenheit") return fahrenheitChartList;

    return exhaustiveCheck(temperatureType);
  }
);
