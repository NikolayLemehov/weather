import { Stack } from "@mui/material";

import { WeatherCardList } from "./components";

import { CityAdding } from "@/components/CityAdding/CityAdding.tsx";
import { LanguageSelect } from "@/components/LanguageSelect";
import { useGeoLocation } from "@/hooks/useGeoLocation.ts";

const App = () => {
  useGeoLocation();

  return (
    <Stack gap={3}>
      <Stack width={100} alignSelf="flex-end">
        <LanguageSelect />
      </Stack>
      <Stack alignItems="center">
        <CityAdding />
      </Stack>

      <WeatherCardList />
    </Stack>
  );
};

export default App;
