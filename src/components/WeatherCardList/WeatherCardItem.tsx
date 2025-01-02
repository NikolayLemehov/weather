import { useGeoWeatherQuery } from "@store/services/openWeatherApi.ts";
import { GeoCityType, setWeather } from "@store/slices/cities/cities.slice.ts";
import { useEffect } from "react";
import { useAppDispatch } from "@common/hooks";
import { useTranslation } from "react-i18next";

import { useTemperatureList } from "./hooks";

import { WeatherCard } from "@/components";

type Props = {
  geoCity: GeoCityType;
};
export const WeatherCardItem = ({ geoCity }: Props) => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGeoWeatherQuery({ lat: geoCity.geo.lat, lon: geoCity.geo.lon, lang: i18n.language });
  const temperatures = useTemperatureList(data);
  useEffect(() => {
    dispatch(
      setWeather({
        weather: {
          chartList: temperatures,
          temperatureInKelvin: data?.list[0]?.main.temp ?? 0,
          feelTemperatureInKelvin: data?.list[0]?.main.feels_like ?? 0,
          city: { name: data?.city.name ?? "", country: data?.city.country ?? "" },
        },
        cityKey: geoCity.cityKey,
      })
    );
  }, [data?.city.country, data?.city.name, data?.list, dispatch, geoCity.cityKey, temperatures]);

  if (isLoading) return "Loading...";
  if (!data) return "Not enough Weather data";

  return <WeatherCard data={data} geoCity={geoCity} />;
};
