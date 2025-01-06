import { SyntheticEvent, useState } from "react";
import { GeoCityApiType, useSearchCitiesQuery } from "@store/services/openWeatherApi";
import { Autocomplete, Popper, PopperProps } from "@mui/material";
import { setSelectedCity } from "@store/slices/cities/cities.slice.ts";
import { useAppDispatch } from "@common/hooks";
import { styles } from "@common/constants.ts";

import { DebounceTextField } from "./components";

const CustomPopper = (props: PopperProps) => (
  <Popper
    {...props}
    placement="bottom"
    className="TestPopper"
    sx={{
      py: "10px",
      "& .MuiAutocomplete-paper": { boxShadow: styles.shadow.main },
    }}
  />
);
export const SearchCitySelect = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(inputValue);
  const { data: cities, isLoading } = useSearchCitiesQuery(debouncedValue, { skip: debouncedValue.length < 3 });

  const handleInputChange = (...args: [SyntheticEvent<Element, Event>, string, string]) => {
    const newInputValue = args[1];
    setInputValue(newInputValue);
  };
  const handleChange = (value: string): void => setDebouncedValue(value);
  const handleCitySelect = (_event: SyntheticEvent, value: GeoCityApiType | null) => {
    dispatch(setSelectedCity(value));
  };

  return (
    <Autocomplete
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleCitySelect}
      options={cities || []}
      getOptionLabel={(option) => [option.name, option.country, option.state].filter(Boolean).join(", ")}
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
      sx={{
        minWidth: 400,
        "* .MuiInputBase-root": { boxShadow: styles.shadow.main },
      }}
      PopperComponent={CustomPopper}
    />
  );
};
