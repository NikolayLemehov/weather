import { Typography } from "@mui/material";

type Props = {
  name: string;
  value?: number;
};
export const WeatherParam = ({ name, value }: Props) => {
  return (
    <Typography fontSize="12px" lineHeight="18px" fontWeight={400} color="common.black">
      {name}:{" "}
      <Typography color="warm.graph" component="span">
        {Math.round(value ?? 0)} m/s
      </Typography>
    </Typography>
  );
};
