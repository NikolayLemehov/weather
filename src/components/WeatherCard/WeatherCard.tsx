import { Card, CardContent, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

import { kelvinToCelsius } from "../../utils";

import { CityText, DateText } from "./components";
import { TemperatureTypeToggle } from "./components/TemperatureTypeToggle.tsx";
import { WeatherData } from "./types.ts";

type Props = {
  data: WeatherData;
};

export const WeatherCard = ({ data }: Props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent sx={{ p: "10px 15px", "&:last-child": { pb: "10px" }, backgroundColor: "warm.bg" }}>
        <Stack>
          <Stack direction="row">
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
            <Stack>
              <Typography fontSize="12px" lineHeight="18px" fontWeight={400} color="common.black">
                Wind:{" "}
                <Typography variant="body1" display="inline" color="warm.graph">
                  {kelvinToCelsius(data.list[0]?.wind.speed ?? 0)} m/s
                </Typography>
              </Typography>
              <Typography fontSize="12px" lineHeight="18px" fontWeight={400} color="common.black">
                Humidity:{" "}
                <Typography variant="body1" display="inline" color="warm.graph">
                  {kelvinToCelsius(data.list[0]?.main.humidity ?? 0)} %
                </Typography>
              </Typography>
              <Typography fontSize="12px" lineHeight="18px" fontWeight={400} color="common.black">
                Pressure:{" "}
                <Typography variant="body1" display="inline" color="warm.graph">
                  {kelvinToCelsius(data.list[0]?.main.pressure ?? 0)} Pa
                </Typography>
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
