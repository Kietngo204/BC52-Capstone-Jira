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
  Snackbar,
  Stack,
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
import PopperModal from "../Popper/PopperModal";
import { AlertJiraFilled } from "../styled/styledAlert";
import { removeUserFromProject } from "../../apis/projectAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function DialogModal(props) {
  const { open, handleClose, project } = props;

  // Add Member
  const [openMember, setOpenMember] = useState(false);
  const [openAddMember, setOpenAddMember] = useState(false);

  // Delete Member
  const [anchorElDeleteMember, setAnchorElDeleteMember] = React.useState(null);
  const [isDeleteMember, setIsDeleteMember] = React.useState(false);
  const [openErrorDeleteMember, setOpenErrorDeleteMember] =
    React.useState(false);
  const [openSuccessDeleteMember, setOpenSuccessDeleteMember] =
    React.useState(false);

  const [member, setMember] = useState([]);

  const queryClient = useQueryClient();

  const { mutate: handleRemoveUserFromProject, error } = useMutation({
    mutationFn: (project) => {
      return removeUserFromProject(project);
    },
    onError: () => {
      setOpenErrorDeleteMember(true);
      handleCloseMember();
    },
    onSuccess: () => {
      setOpenSuccessDeleteMember(true);
      handleCloseMember();
      queryClient.invalidateQueries("projectManaDesktop");
      queryClient.invalidateQueries("getUserMobile");
    },
  });

  // Add Member
  const handleClickMember = () => {
    setOpenMember(!openMember);
  };

  const handleClickOpenAddMember = () => {
    setOpenAddMember(true);
  };

  const handleCloseAddMember = () => {
    setOpenAddMember(false);
  };

  // Delete Member

  const handleClickDeleteMember = (event) => {
    setAnchorElDeleteMember(anchorElDeleteMember ? null : event.currentTarget);
  };

  const handleCloseMember = () => {
    setAnchorElDeleteMember(null);
    setIsDeleteMember(false);
  };

  // Hàm đóng Alert thông báo
  const handleCloseDeleteMember = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorDeleteMember(false);
    setOpenSuccessDeleteMember(false);
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

                    <IconButton
                      sx={{ paddingRight: "30px" }}
                      onClick={(event) => {
                        handleClickDeleteMember(event);
                        setIsDeleteMember(true);
                        setMember(member);
                      }}
                    >
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

      {/* Modal nhắc nhở có nên xóa member */}
      <PopperModal
        anchorEl={anchorElDeleteMember}
        handleClose={handleCloseMember}
        handleRemoveUserFromProject={handleRemoveUserFromProject}
        member={member}
        isDeleteMember={isDeleteMember}
        projectIdDeleteMember={project.id}
      />

      {/* Alert thông báo lỗi và thành công */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={openSuccessDeleteMember}
          autoHideDuration={2000}
          onClose={handleCloseDeleteMember}
        >
          <AlertJiraFilled
            onClose={handleCloseDeleteMember}
            severity="success"
            sx={{ width: "100%" }}
          >
            Xóa member thành công
          </AlertJiraFilled>
        </Snackbar>
        <Snackbar
          open={openErrorDeleteMember}
          autoHideDuration={2000}
          onClose={handleCloseDeleteMember}
        >
          <AlertJiraFilled
            onClose={handleCloseDeleteMember}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </AlertJiraFilled>
        </Snackbar>
      </Stack>

      {/* Modal AddMember */}
      <DialogAddMember
        handleClose={handleCloseAddMember}
        open={openAddMember}
        projectIdAddMember={project.id}
      />
    </>
  );
}
