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
} from "@mui/material";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { url } from "../../config";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const theme = createTheme({
  palette: {
    success: {
      main: "#03AC0E",
    },
  },
});
const DialogAdd = (props) => {
  const [alert, setAlert] = useState({
    open: false,
    message: null,
    vertical: "top",
    horizpntal: "center",
  });
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const headerConfig = () => {
    let header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return header;
  };
  // const handleClick = (newState) => () => {
  //   setSnack({ open: true, ...newState });
  // };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };
  const add = async (values, resetForm) => {
    try {
      const response = await axios.post(
        `${url}/petugas`,
        values,
        headerConfig()
      );
      console.log(response);
      if (!response) {
        setAlert({ open: true, message: "Gagal Menambah Petugas" });
      }
      props.processAdd();
      setAlert({ open: true, message: "Berhasil Menambah Petugas" });
      resetForm();
    } catch (err) {
      console.log(err);
    }
  };
  const validation = yup.object({
    nama: yup.string().required("Nama is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    level: yup.string().required("Level is required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nama: "",
      username: "",
      password: "",
      level: "",
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
          autoHideDuration={1000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
        <Dialog open={props.open} onClose={props.closeDialog}>
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>Tambah Data Petugas</DialogTitle>
            <DialogContent sx={{ pt: 0, pb: 2 }}>
              <TextField
                autoFocus
                margin="dense"
                id="nama"
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
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                autoComplete="off"
              />
            </DialogContent>
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
                />
              </FormControl>
            </DialogContent>
            <DialogContent sx={{ pt: 0, pb: 0 }}>
              <FormControl
                fullWidth
                color="success"
                sx={{ mt: 1, backgroundColor: "#f7f7f7" }}
              >
                <InputLabel id="demo-simple-select-label">Level</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.level}
                  label="Level"
                  onChange={(event) => {
                    formik.setFieldValue("level", event.target.value);
                  }}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="petugas">Petugas</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>

            <DialogActions>
              <Button
                onClick={props.closeDialog}
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
                onClick={props.closeDialog}
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

const DialogDelete = (props) => {
  const [alert, setAlert] = useState(false);
  const { open, closeDialog, processDelete } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Hapus Data Petugas"}
        </DialogTitle>
        <DialogContent sx={{ pb: 1 }}>
          <DialogContentText id="alert-dialog-description">
            Apakah anda yakin ingin menghapus data petugas?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeDialog}
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
            onClick={processDelete}
            autoFocus
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
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const DialogEdit = (props) => {
  const [alert, setAlert] = useState({
    open: false,
    message: null,
    vertical: "top",
    horizpntal: "center",
  });
  const [open, setOpen] = useState(false);
  const [editPass, setEditPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  let data = props.data;
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
  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };
  const edit = async (values, resetForm) => {
    props.processEdit(values);
    resetForm();
  };
  const validation = yup.object({
    nama: yup.string().required("Nama is required"),
    password: yup.string(),
    level: yup.string().required("Level is required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: data.id,
      nama: data.nama,
      password: "",
      level: data.level,
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
          autoHideDuration={1000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
        <Dialog open={props.open} onClose={props.closeDialog}>
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>Edit Data Barang</DialogTitle>
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
                value={data.username}
                autoComplete="off"
                disabled
              />
            </DialogContent>
            <DialogContent sx={{ pt: 0, pb: 2 }}>
              <FormControl
                fullWidth
                color="success"
                sx={{ mt: 1, backgroundColor: "#f7f7f7" }}
              >
                <InputLabel id="demo-simple-select-label">Level</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.level || ""}
                  label="Level"
                  onChange={(event) => {
                    formik.setFieldValue("level", event.target.value);
                  }}
                  open={open}
                  onClose={hanndleClose}
                  onOpen={hanndleOpen}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="petugas">Petugas</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>

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
                onClick={props.closeDialog}
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

export { DialogAdd, DialogDelete, DialogEdit };
