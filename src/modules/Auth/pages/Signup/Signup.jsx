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
import { signup } from "../../../../apis/userAPI";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [checked, setChecked] = useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const navigate = useNavigate();

  const signupSchema = object({
    email: string()
      .required("Email must not be empty")
      .email("Email is not in the correct format"),
    password: string()
      .required("Password must not be empty")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
        "Password must be at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
      ),
    name: string().required("Name must not be empty"),
    phoneNumber: string().required("Phone Number must not be empty"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
    },
    resolver: yupResolver(signupSchema),
    mode: "onTouched",
  });

  const { mutate: handleSignup, error } = useMutation({
    mutationFn: (payload) => signup(payload),
    onSuccess: () => {
      handleClickOpen();
    },
  });

  const onSubmit = (values) => {
    console.log(values);
    handleSignup(values);
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
          borderRadius: "40px",
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
            Register
          </Typography>
          <Box>
            <Typography
              component={"h3"}
              fontSize={"28px"}
              sx={{ opacity: "0.7", marginBottom: "16px" }}
            >
              Don't have an account?
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
              <FormTextField placeholder="Name" {...register("name")} />
              {!!errors.name && (
                <Typography color="red" textAlign={"left"} p={"0 0 10px 10px"}>
                  {errors.name?.message}
                </Typography>
              )}
              <FormTextField
                placeholder="Phone Number"
                {...register("phoneNumber")}
              />
              {!!errors.phoneNumber && (
                <Typography color="red" textAlign={"left"} p={"0 0 10px 10px"}>
                  {errors.phoneNumber?.message}
                </Typography>
              )}
              <ButtonJira
                bg="#fbceb5"
                border="1px solid #fbceb5"
                bgHover="#e2b79f"
                color="#000"
                type="submit"
              >
                Sign up
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
              <A to={"/sign-in"}>Bạn đã có tài khoản</A>
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
            <Dialog
              open={openSuccess}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" textAlign={"center"}>
                {"Congratulation"}
              </DialogTitle>
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
                  You have successfully registered
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    navigate("/sign-in");
                  }}
                  color="success"
                >
                  Go to the login page
                </Button>
                <Button onClick={handleClose} color="error">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
