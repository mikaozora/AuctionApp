import React, { useEffect, useState } from "react";
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
  Autocomplete,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { url } from "../../config";
import format from "date-fns/format";
import { styled } from "@mui/styles";

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

const DialogAdd = (props) => {
  const [alert, setAlert] = useState({
    open: false,
    message: null,
    vertical: "top",
    horizpntal: "center",
    severity: ""
  });
  const [dataBarang, setDataBarang] = useState([]);
  const [status, setStatus] = useState("");
  const [value, setValue] = useState(new Date());
  const [required, setRequired] = useState({
    show: false,
    message: "",
  });
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

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  const getDataBarang = async () => {
    const response = await axios.get(`${url}/barang`, headerConfig());
    if (!response) {
      console.log("error");
    }
    setDataBarang(response.data.data);
  };
  const add = async (values, resetForm) => {
    const newValues = {
      ...values,
      endTime: values.endTime + ".000Z",
    };
    try {
      const response = await axios.post(
        `${url}/lelang`,
        newValues,
        headerConfig()
      );
      props.processAdd();
      setAlert({ open: true, message: "Berhasil menambah data lelang", severity: "success" });
      setStatus(false);
      resetForm();
    } catch (err) {
      if(err.response.data.code === 401){
        setAlert({ open: true, message: "Barang sudah dilelang", severity: "error" });
        resetForm();
      }else{
        setAlert({ open: true, message: "Gagal menambah data lelang", severity: "error" });
        resetForm();
      }
    }
  };
  const validation = yup.object({
    idBarang: yup.string().required("Barang is required"),
    status: yup.string().required("status is required"),
    endTime: yup.string().default("-").required("endTime is required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      idBarang: "",
      idPetugas: JSON.parse(localStorage.getItem("userLogin")).id,
      status: "",
      endTime: "",
    },
    validationSchema: validation,
    onSubmit: (values, { resetForm }) => {
      add(values, resetForm);
    },
  });
  useEffect(() => {
    getDataBarang();
  }, []);
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
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
        <Dialog open={props.open} onClose={props.closeDialog}>
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>Tambah Data Lelang</DialogTitle>
            <DialogContent sx={{ pt: 0, pb: 2 }}>
              <Autocomplete
                id="combo-box-demo"
                options={dataBarang}
                getOptionLabel={(options) => options.nama}
                onChange={(event, value) => {
                  if (value) {
                    formik.setFieldValue("idBarang", value.id);
                  } else {
                    formik.setFieldValue("idBarang", "");
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Nama Barang"
                    variant="outlined"
                    color="success"
                    fullWidth
                    sx={{
                      minWidth: "500px",
                      outline: "none",
                      backgroundColor: "#f7f7f7",
                      marginTop: "8px",
                    }}
                  />
                )}
              />
              {(formik.touched.idBarang && Boolean(formik.errors.idBarang)) ||
              required.show ? (
                <RequiredType>
                  {formik.touched.idBarang && formik.errors.idBarang}
                </RequiredType>
              ) : null}
            </DialogContent>
            <DialogContent sx={{ pt: 0, pb: 0 }}>
              <FormControl
                fullWidth
                color="success"
                sx={{ mt: 1, backgroundColor: "#f7f7f7" }}
              >
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.status}
                  label="Status"
                  defaultValue="Ditutup"
                  onChange={(event) => {
                    formik.setFieldValue("status", event.target.value);
                    setStatus(event.target.value);
                  }}
                >
                  <MenuItem value="Dibuka">Dibuka</MenuItem>
                  <MenuItem value="Ditutup">Ditutup</MenuItem>
                </Select>
              </FormControl>
              {(formik.touched.status && Boolean(formik.errors.status)) ||
              required.show ? (
                <RequiredType>
                  {formik.touched.status && formik.errors.status}
                </RequiredType>
              ) : null}
            </DialogContent>
            {status === "Dibuka" ? (
              <DialogContent sx={{ pt: 2, pb: 0 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        sx={{
                          minWidth: "500px",
                          outline: "none",
                          backgroundColor: "#f7f7f7",
                          marginTop: "8px",
                        }}
                        color="success"
                      />
                    )}
                    label="DateTimePicker"
                    value={value}
                    onChange={(newValue) => {
                      formik.setFieldValue(
                        "endTime",
                        format(newValue, "yyyy-MM-dd HH:mm:ss")
                      );
                      setValue(newValue);
                    }}
                  />
                </LocalizationProvider>
              </DialogContent>
            ) : null}
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

  const { open, closeDialog, processDelete, handleClose, alert } = props;

  return (
    <div>
      <Snackbar
          open={alert.open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Hapus Data Lelang"}</DialogTitle>
        <DialogContent sx={{ pb: 1 }}>
          <DialogContentText id="alert-dialog-description">
            Apakah anda yakin ingin menghapus data lelang?
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
  const {alert, handleClose} = props
  const [open, setOpen] = useState(false);
  const [editPass, setEditPass] = useState(false);
  const [status, setStatus] = useState(false);
  const [value, setValue] = useState(new Date());
  const [required, setRequired] = useState({
    show: false,
    message: "",
  });
  let data = props.data;
  let namaBarang = props.nama;
  const headerConfig = () => {
    let header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return header;
  };
  const edit = async (values, resetForm) => {
    props.processEdit(values);
    resetForm();
  };
  const validation = yup.object({
    idBarang: yup.string().required("ID barang is required"),
    status: yup.string().required("status is required"),
    endTime: yup.string().required("Tanggal Berakhir is required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: data.id,
      idBarang: data.idBarang,
      idPetugas: data.idPetugas,
      status: data.status,
      endTime: data.endTime,
    },
    validationSchema: validation,
    onSubmit: (values, { resetForm }) => {
      edit(values, resetForm);
      console.log(values);
    },
  });
  useEffect(() => {
  }, []);
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
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
        <Dialog open={props.open} onClose={props.closeDialog}>
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>Tambah Data Lelang</DialogTitle>
            <DialogContent sx={{ pt: 0, pb: 2 }}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nama Barang"
                type="text"
                fullWidth
                variant="outlined"
                color="success"
                sx={{
                  minWidth: "500px",
                  outline: "none",
                  backgroundColor: "#f7f7f7",
                }}
                value={namaBarang}
                autoComplete="off"
                disabled
              />
            </DialogContent>
            <DialogContent sx={{ pt: 0, pb: 0 }}>
              <FormControl
                fullWidth
                color="success"
                sx={{ mt: 1, backgroundColor: "#f7f7f7" }}
              >
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.status ? formik.values.status : ""}
                  label="Status"
                  defaultValue="Ditutup"
                  onChange={(event) => {
                    formik.setFieldValue("status", event.target.value);
                    setStatus(event.target.value);
                  }}
                >
                  <MenuItem value="Dibuka">Dibuka</MenuItem>
                  <MenuItem value="Ditutup">Ditutup</MenuItem>
                </Select>
              </FormControl>
              {(formik.touched.status && Boolean(formik.errors.status)) ||
              required.show ? (
                <RequiredType>
                  {formik.touched.status && formik.errors.status}
                </RequiredType>
              ) : null}
            </DialogContent>
            {status === "Dibuka" ? (
              <DialogContent sx={{ pt: 2, pb: 0 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        sx={{
                          minWidth: "500px",
                          outline: "none",
                          backgroundColor: "#f7f7f7",
                          marginTop: "8px",
                        }}
                        color="success"
                      />
                    )}
                    label="DateTimePicker"
                    value={value}
                    onChange={(newValue) => {
                      formik.setFieldValue(
                        "endTime",
                        format(newValue, "yyyy-MM-dd HH:mm:ss")
                      );
                      setValue(newValue);
                    }}
                  />
                </LocalizationProvider>
              </DialogContent>
            ) : null}
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

export { DialogAdd, DialogDelete, DialogEdit };
