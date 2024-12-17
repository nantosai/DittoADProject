import React from "react";
import { useDispatch } from "react-redux";
import { setMode } from "../state";
import { UserButton } from "@clerk/clerk-react";
import {
  AppBar,
  useTheme,
  Toolbar,
  IconButton,
  InputBase,
  Box,
} from "@mui/material";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";

import { FlexBetween } from ".";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        position: "sticky",
        background: "none",
        backgroundColor: theme.palette.background.default,
        boxShadow: "none",
        top: 0,
        zIndex: 1100,
        
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Side */}
        <FlexBetween>
          {/* Sidebar Menu */}
          <IconButton
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            sx={{ color: theme.palette.icons.inactive }}
            title="Toggle Sidebar"
          >
            <MenuIcon />
          </IconButton>

          {/* Search */}
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="1rem"
            p="0.1rem 1rem"
            title="Search"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search sx={{ color: theme.palette.icons.inactive }} />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* Right Side */}
        <FlexBetween gap="1.5rem">
          {/* Dark/Light Mode */}
          <IconButton
            onClick={() => dispatch(setMode())}
            title="Toggle Dark/Light Mode"
          >
            {theme.palette.mode === "dark" ? (
              <LightModeOutlined
                sx={{ color: theme.palette.icons.inactive, fontSize: "25px" }}
              />
            ) : (
              <DarkModeOutlined
                sx={{ color: theme.palette.icons.inactive, fontSize: "25px" }}
              />
            )}
          </IconButton>

          {/* Settings */}
          <IconButton title="Settings">
            <SettingsOutlined
              sx={{ color: theme.palette.icons.inactive, fontSize: "25px" }}
            />
          </IconButton>

          {/* User Profile */}
          <UserButton />
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
