/*
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setMode } from "../state";
import { useUser, useClerk } from "@clerk/clerk-react";
import {
  AppBar,
  useTheme,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
} from "@mui/material";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
  GitHub,
} from "@mui/icons-material";

import { FlexBetween } from ".";
import profileImage from "../assets/profile.jpeg";


// Navbar
const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  // redux dispatch items
  const dispatch = useDispatch();
  // theme
  const theme = useTheme();

  // nav state
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  // handle
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const { signOut } = useClerk();

  const handleClose = () => {
     setAnchorEl(null)
     signOut()
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Side *}
        <FlexBetween>
          {/* Sidebar Menu *}
          <IconButton
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title="Toggle Sidebar"
            sx = {{color: theme.palette.icons.inactive}}
          >
            <MenuIcon />
          </IconButton>

          {/* Search *}
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
            title="Search"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search sx={{color: theme.palette.icons.inactive}}/>
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* Right Side *}
        <FlexBetween gap="1.5rem">
          {/* Source Code */
          
          /* Dark/Light Mode *}
          <IconButton onClick={() => dispatch(setMode())} title="">
            {theme.palette.mode === "dark" ? (
              <LightModeOutlined sx={{color: theme.palette.icons.inactive, fontSize: "25px" }} />
            ) : (
              <DarkModeOutlined sx={{color: theme.palette.icons.inactive, fontSize: "25px" }} />
            )}
          </IconButton>

          {/* Settings *}
          <IconButton title="Setting">
            <SettingsOutlined sx={{color: theme.palette.icons.inactive, fontSize: "25px" }} />
          </IconButton>

          {/* User *}
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
              title={user.name}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary.main }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary.main }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{
                  color: theme.palette.icons.inactive,
                  fontSize: "25px",
                }}
              />
            </Button>

            {/* DropDown *}
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              {/* log out *}
              <MenuItem onClick={handleClose} title="Log Out">
                Log Out
              </MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
//////////////////////////////////////////////////////////////////////////////////////////////////
*/
//PADU ANUSHKA 

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
        position: "static",
        background: "none",
        boxShadow: "none",
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
