import { Stack } from "@mui/material";

import { AddCityBtn } from "./components";

import { SearchCitySelect } from "@/components";

export const CityAdding = () => {
  return (
    <Stack direction="row" gap={2}>
      <SearchCitySelect />
      <AddCityBtn />
    </Stack>
  );
};
