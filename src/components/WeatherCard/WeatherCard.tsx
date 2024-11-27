import { Card, CardContent, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

import { kelvinToCelsius } from "../../utils";

import { CityText, DateText, TemperatureChart, TemperatureTypeToggle, WeatherParam } from "./components";
import { WeatherData } from "./types.ts";

type Props = {
  data: WeatherData;
};

export const WeatherCard = ({ data }: Props) => {
  console.log(data.list[0]?.wind.speed, { data });

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent sx={{ p: "10px 15px", "&:last-child": { pb: "10px" }, backgroundColor: "warm.bg" }}>
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <CityText>
                {data.city.name}, {data.city.country}
              </CityText>
              <DateText>{dayjs(data.list[0]?.dt).format("ddd, DD MMMM, HH:mm")}</DateText>
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

          <TemperatureChart />

          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <Stack direction="row" gap={1} alignItems="flex-start">
                <Typography fontSize="44px" lineHeight="64px" fontWeight={400} color="common.black">
                  {kelvinToCelsius(data.list[0]?.main.temp ?? 0)}
                </Typography>
                <TemperatureTypeToggle />
              </Stack>
              <Typography fontSize="13px" lineHeight="19px" fontWeight={400} color="grey.100">
                Feels like: {kelvinToCelsius(data.list[0]?.main.feels_like ?? 0)} °C
              </Typography>
            </Stack>
            <Stack alignItems="flex-end">
              <WeatherParam name="Wind" value={data.list[0]?.wind.speed} />
              <WeatherParam name="Humidity" value={data.list[0]?.main.humidity} />
              <WeatherParam name="Pressure" value={data.list[0]?.main.pressure} />
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
