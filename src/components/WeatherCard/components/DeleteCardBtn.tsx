import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppDispatch } from "@common/hooks";
import { removeCity } from "@store/slices/cities.slice.ts";

type Props = { cityKey: string };
export const DeleteCardBtn = ({ cityKey }: Props) => {
  const dispatch = useAppDispatch();
  const handleDeleteCard = () => {
    dispatch(removeCity(cityKey));
  };

  return (
    <IconButton aria-label="delete" size="small" onClick={handleDeleteCard}>
      <ClearIcon />
    </IconButton>
  );
};
