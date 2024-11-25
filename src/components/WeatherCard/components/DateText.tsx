import { Typography, TypographyProps } from "@mui/material";

export const DateText = ({ children, ...props }: TypographyProps) => {
  return (
    <Typography fontSize="18px" lineHeight="26px" fontWeight={300} color="common.black" {...props}>
      {children}
    </Typography>
  );
};
