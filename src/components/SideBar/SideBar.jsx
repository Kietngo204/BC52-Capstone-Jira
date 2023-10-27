import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SideBar.module.css";

export default function SideBar({
  container,
  drawerWidth,
  mobileOpen,
  handleDrawerToggle,
}) {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState("Project Management");

  const navigate = useNavigate();

  const handleClick = (text) => {
    setSelectedItem(text);
    if (text === "Create Project") {
      navigate("/createProject");
    } else if (text === "Project Management") {
      navigate("/projectManagement");
    } else if (text === "Project Detail") {
    } else if (text === "My Profile") {
      navigate("/profile");
    } else if (text === "User Management") {
      navigate("/user");
    }
  };

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === "/createProject") {
      setSelectedItem("Create Project");
    } else if (pathname.startsWith("/projectDetail/")) {
      // Kiểm tra xem địa chỉ bắt đầu bằng '/projectDetail/' để kích hoạt nút
      setSelectedItem("Project Detail");
    } else if (pathname === "/profile") {
      setSelectedItem("My Profile");
    } else if (pathname === "/user") {
      setSelectedItem("User Management");
    } else {
      setSelectedItem("Project Management");
    }
  }, [location]);

  const icons = [
    NoteAddOutlinedIcon,
    DescriptionOutlinedIcon, // Use your custom icon component here
    DocumentScannerOutlinedIcon, // Use your custom icon component here
    AccountBoxOutlinedIcon,
    PeopleAltOutlinedIcon,
  ];

  const drawer = (
    <div>
      <Toolbar
        sx={{
          backgroundImage: `url('/img/JIRAtitle.png')`,
          width: "100%",
          height: "64px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingTop: "10px",
        }}
      />
      <Divider />
      <List>
        {[
          "Create Project",
          "Project Management",
          "Project Detail",
          "My Profile",
          "User Management",
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                handleClick(text);
              }}
              className={`${styles.listItemButton} ${
                selectedItem === text ? styles.active : ""
              }`}
              sx={{
                transition: "all 0.5s",

                "&:hover": { color: "#ee7e9e" },
              }}
              disabled={
                text === "Project Detail" &&
                !location.pathname.startsWith("/projectDetail/")
              }
            >
              <ListItemIcon>{React.createElement(icons[index])}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
