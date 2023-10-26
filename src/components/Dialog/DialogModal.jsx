import {
  AppBar,
  Avatar,
  Box,
  Chip,
  Collapse,
  Dialog,
  Divider,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Transition } from "./TransitionDialog";
import FaceIcon from "@mui/icons-material/Face";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import DialogAddMember from "./DialogAddMember";
import LoadingCircular from "../Loading/LoadingCircular";

export default function DialogModal(props) {
  const { open, handleClose, project } = props;

  const [openMember, setOpenMember] = useState(true);
  const [openAddMember, setOpenAddMember] = useState(false);

  const handleClickMember = () => {
    setOpenMember(!openMember);
  };

  const handleClickOpenAddMember = () => {
    setOpenAddMember(true);
  };

  const handleCloseAddMember = () => {
    setOpenAddMember(false);
  };
  console.log(project);

  if (!project) {
    return <LoadingCircular />;
  }
  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: "#fff",
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
              color={"#000"}
              fontWeight={800}
              fontSize={"35px"}
            >
              Project Setting
            </Typography>
            <IconButton
              edge="start"
              color="default"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Divider />
        <List>
          <ListItem sx={{ padding: "0 40px" }}>
            <ListItemText
              primary="Name"
              primaryTypographyProps={{
                color: "#172B4D",
                fontWeight: "bold",
                fontSize: "30px",
              }}
            />
            <Typography
              sx={{
                color: "#000",
                fontWeight: "400",
                fontSize: "20px",
              }}
            >
              {project.projectName}
            </Typography>
          </ListItem>

          <Divider />

          <ListItem sx={{ padding: "10px 40px" }}>
            <ListItemText
              primary="Creator"
              primaryTypographyProps={{
                color: "#172B4D",
                fontWeight: "bold",
                fontSize: "30px",
              }}
            />
            <Chip
              label={project.creator?.name}
              variant="outlined"
              color="success"
              icon={<FaceIcon />}
            />
          </ListItem>

          <Divider />

          <ListItem sx={{ padding: "10px 40px" }}>
            <ListItemText
              primary="Member"
              primaryTypographyProps={{
                color: "#172B4D",
                fontWeight: "bold",
                fontSize: "30px",
              }}
            />
            <Chip
              label="Add"
              variant="outlined"
              color="warning"
              sx={{ p: 2 }}
              onClick={() => {
                handleClickOpenAddMember();
              }}
            />
          </ListItem>

          <ListItem
            sx={{ flexDirection: "column", backgroundColor: "#fafafa" }}
          >
            <ListItemButton
              onClick={handleClickMember}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                padding: "0 30px",
              }}
            >
              <Box display={"flex"}>
                {project?.members?.slice(0, 2).map((member) => {
                  return (
                    <Avatar
                      alt={member.name}
                      src={member.avatar}
                      key={member.userId}
                    />
                  );
                })}
                {project?.members?.length > 2 && (
                  <Fab
                    size="small"
                    color="warning"
                    aria-label="add"
                    sx={{ boxShadow: "none", marginRight: "3px" }}
                  >
                    +{project?.members?.length - 2}
                  </Fab>
                )}
              </Box>

              {openMember ? <ExpandMoreIcon /> : <ChevronRightIcon />}
            </ListItemButton>
            <Collapse
              in={openMember}
              sx={{ width: "100%", marginTop: "8px" }}
              timeout="auto"
              unmountOnExit
            >
              {project?.members?.map((member) => {
                return (
                  <Box
                    key={member.userId}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      sx={{ padding: "10px 30px" }}
                    >
                      <Avatar
                        alt={member.name}
                        src={member.avatar}
                        sx={{ width: 35, height: 35 }}
                      />
                      <Typography sx={{ marginLeft: "5px" }}>
                        {member.name}
                      </Typography>
                    </Box>

                    <IconButton sx={{ paddingRight: "30px" }}>
                      <HighlightOffOutlinedIcon color="error" />
                    </IconButton>
                  </Box>
                );
              })}
            </Collapse>
          </ListItem>

          <Divider />
        </List>
      </Dialog>

      <DialogAddMember
        handleClose={handleCloseAddMember}
        open={openAddMember}
        projectIdAddMember={project.id}
      />
    </>
  );
}
