import { Popover, Typography } from "@mui/material";
import React from "react";

export default function PopoverModal(props) {
  const { anchorEl, handleClose, isMember, isAddMember } = props;
  const open = Boolean(anchorEl);

  if (isMember) {
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
        <Typography sx={{ p: 2 }}>Member</Typography>
      </Popover>
    );
  } else if (isAddMember) {
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
        <Typography sx={{ p: 2 }}>Add member</Typography>
      </Popover>
    );
  }
}
