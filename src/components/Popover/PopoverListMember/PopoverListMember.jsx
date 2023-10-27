import { Avatar, Box, Popover, Typography } from "@mui/material";
import React from "react";

export default function PopoverListMember(props) {
  const { anchorEl, handleClose, projectDetail } = props;

  const open = Boolean(anchorEl);
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Box sx={{ maxHeight: "50vh", minWidth: "250px" }}>
        <Typography sx={{ p: 2 }}>Member</Typography>

        {projectDetail.members.map((member) => {
          return (
            <Box
              key={member.userId}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <Avatar alt={member.name} src={member.avatar} />
              <Typography>{member.name}</Typography>
            </Box>
          );
        })}
      </Box>
    </Popover>
  );
}
