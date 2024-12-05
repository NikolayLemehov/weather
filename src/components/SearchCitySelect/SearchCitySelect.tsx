import { SyntheticEvent, useState } from "react";
import { useSearchCitiesQuery } from "@store/services/openWeatherApi";
import { Autocomplete } from "@mui/material";

import { DebounceTextField } from "./components";

export const SearchCitySelect = () => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(inputValue);
  const { data: cities, isLoading } = useSearchCitiesQuery(debouncedValue, { skip: debouncedValue.length < 3 });

  const handleInputChange = (...args: [SyntheticEvent<Element, Event>, string, string]) => {
    const newInputValue = args[1];
    setInputValue(newInputValue);
  };
  const handleChange = (value: string): void => setDebouncedValue(value);

  return (
    <Autocomplete
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={cities || []}
      getOptionLabel={(option) => `${option.name}, ${option.country}, ${option.state}`}
      loading={isLoading}
      renderInput={(params) => (
        <DebounceTextField
          {...params}
          debounceTimeout={500}
          handleDebounce={handleChange}
          label="City"
          placeholder="Search city"
        />
      )}
      sx={{ minWidth: 400 }}
    />
  );
};
