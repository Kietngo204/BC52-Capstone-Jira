import { Box, Button, Popover, Typography } from "@mui/material";

import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

export default function PopoverDeleteTask(props) {
  const { anchorEl, handleClose, taskId, handleDeleteTask, taskName } = props;

  const open = Boolean(anchorEl);
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
      <Box>
        <Typography
          sx={{
            padding: "16px 16px 0 16px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ReportGmailerrorredIcon color="warning" sx={{ mr: 1 }} /> Are you
          sure delete{" "}
          <Typography component={"span"} color={"#b41e1e"} sx={{ ml: "6px" }}>
            {taskName}
          </Typography>{" "}
          ?
        </Typography>
        <Box textAlign={"end"} p={1}>
          <Button variant="outlined" color="inherit" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="contained"
            sx={{ ml: 1 }}
            onClick={() => {
              handleDeleteTask(taskId);
              handleClose();
            }}
          >
            Yes
          </Button>
        </Box>
      </Box>
    </Popover>
  );
}
