import { Typography, TypographyProps } from "@mui/material";

export const CityText = ({ children, ...props }: TypographyProps) => {
  return (
    <Typography fontSize="16px" lineHeight="23px" fontWeight={400} color="common.black" {...props}>
      {children}
    </Typography>
  );
};
