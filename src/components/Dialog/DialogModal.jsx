import {
  AppBar,
  Avatar,
  Box,
  Button,
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
import PopperModal from "../Popper/PopperModal";
import { AlertJiraFilled } from "../styled/styledAlert";
import { deleteProject, removeUserFromProject } from "../../apis/projectAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import EditProject from "../../modules/ProjectManagement/EditProject";

export default function DialogModal(props) {
  const {
    open,
    handleClose,
    project,
    projectManagement,
    setProjectSetting,
    isOpenEdit,
  } = props;

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

  // Project information
  const [openInfo, setOpenInfo] = useState(false);

  // Delete Project
  const [openError, setOpenError] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [anchorElDelete, setAnchorElDelete] = React.useState(null);
  const [isDelete, setIsDelete] = React.useState(false);
  const [projectIdDelete, setProjectIdDelete] = React.useState("");
  const [projectNameDelete, setProjectNameDelete] = React.useState("");

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
      queryClient.invalidateQueries("projectManaMobile");
    },
  });

  const { mutate: handleDeleteProject, error: errorDeleteProject } =
    useMutation({
      mutationFn: (projectId) => deleteProject(projectId),
      onError: () => {
        setOpenError(true);
        setIsDelete(false);
      },
      onSuccess: () => {
        setOpenSuccess(true);
        queryClient.invalidateQueries("projectCategoryCreate");
        setIsDelete(false);

        setTimeout(() => {
          handleClose();
        }, 1500);
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

  // Hàm đóng Alert thông báo Delete Member
  const handleCloseDeleteMember = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorDeleteMember(false);
    setOpenSuccessDeleteMember(false);
  };

  // Project information
  const handleClickInfo = () => {
    setOpenInfo(!openInfo);
  };

  /* Delete Project */
  // Hàm đóng Alert thông báo Delete Project
  const handleCloseDeleteProject = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpenSuccess(false);
  };

  // Hàm đóng mở PopperDelete

  const handleClickDelete = (event) => {
    setAnchorElDelete(event.currentTarget);
    setIsDelete(true);
  };

  const handleCloseDelete = () => {
    setAnchorElDelete(null);
    setIsDelete(false);
  };

  React.useEffect(() => {
    const selectedProject = projectManagement.find(
      (project1) => project1?.id === project?.id
    );

    if (selectedProject) {
      // Nếu tìm thấy, cập nhật projectSetting với dự án cụ thể
      setProjectSetting(selectedProject);
    } else {
      // Nếu không tìm thấy, có thể đặt projectSetting thành một giá trị mặc định hoặc thực hiện xử lý khác tùy thuộc vào yêu cầu của bạn.
    }
  }, projectManagement);

  if (!project) {
    return null; // Không có dự án, không hiển thị gì cả
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
        {project && (
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

            {/* Member */}

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
            {/* Project information */}
            <ListItem sx={{ padding: "10px 40px" }}>
              <ListItemText
                primary="Project information"
                primaryTypographyProps={{
                  color: "#172B4D",
                  fontWeight: "bold",
                  fontSize: "30px",
                }}
              />
            </ListItem>

            <ListItem
              sx={{ flexDirection: "column", backgroundColor: "#fafafa" }}
            >
              <ListItemButton
                onClick={handleClickInfo}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 30px",
                }}
              >
                <Box display={"flex"}>
                  <Typography fontWeight={600} color="#000000D9">
                    Show and edit
                  </Typography>
                </Box>

                {openInfo ? <ExpandMoreIcon /> : <ChevronRightIcon />}
              </ListItemButton>
              <Collapse
                in={openInfo}
                sx={{ width: "100%", marginTop: "8px" }}
                timeout="auto"
                unmountOnExit
              >
                <EditProject projectId={project.id} isOpenEdit={isOpenEdit} />
              </Collapse>
            </ListItem>

            <Divider />

            <ListItem sx={{ width: "100%", padding: "10px 30px" }}>
              <Button
                sx={{
                  backgroundColor: "#ef4444",
                  width: "100%",
                  color: "#fff",

                  "&:hover": {
                    backgroundColor: "#ef4444",
                  },
                }}
                onClick={(event) => {
                  handleClickDelete(event);
                  setProjectIdDelete(project.id);
                  setProjectNameDelete(project.projectName);
                }}
              >
                Delete Project
              </Button>
            </ListItem>
          </List>
        )}
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
        projectManagement={projectManagement}
        setProjectSetting={setProjectSetting}
      />

      {/* Modal nhắc nhở có nên xóa project */}
      <PopperModal
        anchorEl={anchorElDelete}
        handleClose={handleCloseDelete}
        handleDeleteProject={handleDeleteProject}
        projectId={projectIdDelete}
        name={projectNameDelete}
        isDeleteProject={isDelete}
      />

      {/* Alert thông báo lỗi và thành công */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={openSuccess}
          autoHideDuration={2000}
          onClose={handleCloseDeleteProject}
        >
          <AlertJiraFilled
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Xóa project thành công
          </AlertJiraFilled>
        </Snackbar>
        <Snackbar
          open={openError}
          autoHideDuration={2000}
          onClose={handleCloseDeleteProject}
        >
          <AlertJiraFilled
            onClose={handleCloseDeleteProject}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorDeleteProject}
          </AlertJiraFilled>
        </Snackbar>
      </Stack>
    </>
  );
}
