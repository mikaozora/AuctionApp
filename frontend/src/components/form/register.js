import React, { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
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

const Register = (props) => {
  const handlerLogin = () => {
    return props.history.push("/");
  };
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
    nama: yup.string().required("nama is required"),
    telp: yup.string().required("telp is required"),
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
          <InputStyle
            name="nama"
            onChange={formik.handleChange}
            values={formik.values.nama}
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
            Telepon
          </Typography>
          <InputStyle
            name="telp"
            onChange={formik.handleChange}
            values={formik.values.telp}
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
  );
};

export default Register;
