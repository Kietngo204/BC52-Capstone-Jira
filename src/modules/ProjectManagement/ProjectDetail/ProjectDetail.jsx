import React from "react";
import { useParams } from "react-router-dom";
import { getProjectDetail } from "../../../apis/projectAPI";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import AddIcon from "@mui/icons-material/Add";
import {
  Avatar,
  Box,
  Button,
  Fab,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PopoverListMember from "../../../components/Popover/PopoverListMember";

export default function ProjectDetail() {
  const { projectId } = useParams();

  const [anchorElListMember, setAnchorElListMember] = React.useState(null);

  const { data: projectDetail = [], isLoading } = useQuery({
    queryKey: ["projectEdit", projectId],
    queryFn: () => getProjectDetail(projectId),
    enabled: !!projectId,
  });

  const handleClickListMember = (event) => {
    setAnchorElListMember(event.currentTarget);
  };

  const handleCloseListMember = () => {
    setAnchorElListMember(null);
  };

  console.log(projectDetail);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Box>
        <Box sx={{ width: "100%" }}>
          <Typography
            sx={{ fontSize: "24px", fontWeight: "800", color: "#172B4D" }}
          >
            {projectDetail.projectName}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FormControl
              sx={{ m: "16px 16px 16px 0", width: "25ch" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-search">
                Search
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <Box
              display={"flex"}
              onClick={(event) => {
                handleClickListMember(event);
              }}
            >
              {projectDetail.members.slice(0, 2).map((member) => {
                return (
                  <Avatar
                    alt={member.name}
                    src={member.avatar}
                    key={member.userId}
                  />
                );
              })}
              {projectDetail.members.length > 2 && (
                <Fab
                  size="small"
                  color="warning"
                  aria-label="add"
                  sx={{ boxShadow: "none", marginRight: "3px" }}
                >
                  +{projectDetail.members.length - 2}
                </Fab>
              )}
            </Box>
          </Box>

          <Box>
            <Button
              color="warning"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ marginLeft: "8px" }}
            >
              Task
            </Button>
          </Box>
        </Box>
      </Box>
      <PopoverListMember
        anchorEl={anchorElListMember}
        handleClose={handleCloseListMember}
        projectDetail={projectDetail}
      />
    </>
  );
}
