// src/layouts/SidebarLayout.tsx
import React from "react";
import { Drawer, Box, Typography, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

interface SidebarLayoutProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ mobileOpen, onClose }) => {
  const navItems = [
    { label: "Home", path: "/", icon: <HomeIcon /> },
    { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { label: "Chat", path: "/chat", icon: <SettingsIcon /> },

    
    
  ];

  const drawerContent = (
    <Box sx={{ py: 2, width: drawerWidth }}>
      {/* Close button (mobile only) */}
      <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
        <IconButton onClick={onClose} sx={{ display: { xs: "flex", md: "none" } }}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>

      <Typography variant="h6" gutterBottom>
        Navigation
      </Typography>

      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              onClick={onClose}
              sx={{
                "&.active": {
                  bgcolor: "primary.main",
                  color: "white",
                  "& .MuiListItemIcon-root": { color: "white" },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box component="nav">
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default SidebarLayout;
export { drawerWidth };
