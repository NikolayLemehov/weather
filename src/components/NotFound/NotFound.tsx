import { Stack, Typography } from "@mui/material";

export const NotFound = () => {
  return (
    <Stack alignItems="center" height="100%">
      <Typography component="h1" variant="h1">
        404
      </Typography>
      <Typography>
        Take me back to the <a href="/">home page</a>.
      </Typography>
    </Stack>
  );
};
