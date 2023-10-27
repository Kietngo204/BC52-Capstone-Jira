import { Box, Button, Popper, Typography } from "@mui/material";
import React from "react";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

export default function PopperModal(props) {
  const {
    anchorEl,
    isDeleteProject,
    name,
    handleDeleteProject,
    projectId,
    handleClose,
    isDeleteMember,
    handleRemoveUserFromProject,
    member,
    projectIdDeleteMember,
    isAddMember,
    projectIdAddMember,
    user,
    handleAddMember,
  } = props;

  const open = Boolean(anchorEl);

  if (isDeleteProject) {
    return (
      <Popper
        open={open}
        anchorEl={anchorEl}
        sx={{
          zIndex: 11000,
          paddingBottom: "10px",
        }}
        placement="top"
      >
        <Box
          sx={{
            p: 3,
            backgroundColor: "#fff",
            border: "1px solid red",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "100%",
              left: "47%",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "10px solid red",
            }}
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <HelpOutlineOutlinedIcon color="error" />{" "}
            <Typography sx={{ marginLeft: "5px" }}>
              Are you sure to delete {name}?
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              marginTop: "16px",
            }}
          >
            <Button color="secondary" variant="outlined" onClick={handleClose}>
              No
            </Button>
            <Button
              color="error"
              variant="outlined"
              sx={{ marginLeft: "5px" }}
              onClick={() => {
                handleDeleteProject(projectId);
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Popper>
    );
  } else if (isDeleteMember) {
    return (
      <>
        <Popper
          open={open}
          anchorEl={anchorEl}
          sx={{
            zIndex: 11000,
            paddingBottom: "10px",
          }}
          placement="top"
        >
          <Box
            sx={{
              p: 3,
              backgroundColor: "#fff",
              border: "1px solid red",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                left: "47%",
                width: 0,
                height: 0,
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <HelpOutlineOutlinedIcon color="error" />{" "}
              <Typography sx={{ marginLeft: "5px" }}>
                Are you sure to delete {member.name}?
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                marginTop: "16px",
              }}
            >
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleClose}
              >
                No
              </Button>
              <Button
                color="error"
                variant="outlined"
                sx={{ marginLeft: "5px" }}
                onClick={() => {
                  handleRemoveUserFromProject({
                    userId: member.userId,
                    projectId: projectIdDeleteMember,
                  });
                }}
              >
                Yes
              </Button>
            </Box>
          </Box>
        </Popper>
      </>
    );
  } else if (isAddMember) {
    return (
      <>
        <Popper
          open={open}
          anchorEl={anchorEl}
          sx={{
            zIndex: 11000,
            paddingBottom: "10px",
          }}
          placement="top"
        >
          <Box
            sx={{
              p: 3,
              backgroundColor: "#fff",
              border: "1px solid #74a977",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                left: "47%",
                width: 0,
                height: 0,
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderTop: "10px solid #74a977",
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <HelpOutlineOutlinedIcon color="success" />{" "}
              <Typography sx={{ marginLeft: "5px" }}>
                Are you sure to add {user.name}?
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                marginTop: "16px",
              }}
            >
              <Button color="inherit" variant="outlined" onClick={handleClose}>
                No
              </Button>
              <Button
                color="primary"
                variant="outlined"
                sx={{ marginLeft: "5px" }}
                onClick={() => {
                  handleAddMember({
                    userId: user.userId,
                    projectId: projectIdAddMember,
                  });
                }}
              >
                Yes
              </Button>
            </Box>
          </Box>
        </Popper>
      </>
    );
  }
}
