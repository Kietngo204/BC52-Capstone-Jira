import { Box, Chip, Popover, Typography } from "@mui/material";
import React from "react";

import ProjectMember from "../../modules/ProjectManagement/ProjectManagementDesktop/ProjectMember";
import ProjectAddMember from "../../modules/ProjectManagement/ProjectManagementDesktop/ProjectAddMember";

export default function PopoverModal(props) {
  const {
    anchorEl,
    handleClose,
    isMember,
    isAddMember,
    members,
    projectIdDeleteMember,
    projectIdAddMember,
  } = props;

  const open = Boolean(anchorEl);

  if (isMember) {
    return (
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Box display={"flex"} flexDirection={"column"}>
          <Chip
            sx={{ p: 2, m: 2 }}
            label="All Member"
            color="warning"
            size="medium"
          />
          {members.map((member) => {
            return (
              <ProjectMember
                key={member.userId}
                member={member}
                projectIdDeleteMember={projectIdDeleteMember}
                handleCloseMember={handleClose}
              />
            );
          })}
        </Box>
      </Popover>
    );
  } else if (isAddMember) {
    return (
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <Box display={"flex"} flexDirection={"column"}>
          <ProjectAddMember projectIdAddMember={projectIdAddMember} />
        </Box>
      </Popover>
    );
  }
}
