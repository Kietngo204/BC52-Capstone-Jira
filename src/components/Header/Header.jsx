import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useUserContext } from "../../contexts/UserContext/UserContext";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header({ drawerWidth, handleDrawerToggle }) {
  const { currentUser, handleSignout } = useUserContext();
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: "#fff",
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          color="dark"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" color={"#000000"}>
          Capstone Jira
        </Typography>
        <Box display={"flex"} alignItems={"center"}>
          <img
            src={currentUser.avatar}
            alt="avatar"
            width={40}
            style={{ borderRadius: "50%" }}
          />
          <IconButton variant="text" onClick={handleSignout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
