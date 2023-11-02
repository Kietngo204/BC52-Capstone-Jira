import { Box, Typography } from "@mui/material";
import React from "react";

export default function FooterDesktop() {
  return (
    <Box
      sx={{
        pt: 5,
        pl: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography>
          © 2023{" "}
          <Typography component={"span"} sx={{ fontWeight: "600" }}>
            Capstone Jira - Ngô Tuấn Kiệt.
          </Typography>{" "}
          Design by Ngô Tuấn Kiệt
        </Typography>
      </Box>
      <Box sx={{ width: "calc(100%/3)" }}>
        <img src="/img/jira.png" alt="jiraFooter" />
      </Box>
    </Box>
  );
}
