import { Stack } from "@mui/material";

import { WeatherCardList } from "./components";

import { CityAdding } from "@/components/CityAdding/CityAdding.tsx";

const App = () => (
  <Stack gap={3}>
    <CityAdding />

    <WeatherCardList />
  </Stack>
);

export default App;
