import { Stack } from "@mui/material";

import { WeatherCardList } from "./components";

import { CityAdding } from "@/components/CityAdding/CityAdding.tsx";
import { LanguageSelect } from "@/components/LanguageSelect";
import { useGeoLocation } from "@/hooks/useGeoLocation.ts";

const App = () => {
  useGeoLocation();

  return (
    <Stack>
      <Stack width={100} alignSelf="flex-end" mb="70px">
        <LanguageSelect />
      </Stack>
      <Stack alignItems="center" mb="122px">
        <CityAdding />
      </Stack>

      <WeatherCardList />
    </Stack>
  );
};

export default App;
