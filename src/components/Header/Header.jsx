import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useUserContext } from "../../contexts/UserContext/UserContext";
import LogoutIcon from "@mui/icons-material/Logout";
import DialogLogout from "../Dialog/DialogLogout";
import { useNavigate } from "react-router-dom";

export default function Header({ drawerWidth, handleDrawerToggle }) {
  const { currentUser, handleSignout } = useUserContext();
  const [openLogout, setOpenLogout] = React.useState(false);

  const navigate = useNavigate();

  const handleClickOpenLogout = () => {
    setOpenLogout(true);
  };

  const handleCloseLogout = () => {
    setOpenLogout(false);
  };
  return (
    <>
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
          <Avatar
            src="/img/jira.png"
            alt="jira"
            variant="square"
            sx={{ width: 100, cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
          />
          {!!currentUser ? (
            <Box
              display={"flex"}
              alignItems={"center"}
              sx={{ cursor: "pointer" }}
            >
              <img
                src={currentUser.avatar}
                alt="avatar"
                width={40}
                style={{ borderRadius: "50%" }}
                onClick={() => {
                  navigate("/profile");
                }}
              />
              <IconButton
                variant="text"
                onClick={() => {
                  handleClickOpenLogout();
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: "flex", color: "#000" }}>
              <Typography
                sx={{
                  m: 1,
                  pr: 2,
                  borderRight: "1px solid #000",
                  cursor: "pointer",
                  transition: "all 0.5s",

                  ":hover": {
                    color: "#af3737",
                  },
                }}
                onClick={() => {
                  navigate("/sign-in");
                }}
              >
                Log in
              </Typography>
              <Typography
                sx={{
                  m: 1,
                  cursor: "pointer",
                  transition: "all 0.5s",

                  ":hover": {
                    color: "#af3737",
                  },
                }}
                onClick={() => {
                  navigate("/sign-up");
                }}
              >
                Register
              </Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <DialogLogout
        open={openLogout}
        handleClose={handleCloseLogout}
        handleSignout={handleSignout}
      />
    </>
  );
}
