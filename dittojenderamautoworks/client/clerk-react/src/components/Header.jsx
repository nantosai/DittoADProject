import React from "react";
import { Typography, Box, useTheme } from "@mui/material";

// Header
const Header = ({ title, subtitle }) => {
  // theme
  const theme = useTheme();
  return (
    <Box>
      {/* Title */}
      <Typography
        variant="h2"
        color={theme.palette.secondary.main}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>

      {/* Subtitle */}
      <Typography variant="h5" color={theme.palette.secondary.light}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
