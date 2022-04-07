import React, { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Stack,
  Snackbar,
  InputAdornment,
  IconButton,
  TextField,
  OutlinedInput,
  createTheme,
  ThemeProvider,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router";
import { url } from "../../config";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

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

const RequiredType = styled("Typography")(({ theme }) => ({
  marginLeft: "40px",
  fontFamily: "poppins",
  fontSize: "14px",
  fontWeight: 400,
  color: "#FF5C86",
}));

const theme = createTheme({
  palette: {
    success: {
      main: "#03AC0E",
    },
  },
});

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
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = (newState) => () => {
    setSnack({ open: true, ...newState });
  };

  const handleClose = () => {
    setSnack({ ...snack, open: false });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [alert, setAlert] = useState(false);
  const [required, setRequired] = useState({
    show: false,
    message: "",
  });

  const processLogin = async (values) => {
    try {
      const response = await axios.post(`${url}/login`, values);
      console.log(response);
      if (!response.data.logged) {
        setAlert(true);
        setRequired({
          show: true,
          message: "tes",
        });
      } else if (response.data.logged) {
        let user = response.data.data;
        let token = response.data.token;
        localStorage.setItem("userLogin", JSON.stringify(user));
        localStorage.setItem("token", token);
        localStorage.setItem("role", response.data.data.level);
        let role = localStorage.getItem("role");
        console.log(role === "masyarakat");
        if (role === "admin" || role === "petugas") {
          return history.push("/dashboard");
        } else if (role === "masyarakat") {
          return history.push("/");
        }

        // setRequired({
        //   show: false,
        //   message: "",
        // });
      }
    } catch (err) {
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
      // console.log(values);
    },
  });
  return (
    <ThemeProvider theme={theme}>
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
            <FormControl
              sx={{
                margin: "0px 8px 0px 40px",
                width: "320px",
                height: "44px",
                backgroundColor: "#f7f7f7",
              }}
              variant="outlined"
              color="success"
            >
              <OutlinedInput
                id="outlined-adornment-password"
                type="text"
                name="username"
                colot="success"
                autoComplete="off"
                value={formik.values.username ? formik.values.username : ""}
                onChange={formik.handleChange}
                sx={{
                  outline: "none",
                  height: "44px",
                  fontFamily: "poppins",
                  fontSize: "14px",
                  fontWeight: 400,
                  borderRadius: "8px",
                  backgroundColor: "#f7f7f7f7",
                  border: "none",
                  "&:focus": {
                    outline: "none",
                  },
                }}
              />
            </FormControl>
            {(formik.touched.username && Boolean(formik.errors.username)) ||
            required.show ? (
              <RequiredType>
                {formik.touched.username && formik.errors.username}
              </RequiredType>
            ) : null}

            <Typography
              sx={{
                fontFamily: "poppins",
                fontSize: 14,
                fontWeight: 500,
                margin: "10px 0px 10px 40px",
              }}
            >
              Password
            </Typography>
            <FormControl
              sx={{
                margin: "0px 8px 0px 40px",
                width: "320px",
                height: "44px",
                backgroundColor: "#f7f7f7",
              }}
              variant="outlined"
              color="success"
            >
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                colot="success"
                value={formik.values.password ? formik.values.password : ""}
                onChange={formik.handleChange}
                sx={{
                  outline: "none",
                  height: "44px",
                  fontFamily: "poppins",
                  fontSize: "14px",
                  fontWeight: 400,
                  borderRadius: "8px",
                  backgroundColor: "#f7f7f7f7",
                  border: "none",
                  "&:focus": {
                    outline: "none",
                  },
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon fontSize="small" />
                      ) : (
                        <VisibilityIcon fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {(formik.touched.password && Boolean(formik.errors.password)) ||
            required.show ? (
              <RequiredType>
                {formik.touched.password && formik.errors.password}
              </RequiredType>
            ) : null}
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#03AC0E",
                width: "317px",
                margin: "24px 0px 8px 40px",
                boxShadow: "none",
                fontFamily: "poppins",
                "&:hover": {
                  backgroundColor: "#03AC0E",
                },
              }}
              onClick={handleClick({ vertical: "top", horizontal: "center" })}
            >
              Login
            </Button>
            {alert === true ? (
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={open}
                onClose={handleClose}
                message="Invalid Username or Password"
                key={vertical + horizontal}
                autoHideDuration={6000}
              />
            ) : null}

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
                    color: "#03AC0E",
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
    </ThemeProvider>
  );
};

export default Login;
