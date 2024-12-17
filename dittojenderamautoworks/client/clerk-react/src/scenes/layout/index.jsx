import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../state/api";
import { Navbar, Sidebar } from "../../components";

const Layout = () => {
  // Check if the screen is non-mobile
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Get user ID from Redux state
  const userId = useSelector((state) => state.global.userId);

  // Fetch user data
  const { data } = useGetUserQuery(userId);

  return (
    <Box
      display={isNonMobile ? "flex" : "block"}
      width="100%"
      minHeight="100vh"
    >
      {/* Sidebar */}
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <Box flexGrow={1} display="flex" flexDirection="column">
        {/* Navbar */}
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main Page Content */}
        <Box flexGrow={1} paddingBottom="20px">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
