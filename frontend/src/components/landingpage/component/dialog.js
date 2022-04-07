import React, { useState } from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
  OutlinedInput,
  createTheme,
  ThemeProvider,
  Typography,
  CardMedia,
} from "@mui/material";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { url } from "../../../config";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { typography } from "@mui/system";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { convertToRupiah } from "../../../helper/convertRupiah";
import CountDown, { zeroPad } from "react-countdown";
import styled from "styled-components";

const RequiredType = styled("Typography")(({ theme }) => ({
  fontFamily: "poppins",
  fontSize: "14px",
  fontWeight: 300,
  color: "#FF5C86",
}));

const theme = createTheme({
  palette: {
    success: {
      main: "#03AC0E",
    },
  },
});
// const GreenCount = styled.div`
//   span {
//     color: #03ac0e;
//     font-family: poppins;
//     font-size: 32px;
//     letter-spacing: 1px
//   }
// `;
const renderer = ({ total, days, hours, minutes, seconds }) => {
  if (total) {
    // Render a countdown
    return (
      <span
        style={{
          color: "#03ac0e",
          fontFamily: "poppins",
          fontSize: "32px",
          marginLeft: "32px",
          fontWeight: 450,
        }}
      >
        {zeroPad(days)} : {zeroPad(hours)} : {zeroPad(minutes)} :{" "}
        {zeroPad(seconds)}
      </span>
    );
  } else {
    // Render a finished state
    return "done";
  }
};
const DialogAdd = (props) => {
  const data = props.data;
  const [alert, setAlert] = useState({
    open: false,
    message: null,
    vertical: "top",
    horizpntal: "center",
    success: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [required, setRequired] = useState({
    show: false,
    message: "",
  });
  const [reloadAll, setReloadAll] = useState(false);
  const headerConfig = () => {
    let header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return header;
  };
  const handleReload = () => {
    setReloadAll(true);
    setTimeout(() => {
      setReloadAll(false);
    }, 500);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };
  const add = async (values, resetForm) => {
    try {
      const response = await axios.post(
        `${url}/lelang/bid`,
        values,
        headerConfig()
      );
      console.log(response);
      if (!response) {
        setAlert({ open: true, message: "Gagal Melakukan tawaran" });
      }
      props.reload();
      setAlert({
        open: true,
        message: "Berhasil melakukan tawaran",
        success: true,
      });
      resetForm();
    } catch (err) {
      if(err.response.data.code === 400){
        setAlert({
        open: true,
        message: "Gagal Melakukan tawaran",
        success: false,
      });
      }else if(err.response.data.code === 401){
        setAlert({
          open: true,
          message: "Tawaran harus lebih tinggi",
          success: false,
        });
      }else{
        setAlert({
          open: true,
          message: "Status ditutup",
          success: false,
        });
      }
      
      resetForm();
      console.log(err);
    }
  };
  const validation = yup.object({
    id: yup.string().required("id is required"),
    idMasyarakat: yup.string().required("masyarakat is required"),
    penawaranHarga: yup.string().required("tawaran harga is required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: data.id,
      idMasyarakat: JSON.parse(localStorage.getItem("userLogin"))
        ? JSON.parse(localStorage.getItem("userLogin")).id
        : "",
      penawaranHarga: "",
    },
    validationSchema: validation,
    onSubmit: (values, { resetForm }) => {
      add(values, resetForm);
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Snackbar
          open={alert.open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity={alert.success ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
        <Dialog
          open={props.open}
          fullWidth="true"
          maxWidth="lg"
          onClose={props.closeDialog}
          sx={{}}
        >
          <form onSubmit={formik.handleSubmit}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <DialogTitle></DialogTitle>
              <IconButton
                onClick={props.closeDialog}
                sx={{ padding: 2, "&:hover": { backgroundColor: "#ffffff" } }}
              >
                <CloseRoundedIcon sx={{ marginRight: 2 }} />
              </IconButton>
            </div>
            <DialogContent sx={{}}>
              <div className="lul" style={{ display: "flex" }}>
                <CardMedia
                  component="img"
                  height="500"
                  sx={{ width: 500 }}
                  image={
                    props.open === true
                      ? url + "/barang_image/" + data.barang.image
                      : null
                  }
                  alt="green iguana"
                />
                <div className="isi">
                  <div
                    className="heading"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "poppins",
                        fontSize: "24px",
                        fontWeight: 500,
                        padding: "16px",
                        width: "200px",
                        marginLeft: "16px",
                      }}
                    >
                      {props.open === true ? data.barang.nama : null}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "poppins",
                        fontSize: "24px",
                        fontWeight: 500,
                        padding: "16px",
                        maxWidth: "200px",
                        marginLeft: "200px",
                      }}
                    >
                      {props.open === true
                        ? convertToRupiah(data.hargaAkhir)
                        : null}
                    </Typography>
                  </div>
                  <div className="body">
                    <Typography
                      sx={{
                        fontFamily: "poppins",
                        fontSize: "18px",
                        fontWeight: 400,
                        padding: "16px",
                        marginLeft: "16px",
                      }}
                    >
                      {props.open === true ? data.barang.deskripsi : null}
                    </Typography>
                  </div>
                  <div
                    style={{
                      padding: "16px 24px 16px 24px",
                      width: "300px",
                      backgroundColor: "#E6FFE8",
                      marginLeft: "32px",
                    }}
                  >
                    <CountDown
                      date={new Date(data.endTime).getTime()}
                      renderer={renderer}
                    />
                    <Typography
                      sx={{
                        fontFamily: "poppins",
                        fontSize: "16px",
                        fontWeight: 400,
                        color: "#03ac0e",
                        wordSpacing: "28px",
                        marginLeft: "38px",
                      }}
                    >
                      DAY HRS MIN SEC
                    </Typography>
                  </div>
                  <TextField
                    margin="dense"
                    id=""
                    placeholder="Masukkan harga penawaran"
                    type="text"
                    variant="outlined"
                    color="success"
                    sx={{
                      minWidth: "350px",
                      outline: "none",
                      backgroundColor: "#f7f7f7",
                      marginLeft: "32px",
                      marginTop: "16px",
                    }}
                    name="penawaranHarga"
                    onChange={formik.handleChange}
                    value={formik.values.penawaranHarga}
                    autoComplete="off"
                  />
                  <Button
                    type="submit"
                    onClick={props.closeDialog}
                    sx={{
                      display: "block",
                      backgroundColor: "#03AC0E",
                      color: "#ffffff",
                      minWidth: "350px",
                      textTransform: "none",
                      fontSize: "14px",
                      fontFamily: "poppins",
                      fontWeight: 400,
                      borderRadius: 1,
                      marginLeft: "32px",
                      marginTop: "16px",
                      border: "1px solid #03AC0E",
                      "&:hover": {
                        backgroundColor: "#03AC0E",
                      },
                    }}
                  >
                    Tawar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

const DialogEdit = (props) => {
  // const { alert, handleClose } = props;
  const [open, setOpen] = useState(false);
  const [editPass, setEditPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [dataNew, setDataNew] = useState([])
  const [required, setRequired] = useState({
    show: false,
    message: "",
  });
  const data = JSON.parse(localStorage.getItem("userLogin"));
  const hanndleClose = () => {
    setOpen(false);
  };
  const hanndleOpen = () => {
    setOpen(true);
  };
  const handleOpenEditPass = () => {
    setEditPass(!editPass);
  };
  const handleCloseEditPass = () => {
    setEditPass(false);
    props.closeDialog();
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [alert, setAlert] = useState({
    open: false,
    message: null,
    vertical: "top",
    horizpntal: "center",
    success: null,
  });
  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };
  const headerConfig = () => {
    let header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return header;
  };
  const getData = async () => {
    try {
      const response = await axios.get(`${url}/masyarakat/${data.id}`, headerConfig());
      if (!response) {
        console.log("error");
      }
      setDataNew(response.data.data);
      let data2 = response.data.data
      localStorage.setItem("userLogin", JSON.stringify(data2))
    } catch (err) {
      console.log(err);
    }
  };
  const edit = async (values, resetForm) => {
    try {
      const response = await axios.put(
        `${url}/masyarakat`,
        values,
        headerConfig()
      );
      console.log(response);
      setAlert({
        open: true,
        message: "Berhasil mengubah profile",
        success: true,
      });
      resetForm()
      getData()
    } catch (err) {
      setAlert({
        open: true,
        message: "Gagal mengubah profile",
        success: false,
      });
    }
  };
  const validation = yup.object({
    nama: yup.string().required("Nama is required"),
    // username: yup.string().required("Username is required"),
    password: yup.string(),
    telp: yup.string().required("No Telepon is required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: props.open ? data.id : null,
      nama: props.open ? data.nama : null,
      // username: props.open ? data.username : null,
      password: "",
      telp: props.open ? data.telp : null,
    },
    validationSchema: validation,
    onSubmit: (values, { resetForm }) => {
      edit(values, resetForm);
      console.log(values);
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Snackbar
          open={alert.open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity={alert.success ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
        <Dialog open={props.open} onClose={props.closeDialog}>
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent sx={{ pt: 0, pb: 2 }}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nama"
                type="text"
                fullWidth
                variant="outlined"
                color="success"
                sx={{
                  minWidth: "500px",
                  outline: "none",
                  backgroundColor: "#f7f7f7",
                }}
                name="nama"
                onChange={formik.handleChange}
                value={formik.values.nama}
                autoComplete="off"
              />
              {(formik.touched.nama && Boolean(formik.errors.nama)) ||
              required.show ? (
                <RequiredType>
                  {formik.touched.nama && formik.errors.nama}
                </RequiredType>
              ) : null}
            </DialogContent>
            <DialogContent sx={{ pt: 0, pb: 2 }}>
              <TextField
                margin="dense"
                id="username"
                label="username"
                type="text"
                fullWidth
                variant="outlined"
                color="success"
                sx={{
                  minWidth: "500px",
                  outline: "none",
                  backgroundColor: "#f7f7f7",
                }}
                value={props.open ? data.username : null}
                autoComplete="off"
                disabled
              />
            </DialogContent>
            <DialogContent sx={{ pt: 0, pb: 2 }}>
              <TextField
                margin="dense"
                id="telp"
                label="Telp"
                type="text"
                fullWidth
                variant="outlined"
                color="success"
                sx={{
                  minWidth: "500px",
                  outline: "none",
                  backgroundColor: "#f7f7f7",
                }}
                name="telp"
                onChange={formik.handleChange}
                value={formik.values.telp}
                autoComplete="off"
              />
              {(formik.touched.telp && Boolean(formik.errors.telp)) ||
              required.show ? (
                <RequiredType>
                  {formik.touched.telp && formik.errors.telp}
                </RequiredType>
              ) : null}
            </DialogContent>
            {editPass ? (
              <DialogContent sx={{ pt: 0, pb: 2 }}>
                <FormControl
                  sx={{ mt: 1, width: "100%", backgroundColor: "#f7f7f7" }}
                  variant="outlined"
                  color="success"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formik.values.password ? formik.values.password : ""}
                    onChange={formik.handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleShowPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    disabled={editPass ? false : true}
                  />
                </FormControl>
              </DialogContent>
            ) : null}
            <DialogActions>
              <Button onClick={() => handleOpenEditPass()} color="success">
                Edit Password
              </Button>
              <Button
                onClick={() => handleCloseEditPass()}
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#03AC0E",
                  mt: 1,
                  mb: 1,
                  minWidth: "80px",
                  textTransform: "none",
                  fontSize: "14px",
                  fontFamily: "poppins",
                  fontWeight: 400,
                  borderRadius: 1,
                  border: "1px solid #03AC0E",
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                // onClick={props.closeDialog}
                sx={{
                  backgroundColor: "#03AC0E",
                  color: "#ffffff",
                  mt: 1,
                  mb: 1,
                  minWidth: "80px",
                  marginRight: 2,
                  textTransform: "none",
                  fontSize: "14px",
                  fontFamily: "poppins",
                  fontWeight: 400,
                  borderRadius: 1,
                  border: "1px solid #03AC0E",
                  "&:hover": {
                    backgroundColor: "#03AC0E",
                  },
                }}
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};
export { DialogAdd, DialogEdit };
