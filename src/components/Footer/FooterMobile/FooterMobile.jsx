import { Box, Typography } from "@mui/material";
import React from "react";

export default function FooterMobile() {
  return (
    <Box
      sx={{
        pt: 5,
        pl: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box>
        <img src="/img/jira.png" alt="jiraFooter" />
      </Box>
      <Box sx={{ padding: "0 8px" }}>
        <Typography sx={{ textAlign: "center" }}>
          © 2023{" "}
          <Typography component={"span"} sx={{ fontWeight: "600" }}>
            Capstone Jira - Ngô Tuấn Kiệt.
          </Typography>{" "}
          Design by Ngô Tuấn Kiệt
        </Typography>
      </Box>
    </Box>
  );
}
