import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ChartItemType = {
  date: string;
  pv: number;
};
type TemperatureTypeType = "celsius" | "fahrenheit";
type WeatherStateType = {
  temperatureInKelvin: number;
  feelTemperatureInKelvin: number;
  temperatureType: TemperatureTypeType;
  chartList: ChartItemType[];
};

const initialState: WeatherStateType = {
  temperatureInKelvin: 0,
  feelTemperatureInKelvin: 0,
  temperatureType: "celsius",
  chartList: [],
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setTemperature(state, action: PayloadAction<number>) {
      state.temperatureInKelvin = action.payload;
    },
    setFeelTemperature(state, action: PayloadAction<number>) {
      state.feelTemperatureInKelvin = action.payload;
    },
    setTemperatureType(state, action: PayloadAction<TemperatureTypeType>) {
      state.temperatureType = action.payload;
    },
    toggleTemperatureType(state) {
      state.temperatureType = state.temperatureType === "celsius" ? "fahrenheit" : "celsius";
    },
    setChartList(state, action: PayloadAction<ChartItemType[]>) {
      state.chartList = action.payload;
    },
  },
});

export const { setTemperature, setTemperatureType, toggleTemperatureType, setChartList, setFeelTemperature } =
  weatherSlice.actions;

export default weatherSlice.reducer;
