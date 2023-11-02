import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
        {"Do you want log out ?"}
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <DialogContentText id="alert-dialog-description">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              src="/img/animation_ask_small.gif"
              alt="ask"
              sx={{ width: 150, height: 150 }}
            />
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-evenly" }}>
        <Button onClick={handleClose} variant="outlined">
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
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
