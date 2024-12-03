import { CardContent, styled } from "@mui/material";

export const WeatherCardContent = styled(CardContent, {
  shouldForwardProp: (prop) => prop !== "colorScheme",
})<{ colorScheme: "warm" | "cold" }>(({ theme, colorScheme }) => ({
  backgroundColor: theme.palette[colorScheme].bg,
  padding: "10px 15px",
  "&:last-child": { paddingBottom: "10px" },
}));
