import React, { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Snackbar,
  Alert,
  Stack,
  createTheme,
  ThemeProvider,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
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

const Register = (props) => {
  const handlerLogin = () => {
    return props.history.push("/login");
  };
  const [snack, setSnack] = useState({
    open: false,
    vertical: "top",
    horizpntal: "center",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { vertical, horizontal, open } = snack;

  const handleClick = (newState) => () => {
    setSnack({ open: true, ...newState });
  };

  const handleClose = () => {
    setSnack({ ...snack, open: false });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [required, setRequired] = useState({
    show: false,
    message: "",
  });

  const [alert, setAlert] = useState(false);
  const processRegister = async (values, resetForm) => {
    try {
      const response = await axios.post(`${url}/masyarakat/register`, values);
      if (response) {
        setAlert(true);
        resetForm();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const validation = yup.object({
    nama: yup.string().required("Nama is required"),
    telp: yup.string().required("Telepon is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nama: "",
      telp: "",
      username: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: (values, { resetForm }) => {
      processRegister(values, resetForm);
      console.log(values);
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
              //   height: "400px",
              paddingBottom: "24px",
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
              Register
            </Typography>
            <Typography
              sx={{
                fontFamily: "poppins",
                fontSize: 14,
                fontWeight: 500,
                margin: "0px 0px 10px 40px",
              }}
            >
              Nama
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
                name="nama"
                colot="success"
                autoComplete="off"
                value={formik.values.nama ? formik.values.nama : ""}
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
            {(formik.touched.nama && Boolean(formik.errors.nama)) ||
            required.show ? (
              <RequiredType>
                {formik.touched.nama && formik.errors.nama}
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
              Telepon
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
                name="telp"
                colot="success"
                autoComplete="off"
                value={formik.values.telp ? formik.values.telp : ""}
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
            {(formik.touched.telp && Boolean(formik.errors.telp)) ||
            required.show ? (
              <RequiredType>
                {formik.touched.telp && formik.errors.telp}
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
              Register
            </Button>
            {alert === true ? (
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Berhasil Mendaftar
                </Alert>
              </Snackbar>
            ) : (
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  onClose={handleClose}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  Gagal Mendaftar
                </Alert>
              </Snackbar>
            )}
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
                Already Have Account?
              </Typography>
              <div onClick={() => handlerLogin()}>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontFamily: "poppins",
                    fontWeight: 600,
                    color: "#3E7C17",
                    cursor: "pointer",
                  }}
                >
                  Login
                </Typography>
              </div>
            </div>
          </Card>
        </Stack>
      </form>
    </ThemeProvider>
  );
};

export default Register;
