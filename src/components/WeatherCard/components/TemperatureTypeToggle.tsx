import { Button as ButtonMui, ButtonProps, Divider, Stack, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@common/hooks";
import { selectCityKeysMap } from "@store/slices/cities/cities.selectors.ts";
import { toggleTemperatureType } from "@store/slices/cities/cities.slice.ts";

const Button = styled(ButtonMui)(({ theme }) => ({
  minWidth: "auto",
  padding: "5px",
  fontSize: "22px",
  lineHeight: "32px",
  textTransform: "none",
  color: theme.palette.grey[400],
  backgroundColor: "transparent",
  "& .active": { color: theme.palette.common.black },
  boxShadow: "none",
}));

type Props = ButtonProps & {
  cityKey: string;
};

export const TemperatureTypeToggle = ({ cityKey, ...props }: Props) => {
  const dispatch = useAppDispatch();
  const isCelsius = useSelector(selectCityKeysMap)[cityKey]?.temperatureType === "celsius";
  const handleClick = () => dispatch(toggleTemperatureType(cityKey));

  return (
    <Button onClick={handleClick} {...props}>
      <Stack direction="row" gap={1}>
        <span className={isCelsius ? "active" : undefined}>°C</span>
        <Divider orientation="vertical" flexItem sx={{ borderColor: "grey.500" }} />
        <span className={isCelsius ? undefined : "active"}>°F</span>
      </Stack>
    </Button>
  );
};
