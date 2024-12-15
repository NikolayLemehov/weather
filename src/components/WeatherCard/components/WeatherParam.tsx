import { styled, Typography, TypographyProps } from "@mui/material";
import { useSelector } from "react-redux";
import { selectIsWarmWeather } from "@store/slices/cities/cities.selectors.ts";

const ColoredValue = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "colorScheme",
})<{ colorScheme: "warm" | "cold" } & TypographyProps>(({ theme, colorScheme }) => ({
  color: theme.palette[colorScheme].graph,
}));

type Props = {
  name: string;
  unit?: string;
  value?: number;
  cityKey: string;
};
export const WeatherParam = ({ name, value, unit, cityKey }: Props) => {
  const isWarmWeather = useSelector(selectIsWarmWeather(cityKey));

  return (
    <Typography fontSize="12px" lineHeight="18px" fontWeight={400} color="common.black">
      {name}:{" "}
      <ColoredValue colorScheme={isWarmWeather ? "warm" : "cold"} component="span">
        {Math.round(value ?? 0)} {unit}
      </ColoredValue>
    </Typography>
  );
};
