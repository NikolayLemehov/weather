import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Card, CardActions, Stack, Typography } from "@mui/material";
import { WeatherDataApiType } from "@common/types.ts";
import { GeoCityType } from "@store/slices/cities.slice.ts";
import { selectWeatherByCurrentType } from "@store/slices/cities.selectors.ts";

import {
  CityText,
  DateText,
  DeleteCardBtn,
  TemperatureChart,
  TemperatureTypeToggle,
  WeatherCardContent,
  WeatherParam,
} from "./components";

type Props = {
  data: WeatherDataApiType;
  geoCity: GeoCityType;
};

export const WeatherCard = ({ data, geoCity }: Props) => {
  const currentWeather = useSelector(selectWeatherByCurrentType(geoCity.cityKey));
  if (!currentWeather) return "Not enough Weather data";

  const temperatureByCurrentType = currentWeather.temperatureInKelvin;
  const isWarmWeather = currentWeather.isWarm;
  const chartListByCurrentType = currentWeather.chartList;
  const feelTemperatureByCurrentType = currentWeather.feelTemperatureInKelvin;

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

          <TemperatureChart data={chartListByCurrentType} cityKey={geoCity.cityKey} />

          <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
            <Stack minWidth={150}>
              <Stack direction="row" alignItems="flex-start" justifyContent="flex-end">
                <Typography fontSize="44px" lineHeight="64px" fontWeight={400} color="common.black" marginTop={0.5}>
                  {temperatureByCurrentType > 0 ? `+${temperatureByCurrentType}` : temperatureByCurrentType}
                </Typography>
                <TemperatureTypeToggle cityKey={geoCity.cityKey} />
              </Stack>
              <Typography fontSize="13px" lineHeight="19px" fontWeight={400} color="grey.100">
                Feels like: {feelTemperatureByCurrentType} °C
              </Typography>
            </Stack>
            <Stack alignItems="flex-end">
              <WeatherParam name="Wind" unit="m/s" value={data.list[0]?.wind.speed} cityKey={geoCity.cityKey} />
              <WeatherParam name="Humidity" unit="%" value={data.list[0]?.main.humidity} cityKey={geoCity.cityKey} />
              <WeatherParam name="Pressure" unit="Pa" value={data.list[0]?.main.pressure} cityKey={geoCity.cityKey} />
            </Stack>
          </Stack>
        </Stack>
      </WeatherCardContent>
      <CardActions>
        <DeleteCardBtn cityKey={geoCity.cityKey} />
      </CardActions>
    </Card>
  );
};
