import { Box, Typography } from "@mui/material";
import React from "react";
import MediaQueries from "../../components/MediaQueries/MediaQueries";
import ProjectManagementDesktop from "./ProjectManagementDesktop";

export default function ProjectManagement() {
  const { isDesktop, isTablet, isMobile } = MediaQueries();
  return (
    <Box>
      {isMobile && <Typography>Mobile</Typography>}
      {isTablet && <Typography>Tablet</Typography>}
      {isDesktop && <ProjectManagementDesktop />}
    </Box>
  );
}
