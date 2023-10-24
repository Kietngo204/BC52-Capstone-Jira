import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FormTextField } from "../../../../components/styled/styledForm";
import { ButtonJira } from "../../../../components/styled/styledButton";
import { A } from "../../../../components/styled/styledLink";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signin } from "../../../../apis/userAPI";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useUserContext } from "../../../../contexts/UserContext/UserContext";

export default function Signin() {
  const [checked, setChecked] = useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const { currentUser, handleSignin: onSigninSuccess } = useUserContext();

  const [searchParams] = useSearchParams();

  const signinSchema = object({
    email: string()
      .required("Please enter the email")
      .email("Email is not in the correct format"),
    password: string()
      .required("Please enter the password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
        "Password must be at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signinSchema),
    mode: "onTouched",
  });

  const { mutate: handleSignin, error } = useMutation({
    mutationFn: (payload) => signin(payload),
    onSuccess: (data) => {
      handleClickOpen();
      onSigninSuccess(data);
    },
  });

  const onSubmit = (values) => {
    handleSignin(values);
  };

  const handleCheckboxChange = (event) => {
    setChecked(!checked);
  };

  const handleClickOpen = () => {
    setOpenSuccess(true);
  };

  const handleClose = () => {
    setOpenSuccess(false);
  };

  //currentUser khác null có nghĩ là user đã đăng nhập=> điều hướng về Home
  if (currentUser) {
    const redirectTo = searchParams.get("redirectTo");
    return <Navigate to={redirectTo || "/"} replace />;
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url('/img/bg.jpg.webp')`,
        position: "relative",
        color: "#fff",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#0000004c",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingBottom: "200px",
        }}
      >
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography
            component={"h2"}
            variant="h3"
            color={"inherit"}
            p={"0 0 50px 0"}
            sx={{ opacity: ".8" }}
          >
            Login
          </Typography>
          <Box>
            <Typography
              component={"h3"}
              fontSize={"28px"}
              sx={{ opacity: "0.7", marginBottom: "16px" }}
            >
              Have an account?
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <FormTextField placeholder="Email" {...register("email")} />
              {!!errors.email && (
                <Typography color="red" textAlign={"left"} p={"0 0 10px 10px"}>
                  {errors.email?.message}
                </Typography>
              )}
              <FormTextField
                placeholder="Password"
                type={!checked ? "password" : "text"}
                {...register("password")}
              />
              {!!errors.password && (
                <Typography color="red" textAlign={"left"} p={"0 0 10px 10px"}>
                  {errors.password?.message}
                </Typography>
              )}

              <ButtonJira
                bg="#fbceb5"
                border="1px solid #fbceb5"
                bgHover="#e2b79f"
                color="#000"
                type="submit"
              >
                Sign in
              </ButtonJira>
            </form>
            {!!error && (
              <Typography color="red" textAlign={"left"} p={"0 0 10px 10px"}>
                {error}
              </Typography>
            )}
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <A to={"/sign-up"}>Bạn chưa có tài khoản</A>
              <Box
                display={"flex"}
                alignItems={"center"}
                sx={{
                  paddingRight: "10px",
                  color: "#f7f5f3",
                  paddingBottom: "10px",
                }}
              >
                <IconButton onClick={handleCheckboxChange}>
                  {!checked ? <CheckBoxOutlineBlankIcon /> : <CheckBoxIcon />}
                </IconButton>
                <Typography p={0}>Hiện mật khẩu</Typography>
              </Box>
            </Box>
            <Box>
              <ButtonJira
                bg="#0866FF"
                border="1px solid #0866FF"
                bgHover="#084aff"
                color="#fff"
              >
                Login with Facebook
              </ButtonJira>
            </Box>

            {/* Modal sign in success */}
            <Dialog
              open={openSuccess}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Box width={80}>
                  <img
                    src="/img/animation_success_small.gif"
                    alt="success"
                    width={"100%"}
                    height={"100%"}
                  />
                </Box>
                <DialogContentText id="alert-dialog-description">
                  Login success
                </DialogContentText>
              </DialogContent>
              <DialogActions></DialogActions>
            </Dialog>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
