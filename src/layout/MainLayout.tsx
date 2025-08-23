// src/layouts/MainLayout.tsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline, Typography } from "@mui/material";
import HeaderLayout from "./HeaderLayout";
import SidebarLayout, { drawerWidth } from "./SidebarLayout";

const MainLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <CssBaseline />

      {/* Header */}
      <HeaderLayout onMenuClick={handleDrawerToggle} />

      {/* Sidebar */}
      <SidebarLayout mobileOpen={mobileOpen} onClose={handleDrawerToggle} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8, // offset AppBar
          ml: { md: `${drawerWidth}px` }, // offset for sidebar
        }}
      >
        <Outlet />
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: "center",
          borderTop: "1px solid #ddd",
          mt: "auto",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2026 Your Company. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default MainLayout;
