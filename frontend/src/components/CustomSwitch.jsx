import React from "react";
import { IconButton, Box } from "@mui/material";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";
import { useThemeToggle } from "../utils/ThemeContext";

const CustomSwitch = () => {
  const theme = useTheme();
  const toggleTheme = useThemeToggle();

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "16px",
        right: "16px",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        width: "60px",
        height: "30px",
        backgroundColor: theme.palette.mode === "light" ? "#e3e3e3" : "#262626",
        marginBottom: "16px",
        borderRadius: "15px",
        cursor: "pointer",
        overflow: "hidden",
        transition: "background-image 0.3s ease",
        "&:hover": {
          filter: "brightness(90%)",
        },
      }}
      onClick={handleToggle}
    >
      {theme.palette.mode === "light" ? (
        <IconButton
          sx={{
            position: "absolute",
            left: "-2px",
            transition: "left 0.3s ease",
            "&:focus, &:active": {
              outline: "none",
              boxShadow: "none",
            },
            "& .MuiSvgIcon-root": {
              outline: "none",
              boxShadow: "none",
            },
          }}
        >
          <LightModeIcon style={{ color: "orange" }} />
        </IconButton>
      ) : (
        <IconButton
          sx={{
            position: "absolute",
            left: "calc(100% - 34px)",
            transition: "left 0.3s ease",
            "&:focus, &:active": {
              outline: "none",
              boxShadow: "none",
            },
            "& .MuiSvgIcon-root": {
              outline: "none",
              boxShadow: "none",
            },
          }}
        >
          <ModeNightIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default CustomSwitch;
