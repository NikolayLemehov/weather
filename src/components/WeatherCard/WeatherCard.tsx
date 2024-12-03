import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Card, Stack, Typography } from "@mui/material";
import { useAppDispatch } from "@common/hooks";
import { useEffect } from "react";

import {
  selectChartListByCurrentType,
  selectFeelTemperatureByCurrentType,
  selectIsWarmWeather,
  selectTemperatureByCurrentType,
} from "./weather.selectors.ts";
import {
  CityText,
  DateText,
  TemperatureChart,
  TemperatureTypeToggle,
  WeatherCardContent,
  WeatherParam,
} from "./components";
import { useTemperatureList } from "./hooks";
import { WeatherData } from "./types.ts";
import { setChartList, setFeelTemperature, setTemperature } from "./weather.slice.ts";

type Props = {
  data: WeatherData;
};

export const WeatherCard = ({ data }: Props) => {
  const dispatch = useAppDispatch();

  const temperatureByCurrentType = useSelector(selectTemperatureByCurrentType);
  const isWarmWeather = useSelector(selectIsWarmWeather);
  const chartListByCurrentType = useSelector(selectChartListByCurrentType);
  const feelTemperatureByCurrentType = useSelector(selectFeelTemperatureByCurrentType);

  const temperatures = useTemperatureList(data);

  useEffect(() => {
    dispatch(setTemperature(data.list[0]?.main.temp ?? 0));
    dispatch(setFeelTemperature(data.list[0]?.main.feels_like ?? 0));
  }, [data.list, dispatch]);
  useEffect(() => {
    dispatch(setChartList(temperatures));
  }, [dispatch, temperatures]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <WeatherCardContent colorScheme={isWarmWeather ? "warm" : "cold"}>
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <CityText>
                {data.city.name}, {data.city.country}
              </CityText>
              <DateText>{dayjs(data.list[0]?.dt_txt).format("ddd, DD MMMM, HH:mm")}</DateText>
            </Stack>

            <Stack direction="row" alignItems="center">
              <img
                src={`https://openweathermap.org/img/wn/${data.list[0]?.weather[0]?.icon}@2x.png`}
                alt=""
                width={40}
              />
              <Typography fontSize="13px" lineHeight="19px" fontWeight={400} color="grey.100">
                {data.list[0]?.weather[0]?.main}
              </Typography>
            </Stack>
          </Stack>

          <TemperatureChart data={chartListByCurrentType} />

          <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
            <Stack minWidth={150}>
              <Stack direction="row" alignItems="flex-start" justifyContent="flex-end">
                <Typography fontSize="44px" lineHeight="64px" fontWeight={400} color="common.black" marginTop={0.5}>
                  {temperatureByCurrentType > 0 ? `+${temperatureByCurrentType}` : temperatureByCurrentType}
                </Typography>
                <TemperatureTypeToggle />
              </Stack>
              <Typography fontSize="13px" lineHeight="19px" fontWeight={400} color="grey.100">
                Feels like: {feelTemperatureByCurrentType} °C
              </Typography>
            </Stack>
            <Stack alignItems="flex-end">
              <WeatherParam name="Wind" unit="m/s" value={data.list[0]?.wind.speed} />
              <WeatherParam name="Humidity" unit="%" value={data.list[0]?.main.humidity} />
              <WeatherParam name="Pressure" unit="Pa" value={data.list[0]?.main.pressure} />
            </Stack>
          </Stack>
        </Stack>
      </WeatherCardContent>
    </Card>
  );
};
