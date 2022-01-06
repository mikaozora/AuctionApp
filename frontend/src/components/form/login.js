import React, { useState } from "react";
import { Card, Typography, Button, Stack, Snackbar } from "@mui/material";
import { styled } from "@mui/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router";
import { url } from "../../config";

const InputStyle = styled("input")(({ theme }) => ({
  width: "300px",
  height: "40px",
  backgroundColor: "#f7f7f7",
  borderRadius: "5px",
  margin: "0px 0px 8px 40px",
  border: "none",
  paddingLeft: 16,
  fontFamily: "poppins",
  fontWeight: 400,
  "&:focus": {
    border: "none",
    outline: "none",
  },
}));

const Login = (props) => {
  const handlerRegister = () => {
    return props.history.push("/register");
  };
  const history = useHistory();
  const [snack, setSnack] = useState({
    open: false,
    vertical: "top",
    horizpntal: "center",
  });
  const { vertical, horizontal, open } = snack;

  const handleClick = (newState) => () => {
    setSnack({ open: true, ...newState });
  };

  const handleClose = () => {
    setSnack({ ...snack, open: false });
  };

  const [alert, setAlert] = useState(false)

  const processLogin = async (values) => {
    try {
      const response = await axios.post(`${url}/login`, values);
      console.log(response);
      if (!response.data.logged) {
        setAlert(true)
        return history.push("/");
      }
      let user = response.data.data;
      let token = response.data.token;
      localStorage.setItem("userLogin", JSON.stringify(user));
      localStorage.setItem("token", token);
      return history.push("/dashboard");
    } catch(err) {
        console.log(err);
    }
  };

  const validation = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: (values) => {
      processLogin(values);
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "100vh",
          width: "100%",
          backgroundColor: "#f7f7f7",
        }}
      >
        <Card
          sx={{
            width: "400px",
            height: "400px",
          }}
        >
          <Typography
            align="center"
            variant="h5"
            sx={{
              fontFamily: "poppins",
              fontWeight: "bold",
              margin: "40px 0px 16px 0px",
            }}
          >
            Login
          </Typography>
          <Typography
            sx={{
              fontFamily: "poppins",
              fontSize: 14,
              fontWeight: 500,
              margin: "0px 0px 10px 40px",
            }}
          >
            Username
          </Typography>
          <InputStyle
            name="username"
            onChange={formik.handleChange}
            values={formik.values.username}
            autoComplete="off"
          />
          <Typography
            sx={{
              fontFamily: "poppins",
              fontSize: 14,
              fontWeight: 500,
              margin: "0px 0px 10px 40px",
            }}
          >
            Password
          </Typography>
          <InputStyle
            type="password"
            name="password"
            onChange={formik.handleChange}
            values={formik.values.password}
            autoComplete="off"
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#3E7C17",
              width: "317px",
              margin: "24px 0px 8px 40px",
              boxShadow: "none",
              fontFamily: "poppins",
              "&:hover": {
                backgroundColor: "#3E7C17",
              },
            }}
            onClick={handleClick({ vertical: "top", horizontal: "center" })}
          >
            Login
          </Button>
          {alert === true ? (<Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            onClose={handleClose}
            message="Invalid Username or Password"
            key={vertical + horizontal}
            autoHideDuration={6000}
          />) : null}
          
          <div
            style={{
              display: "flex",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontFamily: "poppins",
                fontWeight: 400,
                margin: "0px 2px 8px 40px",
              }}
            >
              Don't Have Account?
            </Typography>
            <div onClick={() => handlerRegister()}>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontFamily: "poppins",
                  fontWeight: 600,
                  color: "#3E7C17",
                  cursor: "pointer",
                }}
              >
                Register
              </Typography>
            </div>
          </div>
        </Card>
      </Stack>
    </form>
  );
};

export default Login;
