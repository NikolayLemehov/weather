import { Button } from "@mui/material";
import { useAppDispatch } from "@common/hooks";
import { addSelectedCity } from "@store/slices/cities.slice.ts";

export const AddCityBtn = () => {
  const dispatch = useAppDispatch();
  const handleAddCity = () => {
    dispatch(addSelectedCity());
  };

  return <Button onClick={handleAddCity}>Add city</Button>;
};
