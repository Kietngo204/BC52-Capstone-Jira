import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";

export default function DialogLogout(props) {
  const { open, handleClose, handleSignout } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth={"xs"}
      sx={{
        textAlign: "center",
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ fontWeight: 600, p: 0, pt: 1 }}
      >
        {"Do you want to log out?"}
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            src="/img/animation_ask_small.gif"
            alt="ask"
            sx={{ width: 150, height: 150 }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-evenly" }}>
        <Button onClick={handleClose} variant="outlined" size="large">
          No
        </Button>
        <Button
          onClick={() => {
            handleSignout();
            handleClose();
          }}
          autoFocus
          color="error"
          variant="contained"
          size="large"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
