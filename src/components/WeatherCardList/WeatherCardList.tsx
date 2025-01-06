import { useSelector } from "react-redux";
import { selectCityKeys, selectCityKeysMap } from "@store/slices/cities/cities.selectors.ts";
import { Stack } from "@mui/material";

import { WeatherCardItem } from "@/components/WeatherCardList/WeatherCardItem.tsx";

export const WeatherCardList = () => {
  const citiesMap = useSelector(selectCityKeysMap);
  const cityKeys = useSelector(selectCityKeys);

  return (
    <Stack direction="row" gap="30px" alignItems="stretch" flexWrap="wrap">
      {cityKeys.map((cityKey) => {
        const geoCity = citiesMap[cityKey];
        if (!geoCity) return null;

        return <WeatherCardItem key={cityKey} geoCity={geoCity} />;
      })}
    </Stack>
  );
};
