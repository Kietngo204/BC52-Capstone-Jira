import {
  Avatar,
  Box,
  Button,
  Container,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useUserContext } from "../../contexts/UserContext/UserContext";
import EditProfile from "./EditProfile/EditProfile";
import { useMutation } from "@tanstack/react-query";
import { editUser } from "../../apis/userAPI";
import { AlertJiraFilled } from "../../components/styled/styledAlert";

export default function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const { currentUser } = useUserContext();

  const { mutate: handleEditProfile, error } = useMutation({
    mutationFn: (user) => editUser(user),
    onSuccess: () => {
      setOpenSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError: () => {
      setOpenError(true);
    },
  });

  // Hàm đóng Alert thông báo
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpenSuccess(false);
  };

  return (
    <>
      <Box height={10} />
      <Typography
        sx={{
          fontWeight: "800",
          fontSize: "24px",
          color: "#172B4D",
          marginBottom: "16px",
        }}
      >
        MY PROFILE
      </Typography>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItem: " center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              alt={currentUser.name}
              src={currentUser.avatar}
              sx={{ width: 120, height: 120 }}
            />
          </Box>
          {!isEdit ? (
            <>
              <Typography
                component={"h2"}
                variant="h2"
                sx={{
                  fontSize: "30px",
                  color: "#172B4D",
                  margin: "16px 0",
                  textAlign: "center",
                }}
              >
                {currentUser.name}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                Edit Profile
              </Button>
              <Box>
                <Typography
                  color={"#172B4D"}
                  fontWeight={600}
                  sx={{ margin: "16px 0", fontSize: "20px" }}
                >
                  My Id:{" "}
                  <Typography component={"span"} fontSize={"20px"}>
                    {currentUser.id}
                  </Typography>
                </Typography>
                <Typography
                  color={"#172B4D"}
                  fontWeight={600}
                  sx={{ margin: "16px 0", fontSize: "20px" }}
                >
                  Email:{" "}
                  <Typography component={"span"} fontSize={"20px"}>
                    {currentUser.email}
                  </Typography>
                </Typography>
                <Typography
                  color={"#172B4D"}
                  fontWeight={600}
                  sx={{ margin: "16px 0", fontSize: "20px" }}
                >
                  Password:{" "}
                  <Typography component={"span"} fontSize={"20px"}>
                    [Hidden]
                  </Typography>
                </Typography>
                <Typography
                  color={"#172B4D"}
                  fontWeight={600}
                  sx={{ margin: "16px 0", fontSize: "20px" }}
                >
                  Phone number:{" "}
                  <Typography component={"span"} fontSize={"20px"}>
                    {currentUser.phoneNumber}
                  </Typography>
                </Typography>
              </Box>
            </>
          ) : (
            <EditProfile
              setIsEdit={setIsEdit}
              currentUser={currentUser}
              handleEditProfile={handleEditProfile}
            />
          )}
        </Box>
      </Container>

      {/* Alert thông báo lỗi và thành công */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={openSuccess}
          autoHideDuration={2000}
          onClose={handleCloseAlert}
        >
          <AlertJiraFilled
            onClose={handleCloseAlert}
            severity="success"
            sx={{ width: "100%" }}
          >
            Chỉnh sửa profile thành công
          </AlertJiraFilled>
        </Snackbar>
        <Snackbar
          open={openError}
          autoHideDuration={2000}
          onClose={handleCloseAlert}
        >
          <AlertJiraFilled
            onClose={handleCloseAlert}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </AlertJiraFilled>
        </Snackbar>
      </Stack>
    </>
  );
}
