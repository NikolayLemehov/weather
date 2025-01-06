import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Box, Card, Stack, Typography } from "@mui/material";
import { WeatherDataApiType } from "@common/types.ts";
import { GeoCityType } from "@store/slices/cities/cities.slice.ts";
import {
  selectCityKeys,
  selectCityMapItem,
  selectWeatherByCurrentType,
} from "@store/slices/cities/cities.selectors.ts";
import { useTranslation } from "react-i18next";
import { styles } from "@common/constants.ts";

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
  const { t } = useTranslation("home");
  const currentWeather = useSelector(selectWeatherByCurrentType(geoCity.cityKey));
  const city = useSelector(selectCityMapItem(geoCity.cityKey));
  const cityLength = useSelector(selectCityKeys).length;
  if (!currentWeather) return "Not enough Weather data";
  if (!city) return "Not enough city data";

  const temperatureByCurrentType = currentWeather.temperatureInKelvin;
  const isWarmWeather = currentWeather.isWarm;
  const chartListByCurrentType = currentWeather.chartList;
  const feelTemperatureByCurrentType = currentWeather.feelTemperatureInKelvin;
  const geoCityName = [city.geo.name, city.geo.country, city.geo.state].filter(Boolean).join(", ");
  const cityName = geoCityName
    ? geoCityName
    : [currentWeather.city.name, currentWeather.city.country].filter(Boolean).join(", ");

  return (
    <Card
      sx={{
        position: "relative",
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        boxShadow: styles.shadow.main,
      }}
    >
      <WeatherCardContent
        colorScheme={isWarmWeather ? "warm" : "cold"}
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Stack direction="row" justifyContent="space-between" sx={{ pr: 1, mb: "auto" }}>
          <Stack>
            <CityText>{cityName}</CityText>
            <DateText>{dayjs(data.list[0]?.dt_txt).format("ddd, DD MMMM, HH:mm")}</DateText>
          </Stack>

          <Stack direction="row" alignItems="center">
            <img src={`https://openweathermap.org/img/wn/${data.list[0]?.weather[0]?.icon}@2x.png`} alt="" width={40} />
            <Typography fontSize="13px" lineHeight="19px" fontWeight={400} color="grey.100">
              {data.list[0]?.weather[0]?.description}
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
              {t("feelsLike")}: {feelTemperatureByCurrentType} °C
            </Typography>
          </Stack>
          <Stack alignItems="flex-end">
            <WeatherParam name={t("wind")} unit="m/s" value={data.list[0]?.wind.speed} cityKey={geoCity.cityKey} />
            <WeatherParam name={t("humidity")} unit="%" value={data.list[0]?.main.humidity} cityKey={geoCity.cityKey} />
            <WeatherParam
              name={t("pressure")}
              unit="Pa"
              value={data.list[0]?.main.pressure}
              cityKey={geoCity.cityKey}
            />
          </Stack>
        </Stack>
      </WeatherCardContent>
      {(!city.isAddedByGeoLocation || cityLength > 1) && (
        <Box sx={{ position: "absolute", top: 0, right: 0 }}>
          <DeleteCardBtn cityKey={geoCity.cityKey} />
        </Box>
      )}
    </Card>
  );
};
