import { useSelector } from "react-redux";
import { selectCityKeys, selectCityKeysMap } from "@store/slices/cities.selectors.ts";

import { WeatherCardItem } from "@/components/WeatherCardList/WeatherCardItem.tsx";

export const WeatherCardList = () => {
  const citiesMap = useSelector(selectCityKeysMap);
  const cityKeys = useSelector(selectCityKeys);

  return cityKeys.map((cityKey) => {
    const geoCity = citiesMap[cityKey];
    if (!geoCity) return null;

    return <WeatherCardItem key={cityKey} geoCity={geoCity} />;
  });
};
