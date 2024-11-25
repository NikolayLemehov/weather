import { Button as ButtonMui, ButtonProps, Divider, Stack, styled } from "@mui/material";
import { useState } from "react";

const Button = styled(ButtonMui)(({ theme }) => ({
  minWidth: "auto",
  padding: "10px",
  fontSize: "22px",
  lineHeight: "32px",
  textTransform: "none",
  color: theme.palette.grey[400],
  backgroundColor: "transparent",
  "& .active": { color: theme.palette.common.black },
  boxShadow: "none",
}));

export const TemperatureTypeToggle = ({ ...props }: ButtonProps) => {
  const [celsius, setCelsius] = useState(false);
  const handleClick = () => setCelsius((prev) => !prev);

  return (
    <Button onClick={handleClick} {...props}>
      <Stack direction="row" gap={1}>
        <span className={celsius ? "active" : undefined}>°C</span>
        <Divider orientation="vertical" flexItem sx={{ borderColor: "grey.500" }} />
        <span className={celsius ? undefined : "active"}>°F</span>
      </Stack>
    </Button>
  );
};
