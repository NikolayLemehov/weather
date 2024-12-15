import { Stack } from "@mui/material";

import { WeatherCardList } from "./components";

import { CityAdding } from "@/components/CityAdding/CityAdding.tsx";
import { LanguageSelect } from "@/components/LanguageSelect";

const App = () => (
  <Stack gap={3}>
    <LanguageSelect />
    <CityAdding />

    <WeatherCardList />
  </Stack>
);

export default App;
